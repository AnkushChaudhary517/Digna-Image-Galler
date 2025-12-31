import { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { authAPI, getToken, clearTokens, setTokens } from "@/services/api";
import { useNavigate } from "react-router-dom";

interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  handleOAuthCallback: (token: string, refreshToken: string, userData: User) => void;
  logout: () => Promise<void>;
  clearError: () => void;
}
//const navigate = useNavigate();
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    const token = getToken();
    if (token) {
      // In a real app, you would validate the token with the server
      // For now, we'll just check if token exists
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (err) {
          clearTokens();
        }
      }
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authAPI.logout();
      setUser(null);
      localStorage.removeItem("user");
      clearTokens();
      //navigate('/home')
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Session timeout: 1 hour (3600000 milliseconds)
  useEffect(() => {
    if (!user) return; // Only track activity when user is logged in

    let timeoutId: NodeJS.Timeout;
    let lastResetTime = Date.now();
    const SESSION_TIMEOUT = 60 * 60 * 1000; // 1 hour in milliseconds
    const THROTTLE_INTERVAL = 30000; // Throttle to reset at most every 30 seconds (30000ms)

    const resetTimeout = () => {
      const now = Date.now();
      // Throttle: only reset if at least 30 seconds have passed since last reset
      // This prevents excessive timeout resets while still being responsive
      if (now - lastResetTime < THROTTLE_INTERVAL) {
        return;
      }
      lastResetTime = now;

      // Clear existing timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Set new timeout
      timeoutId = setTimeout(() => {
        console.log("Session timeout: User inactive for 1 hour, logging out...");
        logout();
      }, SESSION_TIMEOUT);
    };

    // Activity events to track
    // Note: mousemove is throttled by resetTimeout, other events reset immediately if throttling allows
    const activityEvents = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click',
      'keydown'
    ];

    // Add event listeners for user activity
    activityEvents.forEach(event => {
      window.addEventListener(event, resetTimeout, { passive: true });
    });

    // Initialize timeout on mount
    resetTimeout();

    // Cleanup
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      activityEvents.forEach(event => {
        window.removeEventListener(event, resetTimeout);
      });
    };
  }, [user, logout]); // Re-run when user changes

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authAPI.login(email, password);
      if (response.success) {
        const userData: User = {
          userId: response.data.userId,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          profileImage: response.data.profileImage,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      } else {
        setError(response.error?.message || "Login failed");
        return false;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const response : any = await authAPI.register(name, email, password);
      if (response.success) {
        localStorage.setItem("userEmail", email);
        return true;
      } else {
        setError(response.error?.message || "Registration failed");
        return false;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OAuth callback - called when backend redirects back with tokens
  const handleOAuthCallback = (token: string, refreshToken: string, userData: User) => {
    console.log("handleOAuthCallback called with:", { token: token?.substring(0, 20) + "...", refreshToken: refreshToken?.substring(0, 20) + "...", userData });
    
    // Set tokens
    setTokens(token, refreshToken);
    
    // Set user data
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    
    console.log("OAuth callback completed - user authenticated");
  };


  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        error,
        login,
        register,
        handleOAuthCallback,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
