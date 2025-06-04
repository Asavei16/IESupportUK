import { 
  users, applications, universities, testimonials, blogPosts, contactForms,
  type User, type InsertUser, 
  type Application, type InsertApplication,
  type University, type InsertUniversity,
  type Testimonial, type InsertTestimonial,
  type BlogPost, type InsertBlogPost,
  type ContactForm, type InsertContactForm
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Application operations
  getApplications(): Promise<Application[]>;
  getApplication(id: number): Promise<Application | undefined>;
  createApplication(application: InsertApplication): Promise<Application>;
  
  // University operations
  getUniversities(): Promise<University[]>;
  getUniversity(id: number): Promise<University | undefined>;
  createUniversity(university: InsertUniversity): Promise<University>;
  
  // Testimonial operations
  getTestimonials(): Promise<Testimonial[]>;
  getTestimonial(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Blog operations
  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  
  // Contact form operations
  getContactForms(): Promise<ContactForm[]>;
  createContactForm(contactForm: InsertContactForm): Promise<ContactForm>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private applications: Map<number, Application>;
  private universities: Map<number, University>;
  private testimonials: Map<number, Testimonial>;
  private blogPosts: Map<number, BlogPost>;
  private contactForms: Map<number, ContactForm>;
  
  private userId: number;
  private applicationId: number;
  private universityId: number;
  private testimonialId: number;
  private blogPostId: number;
  private contactFormId: number;

  constructor() {
    this.users = new Map();
    this.applications = new Map();
    this.universities = new Map();
    this.testimonials = new Map();
    this.blogPosts = new Map();
    this.contactForms = new Map();
    
    this.userId = 1;
    this.applicationId = 1;
    this.universityId = 1;
    this.testimonialId = 1;
    this.blogPostId = 1;
    this.contactFormId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Application operations
  async getApplications(): Promise<Application[]> {
    return Array.from(this.applications.values());
  }
  
  async getApplication(id: number): Promise<Application | undefined> {
    return this.applications.get(id);
  }
  
  async createApplication(insertApplication: InsertApplication): Promise<Application> {
    const id = this.applicationId++;
    const now = new Date();
    const application: Application = { 
      ...insertApplication, 
      id, 
      status: "pending", 
      createdAt: now 
    };
    this.applications.set(id, application);
    return application;
  }
  
  // University operations
  async getUniversities(): Promise<University[]> {
    return Array.from(this.universities.values());
  }
  
  async getUniversity(id: number): Promise<University | undefined> {
    return this.universities.get(id);
  }
  
  async createUniversity(insertUniversity: InsertUniversity): Promise<University> {
    const id = this.universityId++;
    const university: University = { ...insertUniversity, id };
    this.universities.set(id, university);
    return university;
  }
  
  // Testimonial operations
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async getTestimonial(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }
  
  async createTestimonial(insertTestimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialId++;
    const testimonial: Testimonial = { ...insertTestimonial, id };
    this.testimonials.set(id, testimonial);
    return testimonial;
  }
  
  // Blog operations
  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(post => post.slug === slug);
  }
  
  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.blogPostId++;
    const now = new Date();
    const blogPost: BlogPost = { ...insertBlogPost, id, createdAt: now };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }
  
  // Contact form operations
  async getContactForms(): Promise<ContactForm[]> {
    return Array.from(this.contactForms.values());
  }
  
  async createContactForm(insertContactForm: InsertContactForm): Promise<ContactForm> {
    const id = this.contactFormId++;
    const now = new Date();
    const contactForm: ContactForm = { 
      ...insertContactForm, 
      id, 
      status: "new", 
      createdAt: now 
    };
    this.contactForms.set(id, contactForm);
    return contactForm;
  }
  
  // Initialize with sample data
  private initializeData() {
    // Sample universities
    const universities: InsertUniversity[] = [
      {
        name: "University of Oxford",
        location: "Oxford, UK",
        description: "The University of Oxford is a collegiate research university in Oxford, England. There is evidence of teaching as early as 1096, making it the oldest university in the English-speaking world and the world's second-oldest university in continuous operation.",
        descriptionRo: "Universitatea din Oxford este o universitate de cercetare colegială din Oxford, Anglia. Există dovezi ale predării încă din 1096, ceea ce o face cea mai veche universitate din lumea vorbitoare de limba engleză și a doua cea mai veche universitate din lume în funcțiune continuă.",
        image: "https://pixabay.com/get/g17ea4bee88ccfec7ab9dd35a513b4c9860bc09dadfb28aabac53764524eb5836d7bc01460d219850c253d848c043b55644d19217c61527bffd7a76c0d06d8b30_1280.jpg",
        programs: [
          { name: "Computer Science", duration: "3 years", tuition: "£9,250 per year" },
          { name: "Business Administration", duration: "3 years", tuition: "£9,250 per year" },
          { name: "Medicine", duration: "6 years", tuition: "£9,250 per year" }
        ],
        ranking: 1
      },
      {
        name: "Imperial College London",
        location: "London, UK",
        description: "Imperial College London is a public research university in London. Its founder, Prince Albert, envisioned an area for culture, including the Natural History Museum, Victoria and Albert Museum, Science Museum, Royal Albert Hall, and the Imperial Institute.",
        descriptionRo: "Imperial College Londra este o universitate publică de cercetare din Londra. Fondatorul său, Prințul Albert, a imaginat o zonă pentru cultură, inclusiv Muzeul de Istorie Naturală, Muzeul Victoria și Albert, Muzeul Științei, Royal Albert Hall și Institutul Imperial.",
        image: "https://pixabay.com/get/g2dbb1b74b3b147de1b60c53446ab6d33b95e0526066efd06f135630e76849a4b5084cf7f78a09300e389f1f9734e6c67e7be85705ab6eee9cdaccf62a4895c7b_1280.jpg",
        programs: [
          { name: "Chemical Engineering", duration: "4 years", tuition: "£9,250 per year" },
          { name: "Physics", duration: "3 years", tuition: "£9,250 per year" },
          { name: "Mathematics", duration: "3 years", tuition: "£9,250 per year" }
        ],
        ranking: 6
      },
      {
        name: "University of Cambridge",
        location: "Cambridge, UK",
        description: "The University of Cambridge is a collegiate public research university in Cambridge, United Kingdom. Founded in 1209 and granted a royal charter by Henry III in 1231, Cambridge is the second-oldest university in the English-speaking world.",
        descriptionRo: "Universitatea din Cambridge este o universitate publică de cercetare colegială din Cambridge, Regatul Unit. Fondată în 1209 și având o cartă regală acordată de Henric al III-lea în 1231, Cambridge este a doua cea mai veche universitate din lumea vorbitoare de limba engleză.",
        image: "https://pixabay.com/get/g42853990d496ccc14c91239efd5bb54476739884eeb6543f636daa018103552ac54e5766cc14bfe74e519c99c8727cd3ac88ffc441fa4c8ed9243960e04f811b_1280.jpg",
        programs: [
          { name: "English Literature", duration: "3 years", tuition: "£9,250 per year" },
          { name: "Computer Science", duration: "3 years", tuition: "£9,250 per year" },
          { name: "Natural Sciences", duration: "3 years", tuition: "£9,250 per year" }
        ],
        ranking: 3
      },
      {
        name: "London School of Economics",
        location: "London, UK",
        description: "The London School of Economics and Political Science is a public research university located in London, England and a constituent college of the federal University of London. Founded in 1895, LSE joined the University of London in 1900.",
        descriptionRo: "London School of Economics and Political Science este o universitate publică de cercetare situată în Londra, Anglia și un colegiu constituent al Universității Federale din Londra. Fondată în 1895, LSE s-a alăturat Universității din Londra în 1900.",
        image: "https://pixabay.com/get/gc175f43cd1461848cd971505d79fc321d3757fa649677fd21ec794a453c46f319fbfb2b83c6ebc0dc1bf79a840ce8913c4b1154a4f61aab0318368e7ba494215_1280.jpg",
        programs: [
          { name: "Economics", duration: "3 years", tuition: "£9,250 per year" },
          { name: "International Relations", duration: "3 years", tuition: "£9,250 per year" },
          { name: "Law", duration: "3 years", tuition: "£9,250 per year" }
        ],
        ranking: 9
      }
    ];
    
    // Add universities
    universities.forEach(university => {
      this.createUniversity(university);
    });
    
    // Sample testimonials
    const testimonials: InsertTestimonial[] = [
      {
        name: "Maria Popescu",
        university: "University of Oxford",
        quote: "IE Support UK helped me navigate the complex application process for Oxford. Their advisors were always available to answer my questions and guide me through each step.",
        quoteRo: "IE Support UK m-a ajutat să navighez prin procesul complex de aplicare pentru Oxford. Consilierii lor au fost întotdeauna disponibili pentru a răspunde la întrebările mele și pentru a mă ghida prin fiecare etapă.",
        image: "/images/testimonials/maria.jpg",
        rating: 5
      },
      {
        name: "Alexandru Ionescu",
        university: "Imperial College London",
        quote: "I couldn't have gotten into Imperial without IE Support UK's assistance. They provided personalized guidance and helped me prepare for interviews.",
        quoteRo: "Nu aș fi putut intra la Imperial fără asistența IE Support UK. Mi-au oferit îndrumare personalizată și m-au ajutat să mă pregătesc pentru interviuri.",
        image: "/images/testimonials/maria.jpg",
        rating: 5
      },
      {
        name: "Elena Dumitrescu",
        university: "University of Cambridge",
        quote: "The team at IE Support UK was incredibly supportive throughout my Cambridge application. They have extensive knowledge of UK universities and offer invaluable insights.",
        quoteRo: "Echipa de la IE Support UK a fost incredibil de suportivă pe tot parcursul aplicației mele la Cambridge. Au cunoștințe extinse despre universitățile din Regatul Unit și oferă perspective inestimabile.",
        image: "/images/testimonials/maria.jpg",
        rating: 5
      }
    ];
    
    // Add testimonials
    testimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
    
    // Sample blog posts
    const blogPosts: InsertBlogPost[] = [
      {
        title: "How to Choose the Right University in the UK",
        titleRo: "Cum să alegi universitatea potrivită în Regatul Unit",
        slug: "how-to-choose-right-university-uk",
        content: "Choosing the right university is a crucial decision that can shape your future career. In this article, we outline key factors to consider when selecting a UK university, from academic reputation to campus life.",
        contentRo: "Alegerea universității potrivite este o decizie crucială care îți poate modela viitoarea carieră. În acest articol, prezentăm factori cheie de luat în considerare atunci când selectezi o universitate din Regatul Unit, de la reputația academică la viața de campus.",
        image: "https://pixabay.com/get/g9ea9f7089b0727a7d7e852e95b0524bdea26d5a191a6bce9f25412f0fc30930e5686b942446604b96566f589ef4074004c56ba3314996b1ad189f0e1cdccd6e7_1280.jpg",
        author: "John Smith",
        tags: ["UK universities", "education abroad", "study tips"]
      },
      {
        title: "Understanding Student Visas for the UK",
        titleRo: "Înțelegerea vizelor de student pentru Regatul Unit",
        slug: "understanding-student-visas-uk",
        content: "Navigating the UK student visa process can be complex. This guide breaks down the requirements, application process, and common pitfalls to avoid when applying for your student visa.",
        contentRo: "Navigarea prin procesul de obținere a vizei de student pentru Regatul Unit poate fi complexă. Acest ghid detaliază cerințele, procesul de aplicare și greșelile comune de evitat atunci când aplici pentru viza de student.",
        image: "https://pixabay.com/get/ge9aed3f5d379fc497d3068d4ff4fe5a64db6c23c64eb52e8c973cba7e907436b067527695717c876cd29102ca7dbe7917bb604be01a67fff09f10d4a512f5d91_1280.jpg",
        author: "Emily Johnson",
        tags: ["student visa", "UK immigration", "international students"]
      },
      {
        title: "Top Scholarships for International Students in 2023",
        titleRo: "Cele mai bune burse pentru studenții internaționali în 2023",
        slug: "top-scholarships-international-students-2023",
        content: "Funding your education abroad can be challenging, but numerous scholarships are available for international students. This article highlights the most prestigious and generous scholarships for studying in the UK.",
        contentRo: "Finanțarea educației în străinătate poate fi o provocare, dar numeroase burse sunt disponibile pentru studenții internaționali. Acest articol evidențiază cele mai prestigioase și generoase burse pentru studiul în Regatul Unit.",
        image: "https://pixabay.com/get/g2ed373a5b8543201f955c5d421d7bf33a62f180112ca35bd79bad0079d8b7a74f0c873fb5f2eefe23f2bb2f6fc93206bbeaaac371080d14189fb1635aa71db41_1280.jpg",
        author: "David Williams",
        tags: ["scholarships", "financial aid", "international education"]
      }
    ];
    
    // Add blog posts
    blogPosts.forEach(blogPost => {
      this.createBlogPost(blogPost);
    });

    // Create initial admin user
    this.createUser({
      username: "admin",
      password: "adminpassword",
      name: "Admin User",
      email: "admin@ask33.com",
      role: "admin"
    });
  }
}

export const storage = new MemStorage();
