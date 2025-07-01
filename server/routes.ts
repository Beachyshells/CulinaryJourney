import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { z } from "zod";
import { insertChildSchema, insertRecipeSchema, insertRecipeInterviewSchema } from "@shared/schema";
import { generateRecipeInterview, generateRecipe, generateRecipeImage, type RecipeRequest } from "./services/openai";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Child routes
  app.get('/api/children', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const children = await storage.getChildrenByUserId(userId);
      res.json(children);
    } catch (error) {
      console.error("Error fetching children:", error);
      res.status(500).json({ message: "Failed to fetch children" });
    }
  });

  app.post('/api/children', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const childData = insertChildSchema.parse({ ...req.body, userId });
      const child = await storage.createChild(childData);
      res.json(child);
    } catch (error) {
      console.error("Error creating child:", error);
      res.status(400).json({ message: "Failed to create child profile" });
    }
  });

  app.get('/api/children/:id', isAuthenticated, async (req: any, res) => {
    try {
      const childId = parseInt(req.params.id);
      const child = await storage.getChild(childId);
      
      if (!child) {
        return res.status(404).json({ message: "Child not found" });
      }

      // Verify the child belongs to the authenticated user
      const userId = req.user.claims.sub;
      if (child.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      res.json(child);
    } catch (error) {
      console.error("Error fetching child:", error);
      res.status(500).json({ message: "Failed to fetch child" });
    }
  });

  // Recipe routes
  app.get('/api/children/:childId/recipes', isAuthenticated, async (req: any, res) => {
    try {
      const childId = parseInt(req.params.childId);
      const child = await storage.getChild(childId);
      
      if (!child) {
        return res.status(404).json({ message: "Child not found" });
      }

      // Verify the child belongs to the authenticated user
      const userId = req.user.claims.sub;
      if (child.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      const recipes = await storage.getRecipesByChildId(childId);
      res.json(recipes);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      res.status(500).json({ message: "Failed to fetch recipes" });
    }
  });

  app.get('/api/recipes/:id', isAuthenticated, async (req: any, res) => {
    try {
      const recipeId = parseInt(req.params.id);
      const recipe = await storage.getRecipe(recipeId);
      
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      // Verify the recipe belongs to a child of the authenticated user
      const child = await storage.getChild(recipe.childId);
      const userId = req.user.claims.sub;
      if (!child || child.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      res.json(recipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
      res.status(500).json({ message: "Failed to fetch recipe" });
    }
  });

  app.post('/api/recipes/:id/favorite', isAuthenticated, async (req: any, res) => {
    try {
      const recipeId = parseInt(req.params.id);
      const { isFavorite } = req.body;
      
      const recipe = await storage.getRecipe(recipeId);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      // Verify the recipe belongs to a child of the authenticated user
      const child = await storage.getChild(recipe.childId);
      const userId = req.user.claims.sub;
      if (!child || child.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      const updatedRecipe = await storage.updateRecipe(recipeId, { isFavorite });
      res.json(updatedRecipe);
    } catch (error) {
      console.error("Error updating recipe favorite:", error);
      res.status(500).json({ message: "Failed to update recipe" });
    }
  });

  // Recipe interview routes
  app.post('/api/children/:childId/interview/start', isAuthenticated, async (req: any, res) => {
    try {
      const childId = parseInt(req.params.childId);
      const child = await storage.getChild(childId);
      
      if (!child) {
        return res.status(404).json({ message: "Child not found" });
      }

      // Verify the child belongs to the authenticated user
      const userId = req.user.claims.sub;
      if (child.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      // Check if there's already an active interview
      const activeInterview = await storage.getActiveInterviewByChildId(childId);
      if (activeInterview) {
        return res.json(activeInterview);
      }

      // Generate interview questions
      const questions = await generateRecipeInterview(child.name, child.age, child.gender as "girls" | "boys");
      
      // Create new interview
      const interview = await storage.createRecipeInterview({
        childId,
        conversationData: { questions, answers: {}, currentQuestionIndex: 0 },
        status: "in_progress"
      });

      res.json(interview);
    } catch (error) {
      console.error("Error starting interview:", error);
      res.status(500).json({ message: "Failed to start interview" });
    }
  });

  app.post('/api/interview/:id/answer', isAuthenticated, async (req: any, res) => {
    try {
      const interviewId = parseInt(req.params.id);
      const { questionId, answer } = req.body;
      
      const interview = await storage.getRecipeInterview(interviewId);
      if (!interview) {
        return res.status(404).json({ message: "Interview not found" });
      }

      // Verify the interview belongs to a child of the authenticated user
      const child = await storage.getChild(interview.childId);
      const userId = req.user.claims.sub;
      if (!child || child.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      // Update conversation data
      const conversationData = interview.conversationData as any;
      conversationData.answers[questionId] = answer;
      conversationData.currentQuestionIndex += 1;

      const updatedInterview = await storage.updateRecipeInterview(interviewId, {
        conversationData
      });

      res.json(updatedInterview);
    } catch (error) {
      console.error("Error updating interview:", error);
      res.status(500).json({ message: "Failed to update interview" });
    }
  });

  app.post('/api/interview/:id/complete', isAuthenticated, async (req: any, res) => {
    try {
      const interviewId = parseInt(req.params.id);
      
      const interview = await storage.getRecipeInterview(interviewId);
      if (!interview) {
        return res.status(404).json({ message: "Interview not found" });
      }

      // Verify the interview belongs to a child of the authenticated user
      const child = await storage.getChild(interview.childId);
      const userId = req.user.claims.sub;
      if (!child || child.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      // Generate recipe from interview answers
      const conversationData = interview.conversationData as any;
      const answers = conversationData.answers;
      
      const recipeRequest: RecipeRequest = {
        childName: child.name,
        age: child.age,
        gender: child.gender as "girls" | "boys",
        mealType: answers.meal_type || "breakfast",
        skillLevel: answers.skill_level || "beginner",
        preferences: answers.preferences,
        specialOccasion: answers.special_occasion,
        cookingTime: answers.cooking_time
      };

      const generatedRecipe = await generateRecipe(recipeRequest);
      
      // Generate recipe image
      const imageUrl = await generateRecipeImage(generatedRecipe.title, child.age, child.gender as "girls" | "boys");

      // Create recipe record
      const recipe = await storage.createRecipe({
        childId: interview.childId,
        title: generatedRecipe.title,
        description: generatedRecipe.description,
        ingredients: generatedRecipe.ingredients,
        instructions: generatedRecipe.instructions,
        cookingTime: generatedRecipe.cookingTime,
        difficulty: generatedRecipe.difficulty,
        category: generatedRecipe.category,
        ageWhenMade: child.age,
        imageUrl,
        templateType: "classic"
      });

      // Update interview status
      await storage.updateRecipeInterview(interviewId, {
        status: "completed",
        recipeId: recipe.id
      });

      res.json({ recipe, interview: { ...interview, status: "completed", recipeId: recipe.id } });
    } catch (error) {
      console.error("Error completing interview:", error);
      res.status(500).json({ message: "Failed to complete interview" });
    }
  });

  app.get('/api/interview/:id', isAuthenticated, async (req: any, res) => {
    try {
      const interviewId = parseInt(req.params.id);
      const interview = await storage.getRecipeInterview(interviewId);
      
      if (!interview) {
        return res.status(404).json({ message: "Interview not found" });
      }

      // Verify the interview belongs to a child of the authenticated user
      const child = await storage.getChild(interview.childId);
      const userId = req.user.claims.sub;
      if (!child || child.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }

      res.json(interview);
    } catch (error) {
      console.error("Error fetching interview:", error);
      res.status(500).json({ message: "Failed to fetch interview" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
