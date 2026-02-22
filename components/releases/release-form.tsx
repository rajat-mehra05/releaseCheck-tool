"use client";

import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ReleaseFormData {
  name: string;
  date: string;
  additionalInfo: string;
}

interface ReleaseFormProps {
  initial?: ReleaseFormData;
  onSubmit: (data: ReleaseFormData) => void;
  submitLabel?: string;
  loading?: boolean;
}

export function ReleaseForm({
  initial,
  onSubmit,
  submitLabel = "Save",
  loading,
}: ReleaseFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [date, setDate] = useState(initial?.date ?? "");
  const [additionalInfo, setAdditionalInfo] = useState(initial?.additionalInfo ?? "");
  const [errors, setErrors] = useState<{ name?: string; date?: string }>({});

  const validate = (): boolean => {
    const newErrors: { name?: string; date?: string } = {};
    if (!name.trim()) newErrors.name = "Release name is required.";
    if (!date) newErrors.date = "Please select a release date.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ name: name.trim(), date, additionalInfo });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Release name + Date side by side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Release"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          placeholder="e.g. Version 2.1.0"
          error={errors.name}
        />
        <Input
          label="Date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }));
          }}
          error={errors.date}
        />
      </div>
      <Textarea
        label="Additional remarks / tasks"
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
        placeholder="Please enter any other important notes for the release."
        rows={5}
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : submitLabel}
          <Check className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
