
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <div className="container mx-auto py-16 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-apuntea-purple mb-4">404</h1>
        <p className="text-2xl mb-8">Page Not Found</p>
        
        <p className="text-center mb-8 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/" className="btn-primary py-2 px-6 rounded-sm">
          Return to Dashboard
        </Link>
      </div>
    </Layout>
  );
};

export default NotFound;
