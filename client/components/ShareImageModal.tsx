// Modal.tsx
import React from "react";

interface ShareImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ShareImageModal: React.FC<ShareImageModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" style={{height:"200px",width:"400px",top:"50%",left:"50%",transform:"translate(-50%, -50%)"}}>
      <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times; {/* Close button */}
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ShareImageModal;
