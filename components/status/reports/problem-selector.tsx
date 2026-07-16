"use client";

import { useState, useTransition } from "react";
import { Button } from "../../ui/button";
import { Check } from "lucide-react";

export default function ProblemSelector({
  problems,
  action,
}: {
  problems: string[];
  action: (reason: string) => Promise<{ error: string } | undefined>;
}) {
  const [pending, startTransition] = useTransition();
  const [reported, setReported] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  function report(problem: string) {
    setError(null);
    startTransition(async () => {
      const result = await action(problem);
      if (result?.error) {
        setError(result.error);
        return;
      }
      setReported((prev) => new Set(prev).add(problem));
    });
  }

  return (
    <div className="container max-w-3xl px-8 py-8 flex flex-col items-center rounded-xl border border-border bg-card shadow-sm">
      <p className="flex items-center gap-3 text-2xl font-bold text-card-foreground">
        Report a problem
        <span className="grid size-7 place-items-center rounded-lg bg-primary text-lg font-bold text-primary-foreground">
          !
        </span>
      </p>
      <p className="mt-2 text-lg text-muted-foreground">Select which issue applies</p>

      <div className="mt-10 w-full grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2">
        {problems.map((p) => {
          const isReported = reported.has(p);
          return (
            <Button
              key={p}
              onClick={() => report(p)}
              disabled={pending || isReported}
              className="group px-2.5 h-9! flex justify-start items-center gap-4
                border
                text-left text-base font-medium text-foreground bg-background border-border hover:border-muted-foreground hover:bg-background"
            >
              <span className="grid size-5 shrink-0 place-items-center rounded-full border-2 border-primary">
                <span
                  className={
                    isReported
                      ? "size-2.5 rounded-full bg-primary"
                      : "hidden group-hover:block size-2.5 rounded-full bg-primary"
                  }
                />
              </span>
              {p}
              {isReported && <Check className="ml-auto size-4 text-primary" />}
            </Button>
          );
        })}
      </div>

      {error && <p className="mt-4 text-destructive">{error}</p>}
      {reported.size > 0 && !error && (
        <p className="mt-4 text-muted-foreground">
          Thanks — your report was recorded.
        </p>
      )}
    </div>
  );
}
