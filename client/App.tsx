import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Creators from "./pages/Creators"; 
import SignIn from "./pages/SignIn";
import BannerPage from "./pages/Banner"; // added
import { AuthProvider } from "./context/AuthContext";
import HomeComponent from "./pages/HomeComponent";
import UserProfile from "./pages/UserProfile";
import UploadImage from "./pages/UploadImage";
import ProfileUpdatePage from "./pages/ProfileUpdatePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/product" element={<Product />} />
            <Route path="/creators" element={<Creators />} />
            <Route path="/banner" element={<BannerPage />} /> 
            <Route path="/home" element={<HomeComponent />} />
             <Route path="/profile" element={<UserProfile />} />
            <Route path="/profile/:profileId" element={<UserProfile />} /> 
             <Route path="/upload" element={<UploadImage />} />
             <Route path="/profile/update" element={<ProfileUpdatePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
