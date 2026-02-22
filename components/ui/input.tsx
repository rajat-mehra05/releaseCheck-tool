"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, label, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "text-xs font-medium uppercase tracking-wider",
              "text-gray-500 dark:text-neutral-400"
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-neutral-500">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full rounded-lg border text-sm transition-colors",
              "bg-white border-gray-200 text-gray-900 placeholder-gray-400",
              "focus:outline-none focus:border-purple-500",
              "dark:bg-neutral-900/80 dark:border-neutral-800",
              "dark:text-white dark:placeholder-neutral-600",
              "dark:focus:border-neutral-600",
              icon ? "pl-10 pr-4 py-2.5" : "px-4 py-2.5",
              className
            )}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
