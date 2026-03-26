import React, { useState, useEffect } from "react";

/* ================= Dialog Root ================= */
export function Dialog({ children, open: externalOpen, setOpen: externalSetOpen }) {
  const [internalOpen, setInternalOpen] = useState(false);
  
  // Use external state if provided, otherwise use internal state
  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const handleSetOpen = externalSetOpen || setInternalOpen;

  return React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    if (child.type === DialogTrigger) {
      return React.cloneElement(child, { onOpen: () => handleSetOpen(true) });
    }

    if (child.type === DialogContent) {
      if (isOpen) {
        return React.cloneElement(child, {
          onClose: () => handleSetOpen(false),
        });
      }
      return null;
    }

    return child;
  });
}

/* ================= Trigger ================= */
export function DialogTrigger({ children, onOpen }) {
  return React.cloneElement(children, {
    onClick: onOpen,
  });
}

/* ================= Content ================= */
export function DialogContent({ children, onClose, className = "" }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* Dialog Box */}
      <div
        className={`relative bg-white rounded-xl shadow-lg w-full max-w-md p-6 ${className}`}
      >
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child;

          if (child.type === DialogClose) {
            return React.cloneElement(child, { onClose });
          }

          return child;
        })}
      </div>
    </div>
  );
}

/* ================= Header ================= */
export function DialogHeader({ children,className }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

/* ================= Title ================= */
export function DialogTitle({ children }) {
  return <h2 className="text-lg font-semibold">{children}</h2>;
}

/* ================= Description ================= */
export function DialogDescription({ children }) {
  return <p className="text-sm text-gray-500 mt-1">{children}</p>;
}

/* ================= Footer ================= */
export function DialogFooter({ children }) {
  return <div className="mt-6 flex justify-end gap-2">{children}</div>;
}

/* ================= Close ================= */
export function DialogClose({ children, onClose }) {
  return React.cloneElement(children, {
    onClick: onClose,
  });
}