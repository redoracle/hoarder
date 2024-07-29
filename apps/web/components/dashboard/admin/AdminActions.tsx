"use client";

import { ActionButton } from "@/components/ui/action-button";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/lib/trpc";
import { useTheme } from "next-themes";

export default function AdminActions() {
  const { theme } = useTheme();
  const { mutate: recrawlLinks, isPending: isRecrawlPending } =
    api.admin.recrawlLinks.useMutation({
      onSuccess: () => {
        toast({
          description: "Recrawl enqueued",
        });
      },
      onError: (e) => {
        toast({
          variant: "destructive",
          description: e.message,
        });
      },
    });

  const { mutate: reindexBookmarks, isPending: isReindexPending } =
    api.admin.reindexAllBookmarks.useMutation({
      onSuccess: () => {
        toast({
          description: "Reindex enqueued",
        });
      },
      onError: (e) => {
        toast({
          variant: "destructive",
          description: e.message,
        });
      },
    });

  return (
    <div
      className={`rounded-md p-4 ${
        theme === "dark"
          ? "bg-gray-900 bg-opacity-70 text-white"
          : "bg-white bg-opacity-70 text-gray-900"
      } backdrop-blur-lg backdrop-filter`}
    >
      <div className="mb-2 mt-8 text-xl font-medium">Actions</div>
      <div className="flex flex-col gap-2 sm:w-1/2">
        <ActionButton
          variant="destructive"
          loading={isRecrawlPending}
          onClick={() =>
            recrawlLinks({ crawlStatus: "failure", runInference: true })
          }
          className="w-max rounded-lg"
        >
          Recrawl Failed Links Only
        </ActionButton>
        <ActionButton
          variant="destructive"
          loading={isRecrawlPending}
          onClick={() =>
            recrawlLinks({ crawlStatus: "all", runInference: true })
          }
          className="w-max rounded-lg"
        >
          Recrawl All Links
        </ActionButton>
        <ActionButton
          variant="destructive"
          loading={isRecrawlPending}
          onClick={() =>
            recrawlLinks({ crawlStatus: "all", runInference: false })
          }
          className="w-max rounded-lg"
        >
          Recrawl All Links (Without Inference)
        </ActionButton>
        <ActionButton
          variant="destructive"
          loading={isReindexPending}
          onClick={() => reindexBookmarks()}
          className="w-max rounded-lg"
        >
          Reindex All Bookmarks
        </ActionButton>
      </div>
    </div>
  );
}
