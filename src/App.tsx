
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import InvoiceUpload from "@/pages/InvoiceUpload";
import InvoiceEdit from "@/pages/InvoiceEdit";
import Records from "@/pages/Records";
import NotFound from "@/pages/NotFound";
import BusinessIntelligence from "@/pages/BusinessIntelligence";
import Agenda from "@/pages/Agenda";

// Initialize the query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/upload" element={<InvoiceUpload />} />
            <Route path="/records" element={<Records />} />
            <Route path="/edit/:id" element={<InvoiceEdit />} />
            <Route path="/bi" element={<BusinessIntelligence />} />
            <Route path="/agenda" element={<Agenda />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
