"use client";

import { cn } from "@/lib/cn";
import { Check } from "lucide-react";

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}

export function Checkbox({ checked, onChange, label, disabled }: CheckboxProps) {
  return (
    <label
      className={cn(
        "flex items-start gap-3 py-2 cursor-pointer group",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "mt-0.5 h-5 w-5 rounded border-2 flex items-center justify-center flex-shrink-0",
          "transition-colors cursor-pointer",
          checked
            ? "bg-purple-600 border-purple-600 dark:bg-white dark:border-white"
            : cn(
                "border-gray-300 group-hover:border-gray-400",
                "dark:border-neutral-600 dark:group-hover:border-neutral-500"
              ),
          disabled && "cursor-not-allowed"
        )}
      >
        {checked && (
          <Check
            className={cn("h-3.5 w-3.5", "text-white dark:text-black")}
            strokeWidth={3}
          />
        )}
      </button>
      <span
        className={cn(
          "text-sm leading-snug",
          checked
            ? "text-gray-400 line-through dark:text-neutral-500"
            : "text-gray-700 dark:text-neutral-300"
        )}
      >
        {label}
      </span>
    </label>
  );
}
