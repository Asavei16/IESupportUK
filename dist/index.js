// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
var MemStorage = class {
  users;
  applications;
  universities;
  testimonials;
  blogPosts;
  contactForms;
  userId;
  applicationId;
  universityId;
  testimonialId;
  blogPostId;
  contactFormId;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.applications = /* @__PURE__ */ new Map();
    this.universities = /* @__PURE__ */ new Map();
    this.testimonials = /* @__PURE__ */ new Map();
    this.blogPosts = /* @__PURE__ */ new Map();
    this.contactForms = /* @__PURE__ */ new Map();
    this.userId = 1;
    this.applicationId = 1;
    this.universityId = 1;
    this.testimonialId = 1;
    this.blogPostId = 1;
    this.contactFormId = 1;
    this.initializeData();
  }
  // User operations
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = this.userId++;
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Application operations
  async getApplications() {
    return Array.from(this.applications.values());
  }
  async getApplication(id) {
    return this.applications.get(id);
  }
  async createApplication(insertApplication) {
    const id = this.applicationId++;
    const now = /* @__PURE__ */ new Date();
    const application = {
      ...insertApplication,
      id,
      status: "pending",
      createdAt: now
    };
    this.applications.set(id, application);
    return application;
  }
  // University operations
  async getUniversities() {
    return Array.from(this.universities.values());
  }
  async getUniversity(id) {
    return this.universities.get(id);
  }
  async createUniversity(insertUniversity) {
    const id = this.universityId++;
    const university = { ...insertUniversity, id };
    this.universities.set(id, university);
    return university;
  }
  // Testimonial operations
  async getTestimonials() {
    return Array.from(this.testimonials.values());
  }
  async getTestimonial(id) {
    return this.testimonials.get(id);
  }
  async createTestimonial(insertTestimonial) {
    const id = this.testimonialId++;
    const testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  // Blog operations
  async getBlogPosts() {
    return Array.from(this.blogPosts.values());
  }
  async getBlogPostBySlug(slug) {
    return Array.from(this.blogPosts.values()).find((post) => post.slug === slug);
  }
  async createBlogPost(insertBlogPost) {
    const id = this.blogPostId++;
    const now = /* @__PURE__ */ new Date();
    const blogPost = { ...insertBlogPost, id, createdAt: now };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }
  // Contact form operations
  async getContactForms() {
    return Array.from(this.contactForms.values());
  }
  async createContactForm(insertContactForm) {
    const id = this.contactFormId++;
    const now = /* @__PURE__ */ new Date();
    const contactForm = {
      ...insertContactForm,
      id,
      status: "new",
      createdAt: now
    };
    this.contactForms.set(id, contactForm);
    return contactForm;
  }
  // Initialize with sample data
  initializeData() {
    const universities2 = [
      {
        name: "University of Oxford",
        location: "Oxford, UK",
        description: "The University of Oxford is a collegiate research university in Oxford, England. There is evidence of teaching as early as 1096, making it the oldest university in the English-speaking world and the world's second-oldest university in continuous operation.",
        descriptionRo: "Universitatea din Oxford este o universitate de cercetare colegial\u0103 din Oxford, Anglia. Exist\u0103 dovezi ale pred\u0103rii \xEEnc\u0103 din 1096, ceea ce o face cea mai veche universitate din lumea vorbitoare de limba englez\u0103 \u0219i a doua cea mai veche universitate din lume \xEEn func\u021Biune continu\u0103.",
        image: "https://pixabay.com/get/g17ea4bee88ccfec7ab9dd35a513b4c9860bc09dadfb28aabac53764524eb5836d7bc01460d219850c253d848c043b55644d19217c61527bffd7a76c0d06d8b30_1280.jpg",
        programs: [
          { name: "Computer Science", duration: "3 years", tuition: "\xA39,250 per year" },
          { name: "Business Administration", duration: "3 years", tuition: "\xA39,250 per year" },
          { name: "Medicine", duration: "6 years", tuition: "\xA39,250 per year" }
        ],
        ranking: 1
      },
      {
        name: "Imperial College London",
        location: "London, UK",
        description: "Imperial College London is a public research university in London. Its founder, Prince Albert, envisioned an area for culture, including the Natural History Museum, Victoria and Albert Museum, Science Museum, Royal Albert Hall, and the Imperial Institute.",
        descriptionRo: "Imperial College Londra este o universitate public\u0103 de cercetare din Londra. Fondatorul s\u0103u, Prin\u021Bul Albert, a imaginat o zon\u0103 pentru cultur\u0103, inclusiv Muzeul de Istorie Natural\u0103, Muzeul Victoria \u0219i Albert, Muzeul \u0218tiin\u021Bei, Royal Albert Hall \u0219i Institutul Imperial.",
        image: "https://pixabay.com/get/g2dbb1b74b3b147de1b60c53446ab6d33b95e0526066efd06f135630e76849a4b5084cf7f78a09300e389f1f9734e6c67e7be85705ab6eee9cdaccf62a4895c7b_1280.jpg",
        programs: [
          { name: "Chemical Engineering", duration: "4 years", tuition: "\xA39,250 per year" },
          { name: "Physics", duration: "3 years", tuition: "\xA39,250 per year" },
          { name: "Mathematics", duration: "3 years", tuition: "\xA39,250 per year" }
        ],
        ranking: 6
      },
      {
        name: "University of Cambridge",
        location: "Cambridge, UK",
        description: "The University of Cambridge is a collegiate public research university in Cambridge, United Kingdom. Founded in 1209 and granted a royal charter by Henry III in 1231, Cambridge is the second-oldest university in the English-speaking world.",
        descriptionRo: "Universitatea din Cambridge este o universitate public\u0103 de cercetare colegial\u0103 din Cambridge, Regatul Unit. Fondat\u0103 \xEEn 1209 \u0219i av\xE2nd o cart\u0103 regal\u0103 acordat\u0103 de Henric al III-lea \xEEn 1231, Cambridge este a doua cea mai veche universitate din lumea vorbitoare de limba englez\u0103.",
        image: "https://pixabay.com/get/g42853990d496ccc14c91239efd5bb54476739884eeb6543f636daa018103552ac54e5766cc14bfe74e519c99c8727cd3ac88ffc441fa4c8ed9243960e04f811b_1280.jpg",
        programs: [
          { name: "English Literature", duration: "3 years", tuition: "\xA39,250 per year" },
          { name: "Computer Science", duration: "3 years", tuition: "\xA39,250 per year" },
          { name: "Natural Sciences", duration: "3 years", tuition: "\xA39,250 per year" }
        ],
        ranking: 3
      },
      {
        name: "London School of Economics",
        location: "London, UK",
        description: "The London School of Economics and Political Science is a public research university located in London, England and a constituent college of the federal University of London. Founded in 1895, LSE joined the University of London in 1900.",
        descriptionRo: "London School of Economics and Political Science este o universitate public\u0103 de cercetare situat\u0103 \xEEn Londra, Anglia \u0219i un colegiu constituent al Universit\u0103\u021Bii Federale din Londra. Fondat\u0103 \xEEn 1895, LSE s-a al\u0103turat Universit\u0103\u021Bii din Londra \xEEn 1900.",
        image: "https://pixabay.com/get/gc175f43cd1461848cd971505d79fc321d3757fa649677fd21ec794a453c46f319fbfb2b83c6ebc0dc1bf79a840ce8913c4b1154a4f61aab0318368e7ba494215_1280.jpg",
        programs: [
          { name: "Economics", duration: "3 years", tuition: "\xA39,250 per year" },
          { name: "International Relations", duration: "3 years", tuition: "\xA39,250 per year" },
          { name: "Law", duration: "3 years", tuition: "\xA39,250 per year" }
        ],
        ranking: 9
      }
    ];
    universities2.forEach((university) => {
      this.createUniversity(university);
    });
    const testimonials2 = [
      {
        name: "Maria Popescu",
        university: "University of Oxford",
        quote: "IE Support UK helped me navigate the complex application process for Oxford. Their advisors were always available to answer my questions and guide me through each step.",
        quoteRo: "IE Support UK m-a ajutat s\u0103 navighez prin procesul complex de aplicare pentru Oxford. Consilierii lor au fost \xEEntotdeauna disponibili pentru a r\u0103spunde la \xEEntreb\u0103rile mele \u0219i pentru a m\u0103 ghida prin fiecare etap\u0103.",
        image: "/images/testimonials/maria.jpg",
        rating: 5
      },
      {
        name: "Alexandru Ionescu",
        university: "Imperial College London",
        quote: "I couldn't have gotten into Imperial without IE Support UK's assistance. They provided personalized guidance and helped me prepare for interviews.",
        quoteRo: "Nu a\u0219 fi putut intra la Imperial f\u0103r\u0103 asisten\u021Ba IE Support UK. Mi-au oferit \xEEndrumare personalizat\u0103 \u0219i m-au ajutat s\u0103 m\u0103 preg\u0103tesc pentru interviuri.",
        image: "/images/testimonials/maria.jpg",
        rating: 5
      },
      {
        name: "Elena Dumitrescu",
        university: "University of Cambridge",
        quote: "The team at IE Support UK was incredibly supportive throughout my Cambridge application. They have extensive knowledge of UK universities and offer invaluable insights.",
        quoteRo: "Echipa de la IE Support UK a fost incredibil de suportiv\u0103 pe tot parcursul aplica\u021Biei mele la Cambridge. Au cuno\u0219tin\u021Be extinse despre universit\u0103\u021Bile din Regatul Unit \u0219i ofer\u0103 perspective inestimabile.",
        image: "/images/testimonials/maria.jpg",
        rating: 5
      }
    ];
    testimonials2.forEach((testimonial) => {
      this.createTestimonial(testimonial);
    });
    const blogPosts2 = [
      {
        title: "How to Choose the Right University in the UK",
        titleRo: "Cum s\u0103 alegi universitatea potrivit\u0103 \xEEn Regatul Unit",
        slug: "how-to-choose-right-university-uk",
        content: "Choosing the right university is a crucial decision that can shape your future career. In this article, we outline key factors to consider when selecting a UK university, from academic reputation to campus life.",
        contentRo: "Alegerea universit\u0103\u021Bii potrivite este o decizie crucial\u0103 care \xEE\u021Bi poate modela viitoarea carier\u0103. \xCEn acest articol, prezent\u0103m factori cheie de luat \xEEn considerare atunci c\xE2nd selectezi o universitate din Regatul Unit, de la reputa\u021Bia academic\u0103 la via\u021Ba de campus.",
        image: "https://pixabay.com/get/g9ea9f7089b0727a7d7e852e95b0524bdea26d5a191a6bce9f25412f0fc30930e5686b942446604b96566f589ef4074004c56ba3314996b1ad189f0e1cdccd6e7_1280.jpg",
        author: "John Smith",
        tags: ["UK universities", "education abroad", "study tips"]
      },
      {
        title: "Understanding Student Visas for the UK",
        titleRo: "\xCEn\u021Belegerea vizelor de student pentru Regatul Unit",
        slug: "understanding-student-visas-uk",
        content: "Navigating the UK student visa process can be complex. This guide breaks down the requirements, application process, and common pitfalls to avoid when applying for your student visa.",
        contentRo: "Navigarea prin procesul de ob\u021Binere a vizei de student pentru Regatul Unit poate fi complex\u0103. Acest ghid detaliaz\u0103 cerin\u021Bele, procesul de aplicare \u0219i gre\u0219elile comune de evitat atunci c\xE2nd aplici pentru viza de student.",
        image: "https://pixabay.com/get/ge9aed3f5d379fc497d3068d4ff4fe5a64db6c23c64eb52e8c973cba7e907436b067527695717c876cd29102ca7dbe7917bb604be01a67fff09f10d4a512f5d91_1280.jpg",
        author: "Emily Johnson",
        tags: ["student visa", "UK immigration", "international students"]
      },
      {
        title: "Top Scholarships for International Students in 2023",
        titleRo: "Cele mai bune burse pentru studen\u021Bii interna\u021Bionali \xEEn 2023",
        slug: "top-scholarships-international-students-2023",
        content: "Funding your education abroad can be challenging, but numerous scholarships are available for international students. This article highlights the most prestigious and generous scholarships for studying in the UK.",
        contentRo: "Finan\u021Barea educa\u021Biei \xEEn str\u0103in\u0103tate poate fi o provocare, dar numeroase burse sunt disponibile pentru studen\u021Bii interna\u021Bionali. Acest articol eviden\u021Biaz\u0103 cele mai prestigioase \u0219i generoase burse pentru studiul \xEEn Regatul Unit.",
        image: "https://pixabay.com/get/g2ed373a5b8543201f955c5d421d7bf33a62f180112ca35bd79bad0079d8b7a74f0c873fb5f2eefe23f2bb2f6fc93206bbeaaac371080d14189fb1635aa71db41_1280.jpg",
        author: "David Williams",
        tags: ["scholarships", "financial aid", "international education"]
      }
    ];
    blogPosts2.forEach((blogPost) => {
      this.createBlogPost(blogPost);
    });
    this.createUser({
      username: "admin",
      password: "adminpassword",
      name: "Admin User",
      email: "admin@ask33.com",
      role: "admin"
    });
  }
};
var storage = new MemStorage();

