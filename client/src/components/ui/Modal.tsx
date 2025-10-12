// components/ui/Modal.tsx
import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import cn from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  size = "md",
  children,
  className,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // tashqariga bosilganda yoki ESC bosilganda yopish
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div className="fixed inset-0 z-50 h-screen w-screen flex items-center justify-center bg-black/50">
      <div
        ref={modalRef}
        className={cn(
          "relative w-full bg-white rounded-lg shadow-lg transform transition-all p-10",
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between border-b py-3">
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600"
              onClick={onClose}
            >
              <X className="h-6 w-6 cursor-pointer" />
            </button>
          </div>
        )}

        {/* Body */}
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
