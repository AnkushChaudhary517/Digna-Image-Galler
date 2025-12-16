import { Dialog, DialogContent } from "@/components/ui/dialog";
import SignupForm from "./SignupForm";

interface SignupModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignInClick?: () => void;
}

export default function SignupModal({
  open,
  onOpenChange,
  onSignInClick,
}: SignupModalProps) {
  const handleSignup = (data: { name: string; email: string; password: string }) => {
    console.log("Signup attempt:", data);
    onOpenChange(false);
  };

  const handleSignInClick = () => {
    onOpenChange(false);
    if (onSignInClick) onSignInClick();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        style={{
          maxHeight: "90vh",           // dialog fills 90% of viewport
          margin: "5vh auto",          // equal top & bottom margin
          padding: "0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          borderRadius: "12px",
          zIndex: 1000,
        }}
        className="w-full sm:max-w-lg"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            padding: "1rem",
          }}
        >
          <SignupForm onSubmit={handleSignup} onSignInClick={handleSignInClick} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