// server/routes.ts
import multer from "multer";

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("user")
});
var insertUserSchema = createInsertSchema(users).omit({
  id: true
});
var applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  earliestStartDate: text("earliest_start_date").notNull(),
  preferredInterviewDate: text("preferred_interview_date").notNull(),
  settleStatus: text("settle_status").notNull(),
  englishLevel: text("english_level").notNull(),
  employed: boolean("employed").notNull(),
  nationality: text("nationality").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var insertApplicationSchema = createInsertSchema(applications).omit({
  id: true,
  createdAt: true,
  status: true
});
var universities = pgTable("universities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  description: text("description").notNull(),
  descriptionRo: text("description_ro").notNull(),
  image: text("image").notNull(),
  tuition: text("tuition").notNull(),
  programs: json("programs").notNull(),
  ranking: integer("ranking")
});
var insertUniversitySchema = createInsertSchema(universities).omit({
  id: true
});
var testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  university: text("university").notNull(),
  quote: text("quote").notNull(),
  quoteRo: text("quote_ro").notNull(),
  image: text("image").notNull(),
  rating: integer("rating").notNull()
});
var insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true
});
var blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  titleRo: text("title_ro").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  contentRo: text("content_ro").notNull(),
  image: text("image").notNull(),
  author: text("author").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  tags: json("tags").notNull()
});
var insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true
});
var contactForms = pgTable("contact_forms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  status: text("status").notNull().default("new")
});
var insertContactFormSchema = createInsertSchema(contactForms).omit({
  id: true,
  createdAt: true,
  status: true
});

