
import React from "react";
import Layout from "@/components/Layout";

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-apuntea-purple flex items-center gap-2">
          <div className="h-8 w-1 bg-apuntea-gold rounded-sm"></div>
          Terms and Conditions
        </h1>
        
        <div className="glass-card p-6">
          <p className="mb-4">
            Welcome to Apuntea. By using our service, you agree to these terms and conditions.
            Please read them carefully.
          </p>
          
          <h2 className="text-xl font-bold mt-6 mb-3 text-apuntea-purple">Use of Services</h2>
          <p className="mb-4">
            Apuntea provides invoice management and financial tracking services. You agree to use
            these services only for legal purposes and in compliance with all applicable laws.
          </p>
          
          <h2 className="text-xl font-bold mt-6 mb-3 text-apuntea-purple">Account Responsibilities</h2>
          <p className="mb-4">
            You are responsible for maintaining the confidentiality of your account credentials
            and for all activities that occur under your account.
          </p>
          
          <h2 className="text-xl font-bold mt-6 mb-3 text-apuntea-purple">Intellectual Property</h2>
          <p>
            All content and features of Apuntea, including text, graphics, logos, and software,
            are the property of Apuntea or its licensors and are protected by copyright and other
            intellectual property laws.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
