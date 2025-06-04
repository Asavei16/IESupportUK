import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const HeroSection = () => {
  const { t } = useI18n();

  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-indigo-800 py-20 overflow-hidden">
      {/* Decorative elements */}
      {/* <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]"></div> */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-background.jpg')" }} ></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full max-w-7xl mx-auto">
          <div className="absolute -right-64 -top-64 opacity-20">
            <div className="w-96 h-96 rounded-full bg-primary blur-3xl"></div>
          </div>
          <div className="absolute -left-64 -bottom-64 opacity-20">
            <div className="w-96 h-96 rounded-full bg-primary blur-3xl"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t("hero.title")}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-2"
            >
              <Link href="/apply">{t("nav.apply")}</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white hover:bg-gray-100 text-primary font-semibold border-white px-8 py-2"
            >
              <Link href="/contact">{t("nav.contact")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
