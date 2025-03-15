
import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { translations } from "@/utils/translations";

const Footer: React.FC = () => {
  const t = translations.en;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#f0b50a] mt-auto">
      <div className="container mx-auto px-4 py-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-4">
          {/* Logo - Left on large screens, centered on small */}
          <div className="flex justify-center md:justify-start mb-4 md:mb-0">
            <img 
              src="/lovable-uploads/abaef638-5a47-4704-b310-ac2008ff656d.png" 
              alt="Apuntea Logo" 
              className="h-10"
            />
          </div>

          {/* Navigation Links - Right on large screens, centered on small */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
            <Link to="/about" className="hover:underline font-medium text-apuntea-purple">
              {t.aboutApuntea}
            </Link>
            <Link to="/services" className="hover:underline font-medium text-apuntea-purple">
              {t.whatWeOffer}
            </Link>
            <Link to="/blog" className="hover:underline font-medium text-apuntea-purple">
              {t.blog}
            </Link>
            <Link to="/contact" className="hover:underline font-medium text-apuntea-purple">
              {t.contactUs}
            </Link>
          </nav>
        </div>

        {/* Separator Line */}
        <Separator className="bg-gray-600/20 dark:bg-gray-800 my-4" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-2">
          {/* Policy Links - Left on large screens, centered on small */}
          <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-3 md:mb-0 text-sm">
            <Link to="/privacy" className="hover:underline text-apuntea-purple">
              {t.privacyStatement}
            </Link>
            <Link to="/terms" className="hover:underline text-apuntea-purple">
              {t.termsConditions}
            </Link>
            <Link to="/cookies" className="hover:underline text-apuntea-purple">
              {t.cookiePolicy}
            </Link>
          </div>

          {/* Copyright Text - Right on large screens, centered on small */}
          <div className="text-sm text-center md:text-right">
            &copy; {currentYear} Apuntea. {t.allRightsReserved}.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
