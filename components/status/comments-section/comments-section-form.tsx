"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useActionState } from "react";

export default function CommentsSectionForm({
  action,
}: {
  action: (formData: FormData) => Promise<{ error: string } | undefined>;
}) {
  const [state, formAction, pending] = useActionState(
    (_prev: { error: string } | undefined, formData: FormData) =>
      action(formData),
    undefined,
  );
  return (
    <form className="w-full mt-4 flex flex-col gap-2" action={formAction}>
      <div className="w-full flex gap-2">
        <Input
          required
          name="message"
          maxLength={1000}
          placeholder="What's wrong?"
          className="h-10! pl-3! bg-zinc-900! border-zinc-600 hover:border-zinc-400 hover:bg-zinc-900"
        />
        <Button type="submit" className="h-10! w-25!" disabled={pending}>
          Send
          <ArrowRight />
        </Button>
      </div>
      {state?.error && <p className="text-red-500">{state.error}</p>}
    </form>
  );
}
