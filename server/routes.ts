import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import { insertApplicationSchema, insertContactFormSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

// Setup multer memory storage for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  } 
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - all prefixed with /api
  
  // Get all universities
  app.get("/api/courses", async (_req: Request, res: Response) => {
    try {
      const universities = await storage.getUniversities();
      return res.json(universities);
    } catch (error) {
      console.error("Error fetching courses:", error);
      return res.status(500).json({ message: "Failed to fetch courses" });
    }
  });
  
  // Get university by ID
  app.get("/api/courses/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid courses ID" });
      }
      
      const university = await storage.getUniversity(id);
      if (!university) {
        return res.status(404).json({ message: "Courses not found" });
      }
      
      return res.json(university);
    } catch (error) {
      console.error("Error fetching courses:", error);
      return res.status(500).json({ message: "Failed to fetch courses" });
    }
  });
  
  // Get all testimonials
  app.get("/api/testimonials", async (_req: Request, res: Response) => {
    try {
      const testimonials = await storage.getTestimonials();
      return res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  
  // Get all blog posts
  app.get("/api/blog", async (_req: Request, res: Response) => {
    try {
      const blogPosts = await storage.getBlogPosts();
      return res.json(blogPosts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });
  
  // Get blog post by slug
  app.get("/api/blog/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const blogPost = await storage.getBlogPostBySlug(slug);
      
      if (!blogPost) {
        return res.status(404).json({ message: "Blog post not found" });
      }
      
      return res.json(blogPost);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      return res.status(500).json({ message: "Failed to fetch blog post" });
    }
  });
  
  // Submit application form
  app.post("/api/applications", async (req: Request, res: Response) => {
    try {
      // Convert file information to a storable format
      const files = req.files as Express.Multer.File[];
      
      // Validate form data
      const result = insertApplicationSchema.safeParse({
        ...req.body, 
        employed: req.body.employed === "true",
      });
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.message });
      }
      
      // Save application
      const application = await storage.createApplication(result.data);
      
      return res.status(201).json(application);
    } catch (error) {
      console.error("Error submitting application:", error);
      return res.status(500).json({ message: "Failed to submit application" });
    }
  });
  
  // Submit contact form
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate form data
      const result = insertContactFormSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.message });
      }
      
      // Save contact form submission
      const contactForm = await storage.createContactForm(result.data);
      
      return res.status(201).json(contactForm);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      return res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
