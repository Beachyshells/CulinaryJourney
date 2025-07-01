import {
  users,
  children,
  recipes,
  recipeInterviews,
  type User,
  type UpsertUser,
  type Child,
  type InsertChild,
  type Recipe,
  type InsertRecipe,
  type RecipeInterview,
  type InsertRecipeInterview,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Child operations
  getChildrenByUserId(userId: string): Promise<Child[]>;
  getChild(id: number): Promise<Child | undefined>;
  createChild(child: InsertChild): Promise<Child>;
  updateChild(id: number, updates: Partial<InsertChild>): Promise<Child>;
  
  // Recipe operations
  getRecipesByChildId(childId: number): Promise<Recipe[]>;
  getRecipe(id: number): Promise<Recipe | undefined>;
  createRecipe(recipe: InsertRecipe): Promise<Recipe>;
  updateRecipe(id: number, updates: Partial<InsertRecipe>): Promise<Recipe>;
  getFavoriteRecipesByChildId(childId: number): Promise<Recipe[]>;
  
  // Recipe interview operations
  createRecipeInterview(interview: InsertRecipeInterview): Promise<RecipeInterview>;
  getRecipeInterview(id: number): Promise<RecipeInterview | undefined>;
  updateRecipeInterview(id: number, updates: Partial<InsertRecipeInterview>): Promise<RecipeInterview>;
  getActiveInterviewByChildId(childId: number): Promise<RecipeInterview | undefined>;
}

export class DatabaseStorage implements IStorage {
  // User operations (IMPORTANT) these user operations are mandatory for Replit Auth.
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Child operations
  async getChildrenByUserId(userId: string): Promise<Child[]> {
    return await db.select().from(children).where(eq(children.userId, userId));
  }

  async getChild(id: number): Promise<Child | undefined> {
    const [child] = await db.select().from(children).where(eq(children.id, id));
    return child;
  }

  async createChild(child: InsertChild): Promise<Child> {
    const [newChild] = await db.insert(children).values(child).returning();
    return newChild;
  }

  async updateChild(id: number, updates: Partial<InsertChild>): Promise<Child> {
    const [updatedChild] = await db
      .update(children)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(children.id, id))
      .returning();
    return updatedChild;
  }

  // Recipe operations
  async getRecipesByChildId(childId: number): Promise<Recipe[]> {
    return await db
      .select()
      .from(recipes)
      .where(eq(recipes.childId, childId))
      .orderBy(desc(recipes.createdAt));
  }

  async getRecipe(id: number): Promise<Recipe | undefined> {
    const [recipe] = await db.select().from(recipes).where(eq(recipes.id, id));
    return recipe;
  }

  async createRecipe(recipe: InsertRecipe): Promise<Recipe> {
    const [newRecipe] = await db.insert(recipes).values(recipe).returning();
    return newRecipe;
  }

  async updateRecipe(id: number, updates: Partial<InsertRecipe>): Promise<Recipe> {
    const [updatedRecipe] = await db
      .update(recipes)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(recipes.id, id))
      .returning();
    return updatedRecipe;
  }

  async getFavoriteRecipesByChildId(childId: number): Promise<Recipe[]> {
    return await db
      .select()
      .from(recipes)
      .where(and(eq(recipes.childId, childId), eq(recipes.isFavorite, true)))
      .orderBy(desc(recipes.createdAt));
  }

  // Recipe interview operations
  async createRecipeInterview(interview: InsertRecipeInterview): Promise<RecipeInterview> {
    const [newInterview] = await db.insert(recipeInterviews).values(interview).returning();
    return newInterview;
  }

  async getRecipeInterview(id: number): Promise<RecipeInterview | undefined> {
    const [interview] = await db.select().from(recipeInterviews).where(eq(recipeInterviews.id, id));
    return interview;
  }

  async updateRecipeInterview(id: number, updates: Partial<InsertRecipeInterview>): Promise<RecipeInterview> {
    const [updatedInterview] = await db
      .update(recipeInterviews)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(recipeInterviews.id, id))
      .returning();
    return updatedInterview;
  }

  async getActiveInterviewByChildId(childId: number): Promise<RecipeInterview | undefined> {
    const [interview] = await db
      .select()
      .from(recipeInterviews)
      .where(and(eq(recipeInterviews.childId, childId), eq(recipeInterviews.status, "in_progress")))
      .orderBy(desc(recipeInterviews.createdAt));
    return interview;
  }
}

export const storage = new DatabaseStorage();
