import React, { useState, useRef, useEffect } from "react";

export function usePopover() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return { open, setOpen, ref };
}

export function Popover({ children, popover }) {
  return (
    <div ref={popover.ref}>
      {children}
    </div>
  );
}

export function PopoverTrigger({ children, popover }) {
  return (
    <div onClick={() => popover.setOpen(!popover.open)}>
      {children}
    </div>
  );
}

export function PopoverContent({ children, popover }) {
  if (!popover.open) return null;

  return (
    <div className="absolute top-[100%] left-[10%] hover:in z-50 w-72 rounded-md border border-slate-200 bg-white p-2 text-slate-950 shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 space-y-2">
      {children}
    </div>
  );
}