import React, { useEffect, useRef } from "react";

// Define props interface for Modal component
interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null); // Reference for modal content

  useEffect(() => {
    // Function to close modal if clicked outside of its content
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose(); // Trigger onClose callback
      }
    };

    // Attach or remove event listener based on modal visibility
    if (isVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    // Clean up event listener on unmount or visibility change
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isVisible, onClose]); // Dependencies: visibility status and close handler

  // Render null if modal is not visible
  if (!isVisible) return null;

  // Modal structure
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-xl p-8 shadow-xl min-w-[700px] min-h-[600px]"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
