"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Comment } from "@/lib/services";
import { ArrowRight } from "lucide-react";
import { Input } from "../ui/input";

type CommentsSectionProps = {
  serviceName: string;
  comments: Comment[];
};

export default function CommentsSection({
  serviceName,
  comments,
}: CommentsSectionProps) {
  return (
    <section
      id="Comments"
      className="container max-w-3xl rounded-md bg-zinc-700 px-8 py-8"
    >
      <h2 className="text-2xl font-semibold text-white">
        Having a problem with {serviceName}?
      </h2>
      <p className="mt-1 text-lg text-zinc-300">
        Comments are annonymous and help others understand the issue.
      </p>

      <form className="mt-4 flex gap-2">
        <Input
          required
          maxLength={50}
          placeholder="What's wrong?"
          className="h-8! bg-zinc-900! border-zinc-600 hover:border-zinc-400 hover:bg-zinc-900"
        />
        <Button type="submit">
          Send
          <ArrowRight />
        </Button>
      </form>
      <Separator className="my-6 bg-zinc-500" />

      <div className="mt-8 flex flex-col gap-8">
        {comments.map((c, i) => (
          <div key={i} className="flex gap-4 justify-start items-start">
            <span className="mt-0.5 text-zinc-400 min-w-30 max-w-30">
              {c.hoursAgo} hours ago
            </span>
            <p className="text-lg text-zinc-100">{c.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
