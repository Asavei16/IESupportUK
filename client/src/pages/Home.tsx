import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Testimonials from "@/components/Testimonials";
import UniversityCard from "@/components/UniversityCard";
import BlogCard from "@/components/BlogCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, BookOpen, GraduationCap, Award } from "lucide-react";

const Home = () => {
  const { t } = useI18n();
  
  // // Fetch top universities
  // const { data: universities, isLoading: loadingUniversities } = useQuery({
  //   queryKey: ["/api/universities"],
  // });
  
  // // Fetch latest blog posts
  // const { data: blogPosts, isLoading: loadingBlogPosts } = useQuery({
  //   queryKey: ["/api/blog"],
  // });

  const { data: universities, isLoading: loadingUniversities } = useQuery({
    queryKey: ["/api/courses"],
    queryFn: () => Promise.resolve([
      {
        id: 1,
        name: "BSc (Hons) Health and Social Care with Foundation Year",
        location: "London, Birmingham, Bradford, Leicester",
        ranking: 1,
        image: "/images/universities/oxford.jpg",
        description: "Duration: 4 Years",
        tuition: "9250/year"
      },
      {
        id: 2,
        name: "BA (Hons) Business Management and Sustainability",
        location: "London, Birmingham, Bradford, Leicester",
        ranking: 6,
        image: "/images/universities/imperial.jpg",
        description: "Duration: 4 Years",
        tuition: "9250/year"
      },
      {
        id: 3,
        name: "BSc (Hons) Health, Wellbeing and Social Care with Foundation Year",
        location: "London, Birmingham, Bradford, Leicester",
        ranking: 3,
        image: "/images/universities/cambridge.jpg",
        description: "Duration: 4 Years",
        tuition: "9250/year"
      },
      {
        id: 4,
        name: "BSc Digital Marketing with Foundation Year",
        location: "London, Birmingham, Bradford, Leicester",
        ranking: 9,
        image: "/images/universities/lse.jpg",
        description: "Duration: 4 Years",
        tuition: "9250/year"
      }
    ]),
  });

  const { data: blogPosts, isLoading: loadingBlogPosts } = useQuery({
    queryKey: ["/api/blog"],
    queryFn: () => Promise.resolve([
      {
        id: 1,
        title: "Guide to UK University Applications",
        excerpt: "Learn everything you need to know about applying to UK universities.",
        date: "2025-05-15",
        image: "/images/articles/article1.jpg"
      },
      {
        id: 2,
        title: "Student Life in London",
        excerpt: "Discover what it's like to study in one of the world's most vibrant cities.",
        date: "2025-05-10",
        image: "/images/articles/article2.jpg"
      },
      {
        id: 3,
        title: "UK Visa Requirements for Students",
        excerpt: "A comprehensive guide to the visa process for international students.",
        date: "2025-05-05",
        image: "/images/articles/article3.jpg"
      }
    ]),
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Why Choose Us */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t("about.title")}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t("about.description")}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Guidance</h3>
                <p className="text-gray-600">
                  Our advisors have extensive experience helping students get accepted into UK universities.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Personalized Approach</h3>
                <p className="text-gray-600">
                  We work with you one-on-one to find the right university and program for your specific goals.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 text-center">
                <div className="mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Proven Results</h3>
                <p className="text-gray-600">
                  Our students have been accepted to top-ranked universities across the UK.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Universities */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold">{t("universities.title")}</h2>
                <p className="text-gray-600 mt-2">{t("universities.subtitle")}</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/courses" className="flex items-center">
                  View All <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {!loadingUniversities && universities?.slice(0, 4).map((university) => (
                <UniversityCard key={university.id} university={university} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <Testimonials />
        
        {/* Latest Blog Posts */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold">{t("blog.title")}</h2>
                <p className="text-gray-600 mt-2">{t("blog.subtitle")}</p>
              </div>
              <Button asChild variant="outline">
                <Link href="/blog" className="flex items-center">
                  View All <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {!loadingBlogPosts && blogPosts?.slice(0, 3).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your UK Education Journey?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Our team is ready to help you navigate the application process and find the perfect program for your educational goals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
              >
                <Link href="/apply">Apply Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white text-primary hover:bg-gray-100"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
