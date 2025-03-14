
import React from "react";

interface MainContentProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <main className="flex-1 w-full flex flex-col">
      <div className="container mx-auto px-4 py-4 md:px-6 md:py-6 flex-grow">
        {children}
      </div>
    </main>
  );
};

export default MainContent;
