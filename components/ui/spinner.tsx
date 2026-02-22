import { cn } from "@/lib/cn";

interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <div className="flex items-center justify-center py-16">
      <div
        className={cn(
          "h-6 w-6 rounded-full border-2",
          "border-gray-200 border-t-purple-600",
          "dark:border-neutral-700 dark:border-t-white",
          "animate-[spin_0.6s_linear_infinite]",
          className
        )}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
