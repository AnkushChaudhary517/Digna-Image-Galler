import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface SignupFormProps {
  onSubmit?: (data: any) => void;
  onSignInClick?: () => void;
  isLoading?: boolean;
}

export default function SignupForm({
  onSubmit,
  onSignInClick,
  isLoading: externalIsLoading = false,
}: SignupFormProps) {
  const { register, isLoading, error } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register(formData.name, formData.email, formData.password);
    if (success) {
      localStorage.setItem("userEmail", formData.email);
      if (onSubmit) onSubmit({ name: formData.name, email: formData.email });
    }
  };

  return (
    <div
      className="w-full bg-white rounded-xl shadow-2xl flex flex-col"
      style={{
        maxHeight: "100vh",
        //overflowY: "auto", // allow smooth scroll only if absolutely needed
        padding: "1rem",
      }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        Sign Up
      </h2>

      {error && (
        <div className="mb-3 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 flex-1">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={isLoading || externalIsLoading}
              className="w-full text-black pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              required
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email / Phone
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              id="email"
              placeholder="johndoe@mail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{ color: "black" }}
              disabled={isLoading || externalIsLoading}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              style={{ color: "black" }}
              disabled={isLoading || externalIsLoading}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading || externalIsLoading}
              style={{ color: "black" }}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || externalIsLoading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isLoading || externalIsLoading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or</span>
        </div>
      </div>

      {/* Social Sign Up */}
      <div className="space-y-2">
        {["Google", "Facebook", "Apple"].map((p) => (
          <button
            key={p}
            type="button"
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-md hover:bg-gray-50 transition-colors text-gray-700 font-medium"
          >
            Sign in with {p}
          </button>
        ))}
      </div>

      {/* Sign In Link */}
      <p className="text-center text-sm text-gray-600 mt-5">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSignInClick}
          className="text-blue-600 hover:underline font-semibold"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}
