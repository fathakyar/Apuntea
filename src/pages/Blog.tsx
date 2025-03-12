
import React from "react";
import Layout from "@/components/Layout";

const Blog = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-apuntea-purple flex items-center gap-2">
          <div className="h-8 w-1 bg-apuntea-gold rounded-sm"></div>
          Blog
        </h1>
        
        <div className="glass-card p-6 mb-6">
          <h2 className="text-xl font-bold mb-2 text-apuntea-purple">
            Latest Updates in Invoice Management Technology
          </h2>
          <p className="text-sm text-muted-foreground mb-4">Published: June 15, 2023</p>
          <p>
            Discover how AI and machine learning are transforming the way businesses handle their
            invoicing processes and financial records management.
          </p>
          <button className="mt-4 text-apuntea-purple font-bold">Read More →</button>
        </div>
        
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-2 text-apuntea-purple">
            Tax Season Tips for Small Business Owners
          </h2>
          <p className="text-sm text-muted-foreground mb-4">Published: March 22, 2023</p>
          <p>
            Essential advice for navigating tax season efficiently, including organization strategies,
            deduction opportunities, and preparation checklists.
          </p>
          <button className="mt-4 text-apuntea-purple font-bold">Read More →</button>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
