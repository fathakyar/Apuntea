
import React from "react";

const BackgroundDecorations: React.FC = () => {
  return (
    <>
      {/* Wave background decorations */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-5">
        <div className="absolute top-0 left-0 w-full h-80 bg-wave-pattern animate-wave"></div>
        <div className="absolute bottom-0 left-0 w-full h-80 bg-wave-pattern animate-wave"></div>
      </div>

      {/* Gradient decorations */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-gold rounded-full opacity-20 blur-3xl -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-purple rounded-full opacity-10 blur-3xl -z-10 transform -translate-x-1/2 translate-y-1/2"></div>
    </>
  );
};

export default BackgroundDecorations;
