import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  onSubmit?: (data: any) => void;
  onSignUpClick?: () => void;
  isLoading?: boolean;
}

export default function LoginForm({
  onSubmit,
  onSignUpClick,
  isLoading: externalIsLoading = false,
}: LoginFormProps) {
  const { login, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success && onSubmit) {
      navigate("/profile");
      onSubmit({ email: formData.email, password: formData.password });
      navigate("/profile");
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 overflow-y-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 text-center">Sign In</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email / Phone
          </label>
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="email"
              id="email"
              placeholder="Enter your email or phone"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              style={{color:"black"}}
              disabled={isLoading || externalIsLoading}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              style={{color:"black"}}
              disabled={isLoading || externalIsLoading}
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading || externalIsLoading}
              className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className="text-gray-600">Remember me</span>
          </label>
          <a href="#" className="text-primary hover:underline font-medium">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || externalIsLoading}
          style={{
            backgroundColor: "#2B21DA",
            color: "#FFFFFF",
            fontFamily: "Sora, system-ui, sans-serif",
            fontSize: "15px",
            lineHeight: "20px",
            fontWeight: 500,
          }}
          className="w-full py-3 rounded-xl font-medium transition-colors disabled:opacity-50 hover:bg-[#2319b5]"
        >
          {isLoading || externalIsLoading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">or sign in with</span>
        </div>
      </div>

      {/* Social Sign In */}
      <div className="space-y-3">
        <button
          type="button"
          style={{
            fontFamily: "Sora, system-ui, sans-serif",
            fontSize: "15px",
            lineHeight: "20px",
            fontWeight: 500,
          }}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none"
            className="flex-shrink-0"
            style={{ width: '20px', height: '20px' }}
          >
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </button>
        <button
          type="button"
          style={{
            fontFamily: "Sora, system-ui, sans-serif",
            fontSize: "15px",
            lineHeight: "20px",
            fontWeight: 500,
          }}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition-colors text-gray-700 font-medium"
        >
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none"
            className="flex-shrink-0"
            style={{ width: '20px', height: '20px' }}
          >
            <path 
              fill="#1877F2"
              d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" 
            />
          </svg>
          Sign in with Facebook
        </button>
      </div>

      {/* Sign Up Link */}
      <p className="text-center text-sm text-gray-600 mt-8">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onSignUpClick}
          className="text-primary hover:underline font-semibold"
        >
          Create one
        </button>
      </p>
    </div>
  );
}
