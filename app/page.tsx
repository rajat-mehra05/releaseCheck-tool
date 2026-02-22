"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Spinner } from "@/components/ui/spinner";
import { ReleaseList } from "@/components/releases/release-list";
import { useTRPC } from "@/trpc/client";
import { useToast } from "@/components/toast";

export default function HomePage() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: releases, isLoading } = useQuery(
    trpc.releases.list.queryOptions()
  );

  const deleteMutation = useMutation(
    trpc.releases.delete.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: trpc.releases.list.queryKey() });
        toast("Release deleted.");
      },
      onError: () => {
        toast("Failed to delete release.", "error");
      },
    })
  );

  const handleDelete = (id: number) => {
    deleteMutation.mutate({ id });
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
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-purple-600 dark:text-neutral-400">
            All releases
          </span>
          <Link href="/releases/new">
            <Button>
              New release
              <Plus className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Spinner />
          </div>
        ) : (
          <ReleaseList releases={releases ?? []} onDelete={handleDelete} />
        )}
      </main>
    </div>
  );
}
