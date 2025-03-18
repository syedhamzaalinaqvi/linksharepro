import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWhatsappGroupSchema, categories, countries } from "@shared/schema";
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
  
  // Get all available countries
  app.get("/api/countries", (_req: Request, res: Response) => {
    return res.json(countries);
  });
  
  // Get WhatsApp groups by country
  app.get("/api/countries/:country", async (req: Request, res: Response) => {
    try {
      const { country } = req.params;
      const groups = await storage.getGroupsByCountry(country);
      return res.json(groups);
    } catch (error) {
      console.error("Error fetching groups by country:", error);
      return res.status(500).json({ message: "Failed to fetch groups by country" });
    }
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

  // Search WhatsApp groups with optional filters
  app.get("/api/search", async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      const category = req.query.category as string;
      const country = req.query.country as string;
      
      if (!query && !category && !country) {
        return res.status(400).json({ message: "At least one search parameter is required" });
      }
      
      let results = await storage.searchGroups(query || "");
      
      // Apply additional filters if provided
      if (category) {
        results = results.filter(group => 
          group.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      if (country) {
        results = results.filter(group => 
          group.country.toLowerCase() === country.toLowerCase()
        );
      }
      
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
      
      // Extract the invite code from the WhatsApp URL
      const inviteCode = url.split('chat.whatsapp.com/')[1]?.split('/')[0];
      
      if (!inviteCode) {
        return res.status(400).json({ message: "Could not extract invite code from URL" });
      }

      try {
        // Try to fetch actual metadata from WhatsApp if possible
        // This approach might not work due to WhatsApp's anti-scraping measures
        const response = await fetch(`https://chat.whatsapp.com/${inviteCode}`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });
        
        const html = await response.text();
        
        // Try to extract metadata from the HTML
        const titleMatch = html.match(/<meta property="og:title" content="([^"]+)"/);
        const descriptionMatch = html.match(/<meta property="og:description" content="([^"]+)"/);
        const imageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
        
        const ogData = {
          title: titleMatch ? titleMatch[1] : getDefaultTitle(inviteCode),
          description: descriptionMatch ? descriptionMatch[1] : "Join this WhatsApp group!",
          image: imageMatch ? imageMatch[1] : "https://whatsapp.com/apple-touch-icon.png",
          url: url
        };
        
        return res.json(ogData);
      } catch (fetchError) {
        console.error("Error fetching from WhatsApp:", fetchError);
        
        // If fetching fails, return a formatted response based on the invite code
        return res.json({
          title: getDefaultTitle(inviteCode),
          description: "Join this WhatsApp group!",
          image: "https://whatsapp.com/apple-touch-icon.png",
          url: url
        });
      }
    } catch (error) {
      console.error("Error fetching OG data:", error);
      return res.status(500).json({ message: "Failed to fetch Open Graph data" });
    }
  });
  
  // Helper function to create a formatted title from invite code
  function getDefaultTitle(inviteCode: string): string {
    // Convert the invite code to something readable
    const formatted = inviteCode.replace(/[^a-zA-Z0-9]/g, ' ');
    return `WhatsApp Group: ${formatted.substring(0, 15)}...`;
  }

  const httpServer = createServer(app);
  return httpServer;
}
