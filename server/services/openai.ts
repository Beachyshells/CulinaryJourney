import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

export interface RecipeRequest {
  childName: string;
  age: number;
  gender: "girls" | "boys";
  mealType: string;
  skillLevel: string;
  preferences?: string;
  specialOccasion?: string;
  cookingTime?: string;
}

export interface GeneratedRecipe {
  title: string;
  description: string;
  ingredients: Array<{
    item: string;
    amount: string;
    notes?: string;
  }>;
  instructions: Array<{
    step: number;
    instruction: string;
    tip?: string;
  }>;
  cookingTime: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  childMemoryPrompt: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  type: "single_choice" | "multiple_choice" | "text" | "number";
  options?: string[];
  required: boolean;
}

export async function generateRecipeInterview(childName: string, age: number, gender: "girls" | "boys"): Promise<InterviewQuestion[]> {
  const prompt = `Create a fun, age-appropriate recipe interview for ${childName}, a ${age}-year-old ${gender === "girls" ? "girl" : "boy"}. 
  
  Generate 6-8 interview questions that will help create the perfect recipe. Consider:
  - Age-appropriate language and concepts
  - Gender preferences (${gender} theme)
  - Skill level appropriate for age ${age}
  - Fun and engaging questions
  
  Return a JSON array of questions with this structure:
  {
    "questions": [
      {
        "id": "meal_type",
        "question": "What type of yummy food should we make today?",
        "type": "single_choice",
        "options": ["🥞 Breakfast", "🥪 Lunch", "🍽️ Dinner", "🧁 Dessert"],
        "required": true
      }
    ]
  }`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a friendly cooking assistant that creates age-appropriate recipe interviews for children. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result.questions;
  } catch (error) {
    console.error("Failed to generate interview questions:", error);
    throw new Error("Failed to generate interview questions");
  }
}

export async function generateRecipe(request: RecipeRequest): Promise<GeneratedRecipe> {
  const themeColors = request.gender === "girls" ? "pink and purple" : "blue and green";
  
  const prompt = `Create a personalized recipe for ${request.childName}, a ${request.age}-year-old ${request.gender === "girls" ? "girl" : "boy"}.

  Requirements:
  - Meal type: ${request.mealType}
  - Skill level: ${request.skillLevel}
  - Age-appropriate for ${request.age} years old
  - Cooking time: ${request.cookingTime || "flexible"}
  - Theme: ${request.gender} (${themeColors} theme)
  ${request.preferences ? `- Preferences: ${request.preferences}` : ""}
  ${request.specialOccasion ? `- Special occasion: ${request.specialOccasion}` : ""}

  Create a fun, engaging recipe that:
  1. Uses age-appropriate ingredients and techniques
  2. Has clear, simple instructions
  3. Includes helpful tips for young cooks
  4. Creates a memorable cooking experience

  Return JSON with this exact structure:
  {
    "title": "Recipe Name",
    "description": "Brief description of the recipe",
    "ingredients": [
      {
        "item": "ingredient name",
        "amount": "measurement",
        "notes": "optional kid-friendly note"
      }
    ],
    "instructions": [
      {
        "step": 1,
        "instruction": "Clear instruction",
        "tip": "optional helpful tip"
      }
    ],
    "cookingTime": 30,
    "difficulty": "beginner",
    "category": "breakfast/lunch/dinner/dessert",
    "childMemoryPrompt": "A prompt to help the child write about their cooking experience"
  }`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert children's cooking instructor that creates safe, fun, age-appropriate recipes. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content);
    return result;
  } catch (error) {
    console.error("Failed to generate recipe:", error);
    throw new Error("Failed to generate recipe");
  }
}

export async function generateRecipeImage(recipeTitle: string, childAge: number, gender: "girls" | "boys"): Promise<string> {
  const themeStyle = gender === "girls" ? "pink and purple themed, cute and whimsical" : "blue and green themed, adventurous and fun";
  
  const prompt = `A beautiful, appetizing photo of ${recipeTitle}, styled for a ${childAge}-year-old ${gender === "girls" ? "girl" : "boy"}. ${themeStyle} presentation, child-friendly plating, bright and colorful, food photography style, well-lit, appealing to children.`;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    return response.data[0].url;
  } catch (error) {
    console.error("Failed to generate recipe image:", error);
    // Return a placeholder URL if image generation fails
    return "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600";
  }
}
