"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button } from "./button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  confirmLabel?: string;
  onConfirm?: () => void;
  destructive?: boolean;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  confirmLabel = "Confirm",
  onConfirm,
  destructive,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        "rounded-xl p-0 backdrop:bg-black/50",
        "bg-white dark:bg-neutral-900",
        "border border-gray-200 dark:border-neutral-800",
        "shadow-xl max-w-md w-full",
        "animate-[scale-in_0.15s_ease-out]"
      )}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <div className="text-sm text-gray-500 dark:text-neutral-400 mb-6">
          {children}
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="icon" onClick={onClose} className="h-auto w-auto px-4 py-2">
            Cancel
          </Button>
          {onConfirm && (
            <Button
              variant={destructive ? "destructive" : "primary"}
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              {confirmLabel}
            </Button>
          )}
        </div>
      </div>
    </dialog>
  );
}
