
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
                  <Route index element={<Dashboard />} />
                  <Route path="upload" element={<InvoiceUpload />} />
                  <Route path="records" element={<Records />} />
                  <Route path="invoice/:id" element={<InvoiceEdit />} />
                  <Route path="definitions" element={<Definitions />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="bi" element={<BusinessIntelligence />} />
                  <Route path="agenda" element={<Agenda />} />
                  <Route path="about" element={<About />} />
                  <Route path="services" element={<Services />} />
                  <Route path="blog" element={<Blog />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="privacy" element={<Privacy />} />
                  <Route path="terms" element={<Terms />} />
                  <Route path="cookies" element={<Cookies />} />
                </Route>
                <Route path="/login" element={<Login />} />
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
