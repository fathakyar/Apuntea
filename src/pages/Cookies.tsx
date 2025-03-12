
import React from "react";
import Layout from "@/components/Layout";

const Cookies = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-apuntea-purple flex items-center gap-2">
          <div className="h-8 w-1 bg-apuntea-gold rounded-sm"></div>
          Cookie Policy
        </h1>
        
        <div className="glass-card p-6">
          <p className="mb-4">
            Apuntea uses cookies to enhance your experience on our website and services.
            This policy explains how we use cookies and how you can manage them.
          </p>
          
          <h2 className="text-xl font-bold mt-6 mb-3 text-apuntea-purple">What Are Cookies</h2>
          <p className="mb-4">
            Cookies are small text files that are placed on your device when you visit a website.
            They help us recognize your device and provide a number of features.
          </p>
          
          <h2 className="text-xl font-bold mt-6 mb-3 text-apuntea-purple">How We Use Cookies</h2>
          <p className="mb-4">
            We use cookies to remember your preferences, understand how you use our services,
            and improve your experience. Some cookies are necessary for the functionality of our website,
            while others help us analyze usage patterns and optimize our services.
          </p>
          
          <h2 className="text-xl font-bold mt-6 mb-3 text-apuntea-purple">Managing Cookies</h2>
          <p>
            You can control and manage cookies through your browser settings. Please note that
            disabling certain cookies may limit your ability to use some features of our services.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Cookies;
