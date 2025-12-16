import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import EmailConfirmationCard from "./EmailConfirmationCard";

interface EmailConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmClick?: () => void;
}

export default function EmailConfirmationModal({
  open,
  onOpenChange,
  onConfirmClick,
}: EmailConfirmationModalProps) {
  const handleConfirm = () => {
    if (onConfirmClick) {
      onConfirmClick();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl bg-transparent border-none shadow-none">
        <EmailConfirmationCard onConfirmClick={handleConfirm} />
      </DialogContent>
    </Dialog>
  );
}