// server/routes.ts
import { fromZodError } from "zod-validation-error";
var upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
    // 5MB limit
  }
});
async function registerRoutes(app2) {
  app2.get("/api/courses", async (_req, res) => {
    try {
      const universities2 = await storage.getUniversities();
      return res.json(universities2);
    } catch (error) {
      console.error("Error fetching courses:", error);
      return res.status(500).json({ message: "Failed to fetch courses" });
    }
  });
  app2.get("/api/courses/:id", async (req, res) => {
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
  app2.get("/api/testimonials", async (_req, res) => {
    try {
      const testimonials2 = await storage.getTestimonials();
      return res.json(testimonials2);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      return res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  app2.get("/api/blog", async (_req, res) => {
    try {
      const blogPosts2 = await storage.getBlogPosts();
      return res.json(blogPosts2);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return res.status(500).json({ message: "Failed to fetch blog posts" });
    }
  });
  app2.get("/api/blog/:slug", async (req, res) => {
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
  app2.post("/api/applications", async (req, res) => {
    try {
      const files = req.files;
      const result = insertApplicationSchema.safeParse({
        ...req.body,
        employed: req.body.employed === "true"
      });
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.message });
      }
      const application = await storage.createApplication(result.data);
      return res.status(201).json(application);
    } catch (error) {
      console.error("Error submitting application:", error);
      return res.status(500).json({ message: "Failed to submit application" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const result = insertContactFormSchema.safeParse(req.body);
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ message: validationError.message });
      }
      const contactForm = await storage.createContactForm(result.data);
      return res.status(201).json(contactForm);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      return res.status(500).json({ message: "Failed to submit contact form" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
