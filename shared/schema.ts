import { pgTable, text, serial, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Keep the users table for auth purposes
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// WhatsApp groups table
export const whatsappGroups = pgTable("whatsapp_groups", {
  id: serial("id").primaryKey(),
  group_name: text("group_name").notNull(),
  category: text("category").notNull(),
  country: text("country").notNull().default("Global"),
  whatsapp_link: text("whatsapp_link").notNull(),
  image_url: text("image_url"),
  description: text("description"),
  member_count: integer("member_count"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  featured: integer("featured").default(0),
});

// Schema for inserting WhatsApp groups
export const insertWhatsappGroupSchema = createInsertSchema(whatsappGroups)
  .omit({ id: true, created_at: true })
  .extend({
    // Add validation for the WhatsApp link field
    whatsapp_link: z.string()
      .url("Must be a valid URL")
      .includes("chat.whatsapp.com", { message: "Must be a valid WhatsApp invite link" })
  });

// Categories definition
export const categories = [
  "Business", "Education", "Entertainment", "Sports", 
  "Technology", "Travel", "Food", "Health", "Finance", "Marketing", "Others"
];

// Countries definition
export const countries = [
  "Global", "United States", "India", "United Kingdom", "Canada", "Australia", 
  "Germany", "France", "Spain", "Italy", "Brazil", "Mexico", "Japan", 
  "China", "South Korea", "Nigeria", "South Africa", "UAE", "Singapore", "Other"
];

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertWhatsappGroup = z.infer<typeof insertWhatsappGroupSchema>;
export type WhatsappGroup = typeof whatsappGroups.$inferSelect;
