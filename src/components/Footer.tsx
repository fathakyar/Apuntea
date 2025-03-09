
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";

const Footer = () => {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem("apuntea_language", value);
  };

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/4d2af4ce-8457-4acd-8aa3-6758e383a21f.png"
                alt="Apuntea Logo"
                className="h-8 mr-2"
              />
              <span className="font-bold text-xl text-apuntea-purple uppercase">
                Apuntea
              </span>
            </Link>
          </div>

          {/* Footer Links */}
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
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[140px] rounded-sm">
                  <SelectValue placeholder={t.selectLanguage} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">ENGLISH</SelectItem>
                  <SelectItem value="es">ESPAÑOL</SelectItem>
                  <SelectItem value="de">DEUTSCH</SelectItem>
                  <SelectItem value="fr">FRANÇAIS</SelectItem>
                  <SelectItem value="it">ITALIANO</SelectItem>
                  <SelectItem value="pt">PORTUGUÊS</SelectItem>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="zh">中文</SelectItem>
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
