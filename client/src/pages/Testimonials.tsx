
// export default TestimonialsPage;
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";

const testimonials = [
  {
    id: 1,
    name: "Maria Popescu",
    university: "University of Oxford",
    quote: "IE Support UK helped me navigate the complex application process for Oxford. Their advisors were always available to answer my questions and guide me through each step.",
    quoteRo: "IE Support UK m-a ajutat să navighez prin procesul complex de aplicare pentru Oxford. Consilierii lor au fost întotdeauna disponibili să răspundă la întrebările mele.",
    image: "/images/testimonials/maria.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Alexandru Ionescu",
    university: "Imperial College London",
    quote: "I couldn't have gotten into Imperial without IE Support UK's assistance. They provided personalized guidance and helped me prepare for interviews.",
    quoteRo: "Nu aș fi putut intra la Imperial fără asistența IE Support UK. Mi-au oferit îndrumare personalizată și m-au ajutat să mă pregătesc pentru interviuri.",
    image: "/images/testimonials/alexandru.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Elena Dumitrescu",
    university: "University of Cambridge",
    quote: "The team at IE Support UK was incredibly supportive throughout my Cambridge application. They have extensive knowledge of UK universities.",
    quoteRo: "Echipa de la IE Support UK a fost incredibil de suportivă pe tot parcursul aplicației mele la Cambridge. Au cunoștințe extinse despre universitățile din UK.",
    image: "/images/testimonials/elena.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Adelina Hoanos",
    university: "University of Oxford",
    quote: "I am so grateful for all the support I received from Elena during my university application process. She made everything so much easier by guiding me through every step and helping me stay on track. Thanks to her help, I got into the university I wanted, opening new doors into my future. Highly recommend her service, she really care and want me to succeed with my dreams.",
    quoteRo: "Sunt extrem de recunoscător pentru tot sprijinul primit de la Elena în timpul procesului de aplicare la universitate. Mi-a făcut totul mult mai ușor, ghidându-mă prin fiecare pas și ajutându-mă să rămân pe drumul cel bun. Datorită ajutorului ei, am intrat la universitatea pe care mi-o doream, deschizându-mi noi uși către viitor. Recomand cu căldură serviciile ei, îi pasă cu adevărat și își dorește ca eu să reușesc în atingerea viselor mele.",
    image: "/images/testimonials/adelina.jpg",
    rating: 5,
  },
  {
    id: 5,
    name: "Mariana Pop",
    university: "Imperial College London",
    quote: "Thank you from the bottom of my heart for all the help 💗 you're the best 💗 highly recommended!",
    quoteRo: "Mulțumesc din suflet pentru tot ajutorul 💗 Ești cea mai bună 💗 Recomand cu căldură!",
    image: "/images/testimonials/mariana.jpg",
    rating: 5,
  },
  {
    id: 6,
    name: "Alexandru Mancas",
    university: "University of Cambridge",
    quote: "The support was amazing, everything was explained clearly, and the process felt so much easier. Thank you so much - highly recommended!",
    quoteRo: "Sprijinul a fost extraordinar, totul a fost explicat clar, iar procesul a părut mult mai ușor. Mulțumesc foarte mult – îl recomand cu căldură!",
    image: "/images/testimonials/alex.jpg",
    rating: 5,
  },
];

const FeaturedTestimonial = ({ testimonial, onPrev, onNext }) => {
  const { language } = useI18n();
  const quote = language === "ro" ? testimonial.quoteRo : testimonial.quote;

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-lg overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white transform translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white transform -translate-x-24 translate-y-24"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white/20 mr-6"
          />
          <div>
            <h2 className="text-3xl font-bold">{testimonial.name}</h2>
            <p className="text-blue-100 text-lg">{testimonial.university}</p>
            <div className="flex mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < testimonial.rating ? "text-yellow-300 fill-yellow-300" : "text-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <blockquote className="text-xl leading-relaxed italic">"{quote}"</blockquote>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => {
  const { language } = useI18n();
  const quote = language === "ro" ? testimonial.quoteRo : testimonial.quote;

  return (
    <Card className="h-full border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-bold text-lg">{testimonial.name}</h3>
            <p className="text-gray-600">{testimonial.university}</p>
          </div>
        </div>
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-gray-700 leading-relaxed">"{quote}"</p>
      </CardContent>
    </Card>
  );
};

const TestimonialsPage = () => {
  const { t } = useI18n();
  const [featuredIndex, setFeaturedIndex] = useState(0);

  const handlePrevious = () => {
    setFeaturedIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setFeaturedIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Student Success Stories</h1>
            <p className="text-xl text-gray-600">Hear from our students who are now studying at top UK universities</p>
          </div>
        </div>

        {/* Featured Testimonial */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <FeaturedTestimonial
              testimonial={testimonials[featuredIndex]}
              onPrev={handlePrevious}
              onNext={handleNext}
            />
          </div>
        </section>

        {/* All Testimonials Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your UK Education Journey?</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Join hundreds of successful students who have achieved their dreams of studying at top UK universities with our help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3"
              >
                <Link href="/apply">Apply Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3"
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

export default TestimonialsPage;
