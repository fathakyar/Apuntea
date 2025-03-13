
import React from "react";

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <main className="flex-grow container mx-auto px-4 py-6 md:px-6 md:py-8 w-full">
      {children}
    </main>
  );
};

export default MainContent;
