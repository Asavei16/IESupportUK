import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

// Exemplu de date mock pentru blog
const MOCK_BLOG_POSTS = [
  {
    id: 1,
    slug: "how-to-apply-to-uk-universities",
    title: "How to Apply to UK Universities",
    titleRo: "Cum să aplici la universități din UK",
    content: "Applying to UK universities can seem daunting, but with the right preparation, you can succeed. In this article, we'll guide you through the UCAS process, personal statements, and interviews.",
    contentRo: "Aplicarea la universitățile din UK poate părea dificilă, dar cu pregătirea potrivită poți reuși. În acest articol vei afla despre procesul UCAS, scrierea personal statement-ului și interviuri.",
    author: "Ana Popescu",
    image: "/images/articles/article1.jpg",
    createdAt: "2024-05-20",
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

const BlogSkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow">
    <Skeleton className="w-full h-48" />
    <div className="p-6">
      <Skeleton className="h-4 w-1/4 mb-2" />
      <Skeleton className="h-6 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3" />
      <div className="mt-4">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  </div>
);

const Blog = () => {
  const { t, language } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");

  // Folosim datele mock direct, fără useQuery
  const blogPosts = MOCK_BLOG_POSTS;

  // Filtrare după search
  const filteredPosts = blogPosts.filter((post) => {
    const title = post.title.toLowerCase();
    const titleRo = post.titleRo.toLowerCase();
    const content = post.content.toLowerCase();
    const contentRo = post.contentRo.toLowerCase();
    const author = post.author.toLowerCase();
    const query = searchQuery.toLowerCase();

    return (
      title.includes(query) ||
      titleRo.includes(query) ||
      content.includes(query) ||
      contentRo.includes(query) ||
      author.includes(query)
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">{t("blog.title")}</h1>
            <p className="text-gray-600 mt-2">{t("blog.subtitle")}</p>
          </div>
        </div>

        {/* Blog List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.length === 0
                ? <div className="col-span-full text-center py-12">
                    <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                    <p className="text-gray-600">
                      Try adjusting your search query to find what you're looking for.
                    </p>
                  </div>
                : filteredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} language={language} />
                  ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Blog;
