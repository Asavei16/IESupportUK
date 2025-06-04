import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { useI18n } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Clock, PoundSterling, MapPin, ArrowLeft, Building, Award } from "lucide-react";

const UniversityDetailSkeleton = () => (
  <div className="space-y-8">
    <Skeleton className="h-10 w-3/4" />
    <Skeleton className="h-6 w-1/2" />
    <Skeleton className="h-64 w-full rounded-lg" />
    <div className="space-y-4">
      <Skeleton className="h-6 w-1/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
);

const ProgramCard = ({ program }) => (
  <Card className="h-full">
    <CardContent className="p-6">
      <h3 className="text-lg font-semibold mb-4">{program.name}</h3>
      <div className="space-y-3 text-gray-600">
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          <span>Duration: {program.duration}</span>
        </div>
        <div className="flex items-center">
          <PoundSterling className="h-4 w-4 mr-2" />
          <span>Tuition: {program.tuition}</span>
        </div>
      </div>
      <div className="mt-4">
        <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
          Apply for This Program
        </Button>
      </div>
    </CardContent>
  </Card>
);

const UniversityDetail = () => {
  const { t } = useI18n();
  const { language } = useI18n();
  const [, params] = useRoute("/courses/:id");
  const id = params?.id ? parseInt(params.id) : undefined;
  
  // const { data: university, isLoading } = useQuery({
  //   queryKey: [`/api/universities/${id}`],
  //   enabled: !!id,
  // });

  const { data: university, isLoading } = useQuery({
  queryKey: [`/api/courses/${id}`],
  enabled: !!id,
  queryFn: () => {
    // Datele statice pentru universități (trebuie să fie aceleași id-uri ca la lista principală)
    const UNIVERSITIES = [
      {
        id: 1,
        name: "University of Oxford",
        location: "Oxford, UK",
        ranking: 1,
        image: "/images/universities/oxford.jpg",
        description: "The University of Oxford is a collegiate research university in Oxford, England.",
        descriptionRo: "Universitatea Oxford este o universitate de cercetare colegială din Oxford, Anglia.",
        programs: [
          { name: "Computer Science BSc", duration: "3 years", tuition: "£36,000/year" },
          { name: "Law BA", duration: "3 years", tuition: "£35,000/year" },
        ]
      },
      {
        id: 2,
        name: "Imperial College London",
        location: "London, UK",
        ranking: 6,
        image: "/images/universities/imperial.jpg",
        description: "Imperial College London is a public research university in London.",
        descriptionRo: "Imperial College London este o universitate publică de cercetare din Londra.",
        programs: [
          { name: "Mechanical Engineering BEng", duration: "3 years", tuition: "£34,000/year" },
          { name: "Medicine MBBS", duration: "6 years", tuition: "£45,000/year" },
        ]
      },
      {
        id: 3,
        name: "University of Cambridge",
        location: "Cambridge, UK",
        ranking: 1,
        image: "/images/universities/cambridge.jpg",
        description: "The University of Cambridge is a collegiate public research university in Cambridge, United Kingdom.",
        descriptionRo: "Universitatea Cambridge este o universitate de cercetare colegială din Cambridge, Anglia.",
        programs: [
          { name: "Computer Science BSc", duration: "3 years", tuition: "£36,000/year" },
          { name: "Law BA", duration: "3 years", tuition: "£35,000/year" },
        ]
      },
      {
        id: 4,
        name: "London School of Economics",
        location: "London, UK",
        ranking: 6,
        image: "/images/universities/lse.jpg",
        description: "The London School of Economics and Political Science is a public research university located in London, England.",
        descriptionRo: "Școala de Economie și Științe Politice din Londra este o universitate publică de cercetare situată în Londra, Anglia.",
        programs: [
          { name: "Law", duration: "3 years", tuition: "£34,000/year" },
          { name: "Law BA", duration: "3 years", tuition: "£45,000/year" },
        ]
      },
    ];
    const found = UNIVERSITIES.find(u => u.id === id);
    if (!found) throw new Error("Courses not found");
    return Promise.resolve(found);
  }
});

  
  if (!id) {
    return <div>Invalid university ID</div>;
  }
  
  const description = university && (language === "en" ? university.description : university.descriptionRo);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Page Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <Button
                asChild
                variant="ghost"
                className="mb-8 flex items-center text-gray-600 hover:text-primary"
              >
                <Link href="/courses">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {t("universities.title")}
                </Link>
              </Button>
              
              {isLoading ? (
                <UniversityDetailSkeleton />
              ) : (
                <>
                  <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">{university.name}</h1>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-1" />
                      <span>{university.location}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    <div className="lg:col-span-2">
                      <img
                        src={university.image}
                        alt={university.name}
                        className="w-full h-auto rounded-lg mb-6"
                      />
                      
                      <div className="prose max-w-none">
                        <p>{description}</p>
                      </div>
                    </div>
                    
                    <div>
                      <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <h3 className="text-lg font-semibold mb-4">University Information</h3>
                        <div className="space-y-4">
                          {university.ranking && (
                            <div className="flex items-start">
                              <div className="mt-1">
                                <Award className="h-5 w-5 text-primary mr-3" />
                              </div>
                              <div>
                                <p className="font-medium">UK Ranking</p>
                                <p className="text-gray-600">#{university.ranking}</p>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-start">
                            <div className="mt-1">
                              <Building className="h-5 w-5 text-primary mr-3" />
                            </div>
                            <div>
                              <p className="font-medium">Campus</p>
                              <p className="text-gray-600">Multiple locations in {university.location}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="mt-1">
                              <GraduationCap className="h-5 w-5 text-primary mr-3" />
                            </div>
                            <div>
                              <p className="font-medium">Programs Offered</p>
                              <p className="text-gray-600">{university.programs.length} programs</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <Button asChild className="w-full bg-primary hover:bg-primary/90">
                        <Link href="/contact">Contact an Advisor</Link>
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Available Programs</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {university.programs.map((program, index) => (
                        <ProgramCard key={index} program={program} />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Apply?</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Our team will guide you through the application process and help you secure your place at this university.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-gray-100"
              >
                <Link href="/apply">Start Application</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/contact">Ask a Question</Link>
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

export default UniversityDetail;
