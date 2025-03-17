import { users, whatsappGroups, type User, type InsertUser, type WhatsappGroup, type InsertWhatsappGroup } from "@shared/schema";

// Extend the interface with methods for WhatsApp groups
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // WhatsApp Group methods
  getAllGroups(): Promise<WhatsappGroup[]>;
  getGroupById(id: number): Promise<WhatsappGroup | undefined>;
  getGroupsByCategory(category: string): Promise<WhatsappGroup[]>;
  getFeaturedGroups(limit?: number): Promise<WhatsappGroup[]>;
  getRecentGroups(limit?: number): Promise<WhatsappGroup[]>;
  createGroup(group: InsertWhatsappGroup): Promise<WhatsappGroup>;
  searchGroups(query: string): Promise<WhatsappGroup[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private groups: Map<number, WhatsappGroup>;
  currentUserId: number;
  currentGroupId: number;

  constructor() {
    this.users = new Map();
    this.groups = new Map();
    this.currentUserId = 1;
    this.currentGroupId = 1;
    
    // Add some initial data for groups
    this.seedGroups();
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // WhatsApp Group methods
  async getAllGroups(): Promise<WhatsappGroup[]> {
    return Array.from(this.groups.values());
  }

  async getGroupById(id: number): Promise<WhatsappGroup | undefined> {
    return this.groups.get(id);
  }

  async getGroupsByCategory(category: string): Promise<WhatsappGroup[]> {
    return Array.from(this.groups.values()).filter(
      (group) => group.category.toLowerCase() === category.toLowerCase()
    );
  }

  async getFeaturedGroups(limit = 3): Promise<WhatsappGroup[]> {
    return Array.from(this.groups.values())
      .filter(group => group.featured > 0)
      .sort((a, b) => b.featured - a.featured)
      .slice(0, limit);
  }

  async getRecentGroups(limit = 4): Promise<WhatsappGroup[]> {
    return Array.from(this.groups.values())
      .sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      })
      .slice(0, limit);
  }

  async createGroup(insertGroup: InsertWhatsappGroup): Promise<WhatsappGroup> {
    const id = this.currentGroupId++;
    const created_at = new Date();
    const group: WhatsappGroup = { 
      ...insertGroup, 
      id, 
      created_at,
      country: insertGroup.country || "Global",
      featured: insertGroup.featured || 0,
      description: insertGroup.description || null,
      image_url: insertGroup.image_url || null,
      member_count: insertGroup.member_count || null
    };
    this.groups.set(id, group);
    return group;
  }

  async searchGroups(query: string): Promise<WhatsappGroup[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.groups.values()).filter(
      (group) => 
        group.group_name.toLowerCase().includes(lowerQuery) || 
        group.description?.toLowerCase().includes(lowerQuery) ||
        group.category.toLowerCase().includes(lowerQuery) ||
        group.country.toLowerCase().includes(lowerQuery)
    );
  }

  // Seed some initial data for testing purposes
  private seedGroups() {
    // Featured groups
    this.createGroup({
      group_name: "Business Network USA",
      category: "Business",
      whatsapp_link: "https://chat.whatsapp.com/example1",
      image_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450",
      description: "Connect with entrepreneurs and business professionals across the USA",
      member_count: 500,
      featured: 3
    });

    this.createGroup({
      group_name: "Tech Enthusiasts",
      category: "Technology",
      whatsapp_link: "https://chat.whatsapp.com/example2",
      image_url: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450",
      description: "Stay updated with the latest in technology, gadgets and programming",
      member_count: 750,
      featured: 2
    });

    this.createGroup({
      group_name: "Book Lovers Club",
      category: "Education",
      whatsapp_link: "https://chat.whatsapp.com/example3",
      image_url: "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450",
      description: "A community for bookworms to discuss and recommend great reads",
      member_count: 320,
      featured: 1
    });

    // Recent groups
    this.createGroup({
      group_name: "Fitness Motivation",
      category: "Health",
      whatsapp_link: "https://chat.whatsapp.com/example4",
      image_url: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450",
      description: "Daily workout tips and motivation to stay fit",
      member_count: 220,
      featured: 0
    });

    this.createGroup({
      group_name: "Travel Enthusiasts",
      category: "Travel",
      whatsapp_link: "https://chat.whatsapp.com/example5",
      image_url: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450",
      description: "Share travel experiences and tips with fellow travelers",
      member_count: 430,
      featured: 0
    });

    this.createGroup({
      group_name: "Digital Marketing Masters",
      category: "Marketing",
      whatsapp_link: "https://chat.whatsapp.com/example6",
      image_url: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450",
      description: "Learn and discuss digital marketing strategies",
      member_count: 280,
      featured: 0
    });

    this.createGroup({
      group_name: "Crypto Investors",
      category: "Finance",
      whatsapp_link: "https://chat.whatsapp.com/example7",
      image_url: "https://images.unsplash.com/photo-1556248305-84a22817f323?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=450",
      description: "Discussions on cryptocurrency investments and market trends",
      member_count: 350,
      featured: 0
    });
  }
}

export const storage = new MemStorage();
