
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { translations } from "@/utils/translations";

const Footer = () => {
  const t = translations.en;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#f0b50a] dark:bg-black">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Logo */}
          <div className="flex justify-center md:justify-start">
            <Link to="/" className="flex items-center">
              <img
                src="/lovable-uploads/23d89839-23e5-4a91-9d1e-ab2a8bb6a03e.png"
                alt="Apuntea Logo"
                className="h-8"
              />
            </Link>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-end">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
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
            
            <div className="text-sm text-center md:text-right">
              © {currentYear} Apuntea. {t.allRightsReserved}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
