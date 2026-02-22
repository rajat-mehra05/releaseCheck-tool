"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { ReleaseList } from "@/components/releases/release-list";
import { mockReleases } from "@/data/mock-releases";
import type { Release } from "@/lib/types";

export default function HomePage() {
  const [releases, setReleases] = useState<Release[]>(mockReleases);

  const handleDelete = (id: number) => {
    setReleases((prev) => prev.filter((r) => r.id !== id));
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
        {/* All releases + New release button */}
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

        <ReleaseList releases={releases} onDelete={handleDelete} />
      </main>
    </div>
  );
}
