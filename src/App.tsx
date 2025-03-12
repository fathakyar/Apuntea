
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import { DefinitionsProvider } from "./contexts/DefinitionsContext";
import { Toaster } from "./components/ui/toaster";
import { LanguageProvider } from "./contexts/LanguageContext";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import InvoiceUpload from "./pages/InvoiceUpload";
import Records from "./pages/Records";
import InvoiceEdit from "./pages/InvoiceEdit";
import Definitions from "./pages/Definitions";
import Settings from "./pages/Settings";
import BusinessIntelligence from "./pages/BusinessIntelligence";
import Agenda from "./pages/Agenda";
import About from "./pages/About";
import Services from "./pages/Services";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Cookies from "./pages/Cookies";
import NewRecord from "./pages/NewRecord";
import SignUp from "./pages/SignUp";

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <DefinitionsProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />}>
                  {/* Redirect root to agenda */}
                  <Route index element={<Navigate to="/agenda" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="upload" element={<InvoiceUpload />} />
                  <Route path="new-record" element={<NewRecord />} />
                  <Route path="records" element={<Records />} />
                  <Route path="edit/:id" element={<InvoiceEdit />} />
                  <Route path="definitions" element={<Definitions />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="bi" element={<BusinessIntelligence />} />
                  <Route path="agenda" element={<Agenda />} />
                </Route>
                
                {/* Routes that should appear without the Layout */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                
                {/* Public pages that should have their own layout */}
                <Route path="about" element={<About />} />
                <Route path="services" element={<Services />} />
                <Route path="blog" element={<Blog />} />
                <Route path="contact" element={<Contact />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="terms" element={<Terms />} />
                <Route path="cookies" element={<Cookies />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
            <Toaster />
          </DefinitionsProvider>
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
