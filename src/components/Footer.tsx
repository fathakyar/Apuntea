
import React from "react";
import { Link } from "react-router-dom";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

const languages = [
  { code: "en", name: "ENGLISH" },
  { code: "es", name: "ESPAÑOL" },
  { code: "tr", name: "TÜRKÇE" },
  { code: "de", name: "DEUTSCH" },
  { code: "it", name: "ITALIANO" },
  { code: "pt", name: "PORTUGUÊS" },
  { code: "fr", name: "FRANÇAIS" },
  { code: "ar", name: "العربية" },
  { code: "zh", name: "中文" },
];

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-apuntea-purple/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center mb-4 md:mb-0">
            <img
              src="/lovable-uploads/4d2af4ce-8457-4acd-8aa3-6758e383a21f.png"
              alt="Apuntea Logo"
              className="h-8 mr-2"
            />
            <span className="font-bold text-xl text-apuntea-purple uppercase">Apuntea</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="#" className="text-white hover:text-apuntea-gold text-sm uppercase">
              About Apuntea
            </Link>
            <Link to="#" className="text-white hover:text-apuntea-gold text-sm uppercase">
              What We Offer
            </Link>
            <Link to="#" className="text-white hover:text-apuntea-gold text-sm uppercase">
              Blog
            </Link>
            <Link to="#" className="text-white hover:text-apuntea-gold text-sm uppercase">
              Contact Us
            </Link>
          </div>
        </div>
        
        <div className="border-t border-apuntea-purple/30 pt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-white hover:text-apuntea-gold">
                  <Globe className="h-4 w-4 mr-1" />
                  <span className="text-xs uppercase">Language</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-black/90 border-apuntea-purple/50 text-white">
                  {languages.map((lang) => (
                    <DropdownMenuItem 
                      key={lang.code}
                      className="text-white hover:text-apuntea-gold text-xs uppercase cursor-pointer"
                    >
                      {lang.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Link to="#" className="text-white hover:text-apuntea-gold text-xs uppercase">
                Privacy Statement
              </Link>
              <Link to="#" className="text-white hover:text-apuntea-gold text-xs uppercase">
                Terms & Conditions
              </Link>
              <Link to="#" className="text-white hover:text-apuntea-gold text-xs uppercase">
                Cookie Policy
              </Link>
            </div>
            
            <div className="text-xs text-white/60 uppercase">
              © {new Date().getFullYear()} Apuntea. All Rights Reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
