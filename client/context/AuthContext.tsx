import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { authAPI, getToken, clearTokens } from "@/services/api";
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

  const logout = async () => {
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
