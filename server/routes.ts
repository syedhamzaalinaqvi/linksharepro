import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWhatsappGroupSchema, categories } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes
  
  // Get all WhatsApp groups
  app.get("/api/groups", async (req: Request, res: Response) => {
    try {
      const groups = await storage.getAllGroups();
      return res.json(groups);
    } catch (error) {
      console.error("Error fetching groups:", error);
      return res.status(500).json({ message: "Failed to fetch groups" });
    }
  });

  // Get featured WhatsApp groups
  app.get("/api/groups/featured", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
      const featuredGroups = await storage.getFeaturedGroups(limit);
      return res.json(featuredGroups);
    } catch (error) {
      console.error("Error fetching featured groups:", error);
      return res.status(500).json({ message: "Failed to fetch featured groups" });
    }
  });

  // Get recent WhatsApp groups
  app.get("/api/groups/recent", async (req: Request, res: Response) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 4;
      const recentGroups = await storage.getRecentGroups(limit);
      return res.json(recentGroups);
    } catch (error) {
      console.error("Error fetching recent groups:", error);
      return res.status(500).json({ message: "Failed to fetch recent groups" });
    }
  });

  // Get a single WhatsApp group by ID
  app.get("/api/groups/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const group = await storage.getGroupById(id);
      
      if (!group) {
        return res.status(404).json({ message: "Group not found" });
      }
      
      return res.json(group);
    } catch (error) {
      console.error("Error fetching group:", error);
      return res.status(500).json({ message: "Failed to fetch group" });
    }
  });

  // Get WhatsApp groups by category
  app.get("/api/categories/:category", async (req: Request, res: Response) => {
    try {
      const { category } = req.params;
      const groups = await storage.getGroupsByCategory(category);
      return res.json(groups);
    } catch (error) {
      console.error("Error fetching groups by category:", error);
      return res.status(500).json({ message: "Failed to fetch groups by category" });
    }
  });

  // Get all available categories
  app.get("/api/categories", (_req: Request, res: Response) => {
    return res.json(categories);
  });

  // Create a new WhatsApp group
  app.post("/api/groups", async (req: Request, res: Response) => {
    try {
      const groupData = insertWhatsappGroupSchema.parse(req.body);
      const newGroup = await storage.createGroup(groupData);
      return res.status(201).json(newGroup);
    } catch (error) {
      console.error("Error creating group:", error);
      
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      
      return res.status(500).json({ message: "Failed to create group" });
    }
  });

  // Search WhatsApp groups
  app.get("/api/search", async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      
      const results = await storage.searchGroups(query);
      return res.json(results);
    } catch (error) {
      console.error("Error searching groups:", error);
      return res.status(500).json({ message: "Failed to search groups" });
    }
  });

  // Route for fetching Open Graph data for a WhatsApp group link
  app.post("/api/fetch-og", async (req: Request, res: Response) => {
    try {
      const { url } = req.body;
      
      if (!url || !url.includes('chat.whatsapp.com')) {
        return res.status(400).json({ message: "Invalid WhatsApp group link" });
      }
      
      // In a real application, you would fetch Open Graph data from the URL
      // For this demo, return mock data since we can't actually scrape WhatsApp links
      const ogData = {
        title: "WhatsApp Group",
        description: "Join this WhatsApp group!",
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450",
        url: url
      };
      
      return res.json(ogData);
    } catch (error) {
      console.error("Error fetching OG data:", error);
      return res.status(500).json({ message: "Failed to fetch Open Graph data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
