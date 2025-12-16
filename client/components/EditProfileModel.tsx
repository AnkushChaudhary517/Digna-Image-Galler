import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import EditProfileCard from "./EditProfileCard";

interface EditProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateClick?: (data: any) => void;
}

export default function EditProfileModal({
  open,
  onOpenChange,
  onUpdateClick,
}: EditProfileModalProps) {
  const handleUpdate = (data: any) => {
    console.log("Profile updated:", data);
    if (onUpdateClick) {
      onUpdateClick(data);
    }
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} style={{ zIndex: 1000}}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <EditProfileCard
          onUpdateClick={handleUpdate}
          onCancelClick={handleCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
