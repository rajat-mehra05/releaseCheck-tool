"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ReleaseForm } from "@/components/releases/release-form";
import { useToast } from "@/components/toast";
import { useTRPC } from "@/trpc/client";

export default function NewReleasePage() {
  const router = useRouter();
  const { toast } = useToast();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createMutation = useMutation(
    trpc.releases.create.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.releases.list.queryKey() });
        toast("Release created successfully!");
        router.push("/");
      },
      onError: (err) => {
        toast(err.message || "Failed to create release.", "error");
      },
    })
  );

  const handleSubmit = (data: { name: string; date: string; additionalInfo: string }) => {
    createMutation.mutate({
      name: data.name,
      date: data.date,
      additionalInfo: data.additionalInfo || undefined,
    });
  };

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
        <nav className="flex items-center gap-1 text-sm mb-6">
          <Link
            href="/"
            className="text-purple-600 dark:text-neutral-400 hover:text-purple-800 dark:hover:text-white transition-colors"
          >
            All releases
          </Link>
          <ChevronRight className="h-4 w-4 text-gray-400 dark:text-neutral-600" />
          <span className="text-purple-600 dark:text-neutral-300">New</span>
        </nav>

        <ReleaseForm
          onSubmit={handleSubmit}
          submitLabel="Save"
          loading={createMutation.isPending}
        />
      </main>
    </div>
  );
}
