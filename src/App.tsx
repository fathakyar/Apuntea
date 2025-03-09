
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { DefinitionsProvider } from "@/contexts/DefinitionsContext";

// Pages
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import InvoiceUpload from "@/pages/InvoiceUpload";
import InvoiceEdit from "@/pages/InvoiceEdit";
import Records from "@/pages/Records";
import NotFound from "@/pages/NotFound";
import BusinessIntelligence from "@/pages/BusinessIntelligence";
import Agenda from "@/pages/Agenda";
import Definitions from "@/pages/Definitions";
import Settings from "@/pages/Settings";

// Initialize the query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <DefinitionsProvider>
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
              <Route path="/definitions" element={<Definitions />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DefinitionsProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
