import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import LoginForm from "./LoginForm";

interface SignInModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignUpClick?: () => void;
}

export default function SignInModal({
  open,
  onOpenChange,
  onSignUpClick,
}: SignInModalProps) {
  const handleLogin = (data: { email: string; password: string }) => {
    console.log("Login attempt:", data);
    // Handle login logic here
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="sm:max-w-md p-0 bg-white" 
        style={{
          maxHeight: "95vh",
          overflow: "hidden",
        }}
      >
        <LoginForm onSubmit={handleLogin} onSignUpClick={onSignUpClick} />
      </DialogContent>
    </Dialog>
  );
}
