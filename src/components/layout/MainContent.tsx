
import React from "react";

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <main className="flex-1 w-full">
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        {children}
      </div>
    </main>
  );
};

export default MainContent;
