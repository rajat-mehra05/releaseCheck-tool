"use client";

import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, className, id, ...props }, ref) => {
    const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-neutral-400"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full rounded-lg border text-sm transition-colors resize-y min-h-[80px]",
            "bg-white border-gray-200 text-gray-900 placeholder-gray-400",
            "focus:outline-none focus:border-purple-500",
            "dark:bg-neutral-900/80 dark:border-neutral-800",
            "dark:text-white dark:placeholder-neutral-600",
            "dark:focus:border-neutral-600",
            "px-4 py-2.5",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
