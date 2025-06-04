import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useI18n();
  const [location] = useLocation();

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    // { href: "/universities", label: t("nav.universities") },
    { href: "/courses", label: t("nav.universities") },
    { href: "/testimonials", label: t("nav.testimonials") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="w-12 h-12 mr-2 rounded-full bg-[#f2a93b] flex items-center justify-center text-white font-bold">
            <img
              src="/images/logo.jpeg"  // pune aici calea către logo-ul tău
              alt="IE Support UK Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl">IE Support UK</span>
            <span className="text-xs text-gray-500">Your educational partner</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                location === link.href
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <Button asChild className="ml-4 bg-primary hover:bg-primary/90">
            <Link href="/apply">{t("nav.apply")}</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`py-2 text-base font-medium transition-colors ${
                  location === link.href
                    ? "text-primary"
                    : "text-gray-600 hover:text-primary"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="mt-4 bg-primary hover:bg-primary/90"
              onClick={() => setIsMenuOpen(false)}
            >
              <Link href="/apply">{t("nav.apply")}</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
