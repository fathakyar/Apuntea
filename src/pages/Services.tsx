
import React from "react";
import Layout from "@/components/Layout";

const Services = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-apuntea-purple flex items-center gap-2">
          <div className="h-8 w-1 bg-apuntea-gold rounded-sm"></div>
          Our Services
        </h1>
        
        <div className="glass-card p-6">
          <p className="mb-6">
            Apuntea offers a comprehensive suite of invoice management and financial tracking services
            designed to meet the needs of businesses of all sizes.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold mb-3 text-apuntea-purple">Invoice Management</h2>
              <p>
                Automated invoice processing, OCR document scanning, and digital archiving to streamline
                your accounts payable and receivable processes.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-3 text-apuntea-purple">Expense Tracking</h2>
              <p>
                Comprehensive expense categorization, tax calculation, and reporting tools to keep
                your financial records organized and compliant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;
