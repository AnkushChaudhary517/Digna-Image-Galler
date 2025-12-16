import { useState } from "react";
import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
const navigate = useNavigate();
  const handleLogin = (data: { email: string; password: string }) => {
    setIsLoading(true);
    console.log("Login attempt:", data);
    navigate("/profile");
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle login success/error here
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}
