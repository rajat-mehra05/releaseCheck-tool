"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Trash2, Check } from "lucide-react";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Modal } from "@/components/ui/modal";
import { ReleaseSteps } from "@/components/releases/release-steps";
import { useToast } from "@/components/toast";
import { mockReleases } from "@/data/mock-releases";
import type { FormEvent } from "react";

export default function ReleaseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const id = Number(params.id);

  const initial = mockReleases.find((r) => r.id === id);

  const [name, setName] = useState(initial?.name ?? "");
  const [date, setDate] = useState(initial?.date ?? "");
  const [additionalInfo, setAdditionalInfo] = useState(initial?.additionalInfo ?? "");
  const [completedSteps, setCompletedSteps] = useState<number[]>(
    initial?.completedSteps ?? []
  );
  const [showDelete, setShowDelete] = useState(false);

  if (!initial) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-neutral-400">Release not found.</p>
      </div>
    );
  }

  const handleToggle = (stepIndex: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepIndex)
        ? prev.filter((i) => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Update release:", { id, name, date, additionalInfo });
    toast("Release updated!");
  };

  const handleDelete = () => {
    console.log("Delete release:", id);
    toast("Release deleted.");
    router.push("/");
  };

  return (
    <div className="min-h-screen relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Centered title + tagline */}
      <div className="pt-10 pb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {APP_NAME}
        </h1>
        <p className="text-sm text-gray-500 dark:text-neutral-400">
          {APP_TAGLINE}
        </p>
      </div>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pb-12">
        {/* Breadcrumb + Delete */}
        <div className="flex items-center justify-between mb-6">
          <nav className="flex items-center gap-1 text-sm">
            <Link
              href="/"
              className="text-purple-600 dark:text-neutral-400 hover:text-purple-800 dark:hover:text-white transition-colors"
            >
              All releases
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400 dark:text-neutral-600" />
            <span className="text-purple-600 dark:text-neutral-300">
              {initial.name}
            </span>
          </nav>
          <Button variant="destructive" onClick={() => setShowDelete(true)}>
            Delete
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Release name + Date side by side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Release"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Step checklist */}
          <ReleaseSteps completedSteps={completedSteps} onToggle={handleToggle} />

          {/* Additional remarks */}
          <Textarea
            label="Additional remarks / tasks"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="Please enter any other important notes for the release."
            rows={5}
          />

          <div className="flex justify-end">
            <Button type="submit">
              Save
              <Check className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </main>

      <Modal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        title={`Delete ${initial.name}?`}
        confirmLabel="Delete"
        destructive
        onConfirm={handleDelete}
      >
        This action cannot be undone. The release and all its progress will be
        permanently removed.
      </Modal>
    </div>
  );
}
