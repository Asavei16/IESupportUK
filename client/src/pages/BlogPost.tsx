import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { useI18n } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, User, ArrowLeft, Tag } from "lucide-react";
import { format } from "date-fns";

const BlogPostSkeleton = () => (
  <div className="space-y-6">
    <Skeleton className="h-10 w-3/4" />
    <div className="flex gap-4 mb-8">
      <div className="flex items-center">
        <Skeleton className="h-4 w-4 mr-2" />
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="flex items-center">
        <Skeleton className="h-4 w-4 mr-2" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
    <Skeleton className="h-64 w-full rounded-lg" />
    <div className="space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
    <div className="space-y-4">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  </div>
);

const MOCK_BLOG_POSTS = [
  {
    id: 1,
    slug: "how-to-apply-uk-universities",
    title: "How to Apply to UK Universities",
    titleRo: "Cum să aplici la universități din UK",
    content: "Applying to UK universities can seem daunting, but with the right preparation, you can succeed. In this article, we'll guide you through the UCAS process, personal statements, and interviews.",
    contentRo: "Aplicarea la universitățile din UK poate părea dificilă, dar cu pregătirea potrivită poți reuși. În acest articol vei afla despre procesul UCAS, scrierea personal statement-ului și interviuri.",
    author: "Ana Popescu",
    image: "/images/articles/article1.jpg",
    createdAt: "2024-05-20T10:00:00Z",
    tags: ["UK", "Universities", "Application"],
  },
  {
    id: 2,
    slug: "student-life-in-london",
    title: "Student Life in London: What to Expect",
    titleRo: "Viața de student în Londra: La ce să te aștepți",
    content: "London offers a vibrant student experience, from world-class libraries to diverse nightlife. Discover tips for making the most of your time in the UK capital.",
    contentRo: "Londra oferă o experiență studențească vibrantă, de la biblioteci de top la viață de noapte diversă. Descoperă sfaturi pentru a profita la maxim de timpul tău în capitala UK.",
    author: "George Ionescu",
    image: "/images/articles/article2.jpg",
    createdAt: "2024-05-10T09:00:00Z",
    tags: ["Student Life", "London"],
  },
  {
    id: 3,
    slug: "scholarships-international-students",
    title: "Scholarships for International Students",
    titleRo: "Burse pentru studenți internaționali",
    content: "Learn about the best scholarships available for international students in the UK, how to apply, and tips for a successful application.",
    contentRo: "Află despre cele mai bune burse pentru studenții internaționali în UK, cum să aplici și sfaturi pentru o aplicație de succes.",
    author: "Elena Dumitru",
    image: "/images/articles/article3.jpg",
    createdAt: "2024-04-28T11:30:00Z",
    tags: ["Scholarships", "International"],
  },
];




const BlogPost = () => {
  const { t } = useI18n();
  const { language } = useI18n();
  const [, params] = useRoute("/blog/:id");
  const id = params?.id || "";
  
  // const { data: post, isLoading } = useQuery({
  //   queryKey: [`/api/blog/${slug}`],
  //   enabled: !!slug,
  // });
  const { data: post, isLoading } = useQuery({
  queryKey: [`/api/blog/${id}`],
  enabled: !!id,
  queryFn: () =>
    Promise.resolve(MOCK_BLOG_POSTS.find((p) => String(p.id) === id)),
});

  
  if (!id) {
    return <div>Invalid blog post</div>;
  }

  if (!post && !isLoading) {
  return <div>Blog post not found</div>;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Page Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Button
                asChild
                variant="ghost"
                className="mb-8 flex items-center text-gray-600 hover:text-primary"
              >
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("blog.title")}
                </Link>
              </Button>
              
              {isLoading ? (
                <BlogPostSkeleton />
              ) : (
                <>
                  <h1 className="text-4xl font-bold mb-6">
                    {language === "en" ? post.title : post.titleRo}
                  </h1>
                  
                  <div className="flex flex-wrap gap-4 text-gray-600 mb-8">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{format(new Date(post.createdAt), "MMMM d, yyyy")}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <img
                      src={post.image}
                      alt={language === "en" ? post.title : post.titleRo}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  
                  <div className="prose prose-lg max-w-none">
                    <p>{language === "en" ? post.content : post.contentRo}</p>
                    
                    {/* The real content would be much longer and formatted with HTML */}
                    <p className="mt-6">
                      Studying abroad is a life-changing experience that offers numerous benefits 
                      beyond just academic qualifications. It exposes students to new cultures, 
                      perspectives, and ways of thinking. It helps develop independence, adaptability, 
                      and problem-solving skills that are highly valued in today's global job market.
                    </p>
                    
                    <p className="mt-6">
                      The UK, with its world-renowned education system and diverse cultural landscape, 
                      is an excellent destination for international students. The country is home to 
                      some of the world's oldest and most prestigious universities, offering high-quality 
                      education across a wide range of disciplines.
                    </p>
                    
                    <p className="mt-6">
                      However, navigating the application process can be challenging, especially for 
                      international students. That's where professional guidance from experienced 
                      advisors becomes invaluable. They can help you choose the right university and 
                      program, prepare compelling application materials, and navigate the visa process.
                    </p>
                  </div>
                  
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-10">
                      <div className="flex items-center text-gray-600 mb-3">
                        <Tag className="mr-2 h-4 w-4" />
                        <span>Tags:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>
        
        {/* Related Articles Section (would be implemented with real data in production) */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold mb-2">Top UK Universities for International Students</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Discover the best UK universities for international students based on rankings, 
                    student satisfaction, and graduate outcomes.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/blog/1">
                      {t("blog.readMore")}
                    </Link>
                  </Button>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="font-semibold mb-2">Guide to UK Student Visas in 2023</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Everything you need to know about applying for a UK student visa, including 
                    requirements, costs, and processing times.
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/blog/2">
                      {t("blog.readMore")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default BlogPost;
