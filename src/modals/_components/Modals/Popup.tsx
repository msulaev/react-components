import { useEffect, ReactNode, useRef } from "react";
import useOutsideClick from "../../../_hooks/useOutsideClick";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  hasOverlay?: boolean;
}

const Popup: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  children,
  position = "bottom",
  hasOverlay = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick<HTMLDivElement>(ref, onClose, 'mousedown');

  useEffect(() => {
    if (isOpen && hasOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, hasOverlay]);

  if (!isOpen) return null;

  const positionClasses = {
    top: "bottom-full mb-2",
    bottom: "top-full mt-2",
    left: "right-full mr-2",
    right: "left-full ml-2",
  };

  return (
    <div className="relative z-50">
      {hasOverlay && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        ></div>
      )}
      <div
        ref={ref}
        className={`absolute z-50 p-4 bg-white border border-gray-300 rounded-lg shadow-lg ${positionClasses[position]}`}
      >
        <button
          onClick={onClose}
          className="absolute top-1 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖️
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Popup;
