import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import React from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Product from "./pages/Product";
import Creators from "./pages/Creators"; 
import SignIn from "./pages/SignIn";
import BannerPage from "./pages/Banner"; // added
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ErrorProvider } from "./context/ErrorContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import HomeComponent from "./pages/HomeComponent";
import UserProfile from "./pages/UserProfile";
import UploadImage from "./pages/UploadImage";
import ProfileUpdatePage from "./pages/ProfileUpdatePage";
import { authAPI } from "./services/api";

const queryClient = new QueryClient();

// Suppress Facebook SDK errors (we use backend OAuth, not frontend SDK)
if (typeof window !== 'undefined') {
  const originalError = window.console.error;
  window.console.error = (...args: any[]) => {
    const errorMessage = args[0]?.toString() || '';
    // Suppress Facebook SDK importScripts errors
    if (errorMessage.includes('importScripts') && errorMessage.includes('fbcdn.net')) {
      return; // Silently ignore
    }
    originalError.apply(console, args);
  };
}

// OAuth Callback Handler Component
function OAuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { handleOAuthCallback } = useAuth();

  useEffect(() => {
    // Get token and params from hash route (HashRouter)
    const token = searchParams.get("token") || searchParams.get("access_token");
    const provider = searchParams.get("provider") || "google"; // Default to google
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    if (error) {
      console.error("OAuth error:", error, errorDescription);
      navigate(`/?error=oauth_failed&message=${encodeURIComponent(errorDescription || error)}`);
      return;
    }

    if (token) {
      console.log("OAuth callback received token, provider:", provider);
      
      // Exchange token for JWT tokens based on provider
      const exchangePromise = provider === "facebook" 
        ? authAPI.exchangeFacebookToken(token)
        : authAPI.exchangeGoogleToken(token);

      exchangePromise.then((response) => {
        console.log("Token exchange response:", response);
        
        if (response.success && response.data) {
          const userData = {
            userId: response.data.userId || response.data.user_id,
            email: response.data.email || "",
            firstName: response.data.firstName || response.data.first_name || "",
            lastName: response.data.lastName || response.data.last_name || "",
            profileImage: response.data.profileImage || response.data.profile_image || "",
          };
          
          const jwtToken = response.data.token || response.data.access_token;
          const refreshToken = response.data.refreshToken || response.data.refresh_token;
          
          if (jwtToken && refreshToken) {
            console.log("Setting tokens and user data");
            handleOAuthCallback(jwtToken, refreshToken, userData);
            navigate("/profile");
          } else {
            console.error("Missing tokens in response:", response.data);
            navigate(`/?error=oauth_failed&message=${encodeURIComponent("Missing tokens in response")}`);
          }
        } else {
          console.error("Token exchange failed:", response.error || response);
          navigate(`/?error=oauth_failed&message=${encodeURIComponent(response.error?.message || response.message || "Token exchange failed")}`);
        }
      }).catch((err) => {
        console.error("Token exchange error:", err);
        navigate(`/?error=oauth_failed&message=${encodeURIComponent(err instanceof Error ? err.message : "Unknown error")}`);
      });
    } else {
      console.error("No token received from backend. URL params:", Object.fromEntries(searchParams));
      navigate("/?error=oauth_failed&message=No token received from backend");
    }
  }, [searchParams, navigate, handleOAuthCallback]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-gray-600">Processing Google sign-in...</p>
      </div>
    </div>
  );
}

// Component to handle OAuth redirects from backend (non-hash URLs)
function OAuthRedirectHandler({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check if we're on a backend OAuth callback URL (e.g., /api/v1/auth/callback)
    const pathname = window.location.pathname;
    const search = window.location.search;
    
    if (pathname.includes('/auth/callback') || pathname.includes('/api/v1/auth/callback')) {
      const urlParams = new URLSearchParams(search);
      const token = urlParams.get("token") || urlParams.get("access_token");
      const provider = urlParams.get("provider") || "google";
      const error = urlParams.get("error");
      const errorDescription = urlParams.get("error_description");
      
      // Build hash route with params
      const hashParams = new URLSearchParams();
      if (token) hashParams.set("token", token);
      if (provider) hashParams.set("provider", provider);
      if (error) hashParams.set("error", error);
      if (errorDescription) hashParams.set("error_description", errorDescription);
      
      const hashRoute = `/#/auth/callback${hashParams.toString() ? '?' + hashParams.toString() : ''}`;
      window.location.replace(hashRoute);
    }
  }, []);
  
  return <>{children}</>;
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ErrorProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <OAuthRedirectHandler>
              <HashRouter>
                <ErrorBoundary>
                  <Routes>
                    <Route path="/" element={<HomeComponent />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/creators" element={<Creators />} />
                    <Route path="/banner" element={<BannerPage />} /> 
                    <Route path="/home" element={<HomeComponent />} />
                    <Route path="/auth/callback" element={<OAuthCallback />} />
                    <Route path="/profile" element={<UserProfile />} />
                    <Route path="/profile/:profileId" element={<UserProfile />} /> 
                    <Route path="/upload" element={<UploadImage />} />
                    <Route path="/profile/update" element={<ProfileUpdatePage />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ErrorBoundary>
              </HashRouter>
            </OAuthRedirectHandler>
          </TooltipProvider>
        </AuthProvider>
      </ErrorProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

createRoot(document.getElementById("root")!).render(<App />);
