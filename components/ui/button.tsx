"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "icon" | "destructive";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  primary: cn(
    "bg-purple-600 text-white hover:bg-purple-700",
    "dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:hover:bg-neutral-700",
    "px-4 py-2 rounded-lg text-sm font-medium"
  ),
  icon: cn(
    "h-8 w-8 rounded-lg border border-gray-200 bg-white text-gray-500",
    "hover:text-gray-900 hover:border-gray-300",
    "dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400",
    "dark:hover:text-white dark:hover:border-neutral-700",
    "flex items-center justify-center"
  ),
  destructive: cn(
    "bg-transparent border border-gray-200 text-gray-500",
    "hover:bg-red-50 hover:text-red-600 hover:border-red-200",
    "dark:border-neutral-800 dark:text-neutral-400",
    "dark:hover:bg-red-500/20 dark:hover:text-red-400 dark:hover:border-red-500/40",
    "px-4 py-2 rounded-lg text-sm font-medium"
  ),
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 transition-colors cursor-pointer",
        "focus-visible:ring-2 focus-visible:ring-purple-500/40 focus-visible:ring-offset-2",
        "dark:focus-visible:ring-neutral-500/40 dark:focus-visible:ring-offset-neutral-950",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";