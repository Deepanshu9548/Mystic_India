
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useScrollToTop } from "./hooks/useScrollToTop";
import Index from "./pages/Index";
import StateDetail from "./pages/StateDetail";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import AllStates from "./pages/AllStates";
import Cuisine from "./pages/Cuisine";
import Culture from "./pages/Culture";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import AccountSettings from "./pages/AccountSettings";
import JourneyDetail from "./pages/JourneyDetail";
import JourneyPlanner from "./pages/JourneyPlanner";
import { useEffect } from "react";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { ChatbotProvider } from "@/components/chatbot/ChatbotProvider";

// ScrollToTop component to ensure each page starts at the top
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const queryClient = new QueryClient();

const App = () => {
  // Set document title
  useEffect(() => {
    document.title = "Mystic India - Journey Through India's Rich Heritage";
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <ChatbotProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/states" element={<AllStates />} />
                  <Route path="/state/:stateId" element={<StateDetail />} />
                  <Route path="/cuisine" element={<Cuisine />} />
                  <Route path="/culture" element={<Culture />} />
                  <Route path="/journey/:journeyId" element={<JourneyDetail />} />
                  <Route path="/journey-planner" element={<JourneyPlanner />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/account-settings" element={<AccountSettings />} />
                  <Route path="/admin" element={<Admin />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </ChatbotProvider>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
