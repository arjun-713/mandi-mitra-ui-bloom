
import { useState, useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import LoginPage from "./pages/LoginPage";
import SurveyPage from "./pages/SurveyPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [user, setUser] = useState(null);
  const [showSurvey, setShowSurvey] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setUser(userData);
      setShowSurvey(userData.isNewUser || false);
    }
  }, []);

  const handleLogin = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setUser(userData);
      setShowSurvey(false);
    }
  };

  const handleSignup = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setUser(userData);
      setShowSurvey(true);
    }
  };

  const handleSurveyComplete = (surveyData: any) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const updatedUser = { 
      ...currentUser, 
      ...surveyData, 
      isNewUser: false,
      completedAt: new Date().toISOString()
    };
    
    // Update user in users array
    const users = JSON.parse(localStorage.getItem('mandiMitraUsers') || '[]');
    const userIndex = users.findIndex((u: any) => u.phoneNumber === currentUser.phoneNumber);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('mandiMitraUsers', JSON.stringify(users));
    }
    
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setShowSurvey(false);
  };

  if (!user) {
    return (
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <LoginPage onLogin={handleLogin} onSignup={handleSignup} />
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    );
  }

  if (showSurvey) {
    return (
      <LanguageProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <SurveyPage onComplete={handleSurveyComplete} />
          </TooltipProvider>
        </QueryClientProvider>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index user={user} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  );
};

export default App;
