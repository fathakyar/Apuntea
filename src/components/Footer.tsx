
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Footer = () => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("apuntea_language") || "tr";
  });

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem("apuntea_language", value);
  };

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo */}
          <div className="col-span-1">
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
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">ABOUT APUNTEA</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto">Our Story</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">Team</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">Careers</Button>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">WHAT WE OFFER</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto">Services</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">Pricing</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">Features</Button>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">BLOG</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto">News</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">Tips & Tricks</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">Case Studies</Button>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">CONTACT US</h3>
            <ul className="space-y-2">
              <li>
                <Button variant="link" className="p-0 h-auto">Support</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">Sales</Button>
              </li>
              <li>
                <Button variant="link" className="p-0 h-auto">Partnership</Button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[120px] rounded-sm">
                  <SelectValue placeholder="Dil Seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tr">Türkçe</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="link" className="text-sm">Privacy Statement</Button>
              <Button variant="link" className="text-sm">Terms & Conditions</Button>
              <Button variant="link" className="text-sm">Cookie Policy</Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Apuntea. All rights reserved.
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
