
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

const Footer = () => {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
  };

  return (
    <footer className="bg-[#f0b50a] dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/23d89839-23e5-4a91-9d1e-ab2a8bb6a03e.png"
                alt="Apuntea Logo"
                className="h-8 mr-2"
              />
            </Link>
          </div>

          {/* Footer Links - Right aligned */}
          <div className="flex flex-wrap gap-6 justify-end">
            <Link to="/about">
              <Button variant="link" className="p-0 h-auto">{t.aboutApuntea}</Button>
            </Link>
            <Link to="/services">
              <Button variant="link" className="p-0 h-auto">{t.whatWeOffer}</Button>
            </Link>
            <Link to="/blog">
              <Button variant="link" className="p-0 h-auto">{t.blog}</Button>
            </Link>
            <Link to="/contact">
              <Button variant="link" className="p-0 h-auto">{t.contactUs}</Button>
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-gray-600/20 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[140px] rounded-sm">
                  <SelectValue placeholder={t.selectLanguage} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">ENGLISH</SelectItem>
                  <SelectItem value="es">ESPAÑOL</SelectItem>
                  <SelectItem value="tr">TÜRKÇE</SelectItem>
                </SelectContent>
              </Select>
              
              <Link to="/privacy">
                <Button variant="link" className="text-sm">{t.privacyStatement}</Button>
              </Link>
              <Link to="/terms">
                <Button variant="link" className="text-sm">{t.termsConditions}</Button>
              </Link>
              <Link to="/cookies">
                <Button variant="link" className="text-sm">{t.cookiePolicy}</Button>
              </Link>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Apuntea. {t.allRightsReserved}
            </div>
          </div>
        </div>
      </div>
      
      {/* Purple bar in dark mode */}
      <div className="hidden dark:block bg-apuntea-purple py-1"></div>
    </footer>
  );
};

export default Footer;
