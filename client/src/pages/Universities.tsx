import { useQuery } from "@tanstack/react-query";
import { useI18n } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UniversityCard from "@/components/UniversityCard";
import WhatsAppButton from "@/components/WhatsAppButton";
import { University } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const UniversitySkeleton = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow">
    <Skeleton className="w-full h-48" />
    <div className="p-6">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-4/5" />
      <div className="mt-4">
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  </div>
);

const Universities = () => {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  
  // const { data: universities, isLoading } = useQuery({
  //   queryKey: ["/api/universities"],
  // });
  const { data: universities, isLoading } = useQuery({
  queryKey: ["/api/courses"],
  queryFn: () => Promise.resolve([
      {
        id: 1,
        name: "BA (Hons) Business Management and Sustainability ",
        location: "London, Birmingham, Bradford, Leicester",
        ranking: 1,
        // image: "/images/universities/oxford.jpg",
        description: "Duration: 4 Years",
        tuition: "9250/year"
      },
      {
        id: 2,
        name: "BSc (Hons) Health and Social Care with Foundation Year",
        location: "London, Birmingham, Bradford, Leicester",
        ranking: 6,
        // image: "/images/universities/imperial.jpg",
        description: "Duration: 4 Years",
        tuition: "9250/year"
      },
      {
        id: 3,
        name: "BSc (Hons) Health, Wellbeing and Social Care with Foundation Year",
        location: "London, Birmingham, Manchester, Leeds",
        ranking: 3,
        // image: "/images/universities/cambridge.jpg",
        description: "Duration: 4 Years",
        tuition: "9250/year"
      },
      {
        id: 4,
        name: "BSc (Hons) Business and Tourism Management with Foundation Year",
        location: "London, Birmingham, Manchester, Leeds",
        ranking: 9,
        // image: "/images/universities/lse.jpg",
        description: "Duration: 4 Years",
        tuition: "9250/year"
      },
      {
        id: 5,
        name: "BA (Hons) Global Business (Business Management) with Foundation Year",
        location: "London, Birmingham, Manchester, Leeds",
        ranking: 1,
        // image: "/images/universities/oxford.jpg",
        description: "Duration: 4 Years",
        tuition: "9250/year"
      },
      {
        id: 6,
        name: "BSc Computing with Integrated Foundation Year",
        location: "London, Leeds, Leicester, Manchester, Birmingham, Northampton",
        ranking: 6,
        // image: "/images/universities/imperial.jpg",
        description: "Duration: 4 Years",
        tuition: "9250/year"
      },
      {
        id: 7,
        name: "BSc Accounting and Finance",
        location: "London, Leeds, Manchester, Birmingham, Northampton",
        ranking: 3,
        // image: "/images/universities/cambridge.jpg",
        description: "Duration: 4 Years",
        tuition: "9250/year"
      },
      {
        id: 8,
        name: "BSc Digital Marketing with Foundation Year",
        location: "London, Manchester",
        ranking: 9,
        // image: "/images/universities/lse.jpg",
        description: "Duration: 4 Years",
        tuition: "9250/year"
      },
      {
        id: 9,
        name: "BA Fashion Management and Marketing",
        location: "London",
        ranking: 1,
        // image: "/images/universities/oxford.jpg",
        description: "Duration: 4 Years",
        tuition: "9250/year"
      },
      {
        id: 10,
        name: "BSc (Hons) Construction Management with Foundation Year",
        location: "London, Leeds, Manchester, Birmingham",
        ranking: 6,
        // image: "/images/universities/imperial.jpg",
        description: "Duration: 4 Years",
        tuition: "9250/year"
      },
      {
        id: 11,
        name: "Software Engineering with Foundation Year",
        location: "London",
        ranking: 3,
        // image: "/images/universities/cambridge.jpg",
        description: "Duration: 4 Years",
        tuition: "9250/year"
      },
      {
        id: 12,
        name: "Law with Foundation Year",
        location: "London, Manchester, Leeds, birmingham",
        ranking: 9,
        // image: "/images/universities/lse.jpg",
        description: "Duration: 4 Years",
        tuition: "9250/year"
      },
      {
        id: 13,
        name: "Digital Marketing with Foundation Year",
        location: "London, Manchester, Leeds, Birmingham",
        ranking: 1,
        // image: "/images/universities/oxford.jpg",
        description: "Duration: 4 Years",
        tuition: "9250/year"
      },
      {
        id: 14,
        name: "Criminology",
        location: "London, Manchester, Leeds, Birmingham",
        ranking: 6,
        // image: "/images/universities/imperial.jpg",
        description: "Duration: 4 Years",
        tuition: "9250/year"
      },
      {
        id: 15,
        name: "Criminology and Psychology",
        location: "London, Manchester, Leeds, Birmingham",
        ranking: 3,
        // image: "/images/universities/cambridge.jpg",
        description: "Duration: 4 Years",
        tuition: "9250/year"
      },
    ])
  });
  
  // Filter universities based on search query
  const filteredUniversities = universities
    ? universities.filter((university: University) =>
        university.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        university.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold">{t("universities.title")}</h1>
            <p className="text-gray-600 mt-2">{t("universities.subtitle")}</p>
          </div>
        </div>
        
        {/* Universities List */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {/* Universities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isLoading
                ? [...Array(8)].map((_, i) => <UniversitySkeleton key={i} />)
                : filteredUniversities.map((university: University) => (
                    <UniversityCard key={university.id} university={university} />
                  ))}
              
              {!isLoading && filteredUniversities.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No courses found</h3>
                  <p className="text-gray-600">
                    Try adjusting your search query to find what you're looking for.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
        
        {/* Info Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Studying in the UK</h2>
              <div className="prose prose-lg">
                <p>
                  The United Kingdom is home to some of the world's most prestigious universities, offering high-quality education across a wide range of disciplines. With a rich academic tradition dating back centuries, UK universities consistently rank among the top globally.
                </p>
                <p>
                  Studying in the UK provides numerous benefits, including internationally recognized qualifications, exposure to diverse cultures, and opportunities to develop valuable language and professional skills. The UK education system encourages independent thinking, creativity, and research skills that are highly valued by employers worldwide.
                </p>
                <p>
                  At IE Support UK, we help you navigate the complex process of applying to UK universities. Our advisors provide personalized guidance to help you select the right university and program based on your academic background, career goals, and personal preferences.
                </p>
                <h3>Key Benefits of UK Education:</h3>
                <ul>
                  <li>World-class teaching and research facilities</li>
                  <li>Shorter and more intensive degree programs compared to many other countries</li>
                  <li>Strong focus on employability and career development</li>
                  <li>Rich cultural experience and diverse student community</li>
                  <li>Opportunities to work during and after studies</li>
                </ul>
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

export default Universities;
