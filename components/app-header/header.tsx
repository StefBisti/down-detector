"use client";

import Link from "next/link";
import { useState } from "react";
import HeaderBurger from "./header-burger";

export default function Header() {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  return (
    <header className="bg-red sticky top-0 z-50">
      <div className="h-16 mx-auto max-w-10xl flex items-center justify-start gap-4 px-4">
        <HeaderBurger
          hamburgerOpen={hamburgerOpen}
          setHamburgerOpen={setHamburgerOpen}
          languages={["English", "Spanish", "Portugeese"]}
        />
        <Link href="/" className="md:ml-10">
          <span className="tracking-wide font-heading text-primary font-black text-2xl">
            Down
          </span>
          <span className="tracking-wide font-heading font-black text-2xl">
            detector
          </span>
        </Link>

        <nav className="hidden md:ml-auto md:flex md:items-center md:gap-8 md:mr-10">
          Hello there
        </nav>
      </div>
    </header>
  );
}
