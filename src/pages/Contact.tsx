
import React from "react";
import Layout from "@/components/Layout";

const Contact = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-apuntea-purple flex items-center gap-2">
          <div className="h-8 w-1 bg-apuntea-gold rounded-sm"></div>
          Contact Us
        </h1>
        
        <div className="glass-card p-6">
          <p className="mb-6">
            We're here to help! Please get in touch with our team for any questions, feedback,
            or support needs.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="form-label block">Name</label>
                  <input type="text" id="name" className="form-input w-full" />
                </div>
                
                <div>
                  <label htmlFor="email" className="form-label block">Email</label>
                  <input type="email" id="email" className="form-input w-full" />
                </div>
                
                <div>
                  <label htmlFor="message" className="form-label block">Message</label>
                  <textarea id="message" rows={4} className="form-input w-full"></textarea>
                </div>
                
                <button type="submit" className="btn-primary py-2 px-4 rounded-sm">
                  Send Message
                </button>
              </form>
            </div>
            
            <div>
              <h2 className="text-xl font-bold mb-4 text-apuntea-purple">Contact Information</h2>
              
              <div className="space-y-3">
                <p>
                  <strong>Email:</strong> support@apuntea.com
                </p>
                <p>
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
                <p>
                  <strong>Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST
                </p>
                <p>
                  <strong>Address:</strong> 123 Business Ave, Suite 400, New York, NY 10001
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
