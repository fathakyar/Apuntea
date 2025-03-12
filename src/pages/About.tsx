
import React from "react";
import Layout from "@/components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-apuntea-purple flex items-center gap-2">
          <div className="h-8 w-1 bg-apuntea-gold rounded-sm"></div>
          About Apuntea
        </h1>
        
        <div className="glass-card p-6">
          <p className="mb-4">
            Apuntea is an intelligent invoice management platform designed to help businesses
            streamline their accounting processes and gain better financial insights.
          </p>
          
          <p className="mb-4">
            Our mission is to simplify invoice tracking, expense management, and financial reporting
            through intuitive tools and intelligent automation.
          </p>
          
          <h2 className="text-xl font-bold mt-6 mb-3 text-apuntea-purple">Our Story</h2>
          <p>
            Founded in 2023, Apuntea was created by a team of accounting professionals and software
            engineers who recognized the need for a more efficient and user-friendly invoice management
            solution.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
