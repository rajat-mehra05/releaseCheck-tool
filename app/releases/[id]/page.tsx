"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Trash2, Check } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Spinner } from "@/components/ui/spinner";
import { Modal } from "@/components/ui/modal";
import { ReleaseSteps } from "@/components/releases/release-steps";
import { useToast } from "@/components/toast";
import { useTRPC } from "@/trpc/client";

export default function ReleaseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const id = Number(params.id);

  const { data: release, isLoading } = useQuery(
    trpc.releases.byId.queryOptions({ id })
  );

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showDelete, setShowDelete] = useState(false);

  // Sync local state when release data loads
  useEffect(() => {
    if (release) {
      setName(release.name);
      setDate(release.date);
      setAdditionalInfo(release.additionalInfo ?? "");
      setCompletedSteps(release.completedSteps);
    }
  }, [release]);

  const updateMutation = useMutation(
    trpc.releases.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.releases.list.queryKey() });
        queryClient.invalidateQueries({ queryKey: trpc.releases.byId.queryKey({ id }) });
        toast("Release updated!");
        router.push("/");
      },
      onError: () => {
        toast("Failed to save release.", "error");
      },
    })
  );

  const deleteMutation = useMutation(
    trpc.releases.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.releases.list.queryKey() });
        toast("Release deleted.");
        router.push("/");
      },
      onError: () => {
        toast("Failed to delete release.", "error");
      },
    })
  );

  const handleToggle = (stepIndex: number) => {
    setCompletedSteps((prev) =>
      prev.includes(stepIndex)
        ? prev.filter((i) => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({
      id,
      name,
      date,
      additionalInfo,
      completedSteps,
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate({ id });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!release) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 dark:text-neutral-400">Release not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="pt-10 pb-6 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
          {APP_NAME}
        </h1>
        <p className="text-sm text-gray-500 dark:text-neutral-400">
          {APP_TAGLINE}
        </p>
      </div>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 pb-12">
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
              {release.name}
            </span>
          </nav>
          <Button variant="destructive" onClick={() => setShowDelete(true)}>
            Delete
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <ReleaseSteps completedSteps={completedSteps} onToggle={handleToggle} />

          <Textarea
            label="Additional remarks / tasks"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="Please enter any other important notes for the release."
            rows={5}
          />

          <div className="flex justify-end">
            <Button type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Saving..." : "Save"}
              <Check className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </main>

      <Modal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        title={`Delete ${release.name}?`}
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
