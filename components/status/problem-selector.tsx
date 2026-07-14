"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ProblemSelector({ problems }: { problems: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
      {problems.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => setSelected(p)}
          className={cn(
            "flex items-center gap-4 rounded-full border px-6 py-4 text-left text-lg font-medium text-white cursor-pointer transition-colors bg-zinc-900 border-zinc-600 hover:border-zinc-400",
            selected === p && "border-zinc-300 bg-zinc-800",
          )}
        >
          <span className="grid size-5 shrink-0 place-items-center rounded-full border-2 border-primary">
            {selected === p && (
              <span className="size-2.5 rounded-full bg-primary" />
            )}
          </span>
          {p}
        </button>
      ))}
    </div>
  );
}
