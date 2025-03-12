
import React from "react";
import Layout from "@/components/Layout";

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-apuntea-purple flex items-center gap-2">
          <div className="h-8 w-1 bg-apuntea-gold rounded-sm"></div>
          Privacy Policy
        </h1>
        
        <div className="glass-card p-6">
          <p className="mb-4">
            At Apuntea, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, and protect your personal information.
          </p>
          
          <h2 className="text-xl font-bold mt-6 mb-3 text-apuntea-purple">Information We Collect</h2>
          <p className="mb-4">
            We collect information that you provide directly to us, such as when you create an account,
            upload invoices, or contact our support team. This may include your name, email address,
            company information, and financial data related to your invoices.
          </p>
          
          <h2 className="text-xl font-bold mt-6 mb-3 text-apuntea-purple">How We Use Your Information</h2>
          <p className="mb-4">
            We use your information to provide and improve our services, process your invoices,
            communicate with you, and ensure the security of your account.
          </p>
          
          <h2 className="text-xl font-bold mt-6 mb-3 text-apuntea-purple">Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information from
            unauthorized access, alteration, or disclosure.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
