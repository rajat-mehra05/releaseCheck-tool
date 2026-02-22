"use client";

import { RELEASE_STEPS } from "@/lib/constants";
import { Checkbox } from "@/components/ui/checkbox";

interface ReleaseStepsProps {
  completedSteps: number[];
  onToggle: (stepIndex: number) => void;
  disabled?: boolean;
}

export function ReleaseSteps({ completedSteps, onToggle, disabled }: ReleaseStepsProps) {
  return (
    <div className="flex flex-col">
      <h3 className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-neutral-400 mb-2">
        Steps
      </h3>
      <div className="divide-y divide-gray-100 dark:divide-neutral-800">
        {RELEASE_STEPS.map((step, index) => (
          <Checkbox
            key={index}
            checked={completedSteps.includes(index)}
            onChange={() => onToggle(index)}
            label={step}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
