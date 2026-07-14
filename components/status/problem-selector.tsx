"use client";

import { Button } from "../ui/button";

export default function ProblemSelector({ problems }: { problems: string[] }) {
  return (
    <div className="container max-w-3xl px-8 py-8 flex flex-col items-center rounded-md bg-zinc-700">
      <p className="flex items-center gap-3 text-3xl font-bold text-white">
        Report a problem
        <span className="grid size-8 place-items-center rounded-lg bg-primary text-xl font-bold text-white">
          !
        </span>
      </p>
      <p className="mt-2 text-lg text-zinc-300">Select which issue applies</p>

      <div className="mt-10 w-full grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2">
        {problems.map((p) => (
          <Button
            key={p}
            onClick={() => console.log(p)}
            className="group px-2.5 h-9! flex justify-start items-center gap-4
              rounded-full border 
              text-left text-base font-medium text-white bg-zinc-900 border-zinc-600 hover:border-zinc-400 hover:bg-zinc-900"
          >
            <span className="grid size-5 shrink-0 place-items-center rounded-full border-2 border-primary">
              <span className="hidden group-hover:block size-2.5 rounded-full bg-primary" />
            </span>
            {p}
          </Button>
        ))}
      </div>
    </div>
  );
}
