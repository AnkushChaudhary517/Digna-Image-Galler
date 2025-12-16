import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import ThankYouCard from "./ThankYouCard";

interface ThankYouModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSkipClick?: () => void;
  onEditProfileClick?: () => void;
}

export default function ThankYouModal({
  open,
  onOpenChange,
  onSkipClick,
  onEditProfileClick,
}: ThankYouModalProps) {
  const handleSkip = () => {
    if (onSkipClick) {
      onSkipClick();
    }
    onOpenChange(false);
  };

  const handleEditProfile = () => {
    if (onEditProfileClick) {
      onEditProfileClick();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-transparent border-none shadow-none">
        <ThankYouCard
          onSkipClick={handleSkip}
          onEditProfileClick={handleEditProfile}
        />
      </DialogContent>
    </Dialog>
  );
}
