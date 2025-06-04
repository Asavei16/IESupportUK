import { Button } from "@/components/ui/button";
import { useI18n, type Language } from "@/lib/i18n";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useI18n();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ro" : "en");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="text-sm font-medium bg-transparent hover:bg-gray-100"
    >
      {language === "en" ? "RO" : "EN"}
    </Button>
  );
};

export default LanguageSwitcher;
