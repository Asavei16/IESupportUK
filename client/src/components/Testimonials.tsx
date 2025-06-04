// export default Testimonials;
import { useI18n } from "@/lib/i18n";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Maria Popescu",
    university: "University of Oxford",
    quote: "IE Support UK helped me navigate the complex application process for Oxford.",
    quoteRo: "IE Support UK m-a ajutat să navighez prin procesul complex de aplicare pentru Oxford.",
    image: "/images/testimonials/maria.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Alexandru Ionescu", 
    university: "Imperial College London",
    quote: "I couldn't have gotten into Imperial without IE Support UK's assistance.",
    quoteRo: "Nu aș fi putut intra la Imperial fără asistența IE Support UK.",
    image: "/images/testimonials/alexandru.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Elena Dumitrescu",
    university: "University of Cambridge", 
    quote: "The team at IE Support UK was incredibly supportive throughout my Cambridge application.",
    quoteRo: "Echipa de la IE Support UK a fost incredibil de suportivă pe tot parcursul aplicației mele.",
    image: "/images/testimonials/elena.jpg",
    rating: 5,
  },
];

const TestimonialCard = ({ testimonial }) => {
  const { language } = useI18n();
  const quote = language === "ro" ? testimonial.quoteRo : testimonial.quote;

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="font-semibold">{testimonial.name}</h3>
            <p className="text-sm text-gray-500">{testimonial.university}</p>
          </div>
        </div>
        <div className="flex mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <p className="text-gray-700">"{quote}"</p>
      </CardContent>
    </Card>
  );
};

const Testimonials = () => {
  const { t } = useI18n();

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t("testimonials.title")}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t("testimonials.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
