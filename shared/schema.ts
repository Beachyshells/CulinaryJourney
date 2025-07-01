import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  boolean,
} from "drizzle-orm/pg-core";
import { relations, eq } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  subscriptionType: varchar("subscription_type").default("free"), // free, monthly, annual, per_recipe
  subscriptionStatus: varchar("subscription_status").default("inactive"), // active, inactive, canceled
  subscriptionEndsAt: timestamp("subscription_ends_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const children = pgTable("children", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  name: varchar("name").notNull(),
  age: integer("age").notNull(),
  gender: varchar("gender").notNull(), // girls, boys
  preferences: text("preferences"), // dietary restrictions, favorite foods
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const recipes = pgTable("recipes", {
  id: serial("id").primaryKey(),
  childId: integer("child_id").notNull().references(() => children.id, { onDelete: "cascade" }),
  title: varchar("title").notNull(),
  description: text("description"),
  ingredients: jsonb("ingredients").notNull(), // array of ingredient objects
  instructions: jsonb("instructions").notNull(), // array of instruction steps
  cookingTime: integer("cooking_time"), // in minutes
  difficulty: varchar("difficulty").notNull(), // beginner, intermediate, advanced
  category: varchar("category").notNull(), // breakfast, lunch, dinner, dessert, snack
  ageWhenMade: integer("age_when_made").notNull(),
  childMemory: text("child_memory"), // child's note about the recipe
  templateType: varchar("template_type").default("classic"), // classic, modern, fun
  imageUrl: varchar("image_url"),
  isPrinted: boolean("is_printed").default(false),
  isFavorite: boolean("is_favorite").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const recipeInterviews = pgTable("recipe_interviews", {
  id: serial("id").primaryKey(),
  childId: integer("child_id").notNull().references(() => children.id, { onDelete: "cascade" }),
  conversationData: jsonb("conversation_data").notNull(), // stores the AI interview Q&A
  status: varchar("status").default("in_progress"), // in_progress, completed, abandoned
  recipeId: integer("recipe_id").references(() => recipes.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  children: many(children),
}));

export const childrenRelations = relations(children, ({ one, many }) => ({
  user: one(users, {
    fields: [children.userId],
    references: [users.id],
  }),
  recipes: many(recipes),
  interviews: many(recipeInterviews),
}));

export const recipesRelations = relations(recipes, ({ one }) => ({
  child: one(children, {
    fields: [recipes.childId],
    references: [children.id],
  }),
}));

export const recipeInterviewsRelations = relations(recipeInterviews, ({ one }) => ({
  child: one(children, {
    fields: [recipeInterviews.childId],
    references: [children.id],
  }),
  recipe: one(recipes, {
    fields: [recipeInterviews.recipeId],
    references: [recipes.id],
  }),
}));

// Schemas
export const insertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertChildSchema = createInsertSchema(children).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertRecipeSchema = createInsertSchema(recipes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertRecipeInterviewSchema = createInsertSchema(recipeInterviews).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type UpsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertChild = z.infer<typeof insertChildSchema>;
export type Child = typeof children.$inferSelect;
export type InsertRecipe = z.infer<typeof insertRecipeSchema>;
export type Recipe = typeof recipes.$inferSelect;
export type InsertRecipeInterview = z.infer<typeof insertRecipeInterviewSchema>;
export type RecipeInterview = typeof recipeInterviews.$inferSelect;
