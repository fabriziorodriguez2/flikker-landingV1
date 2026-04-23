"use client";

import { useEffect, useState } from "react";

import { Logo } from "@/components/ui/Logo";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { NAV_LINKS, WHATSAPP_MESSAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const scrolled = useScrolled(20);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-colors duration-200",
        scrolled
          ? "bg-mist/80 backdrop-blur-md border-b border-midnight/5"
          : "bg-mist/80"
      )}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-8"
      >
        <a
          href="#top"
          aria-label="Flikker — Ir al inicio"
          className="flex items-center rounded-sm transition-colors hover:text-periwinkle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-periwinkle"
        >
          <Logo
            variant="wordmark"
            className="h-8 w-auto text-midnight md:h-10"
          />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={cn(
                  "inline-flex min-h-[44px] items-center rounded-sm px-1 text-sm font-medium transition-colors hover:text-periwinkle",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-periwinkle focus-visible:ring-offset-2",
                  scrolled
                    ? "text-midnight focus-visible:ring-offset-mist"
                    : "text-midnight focus-visible:ring-offset-mist"
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <WhatsAppButton
          variant="nav"
          message={WHATSAPP_MESSAGES.nav}
          label="Hablar por WhatsApp"
        >
          WhatsApp
        </WhatsAppButton>
      </nav>
    </header>
  );
}

function useScrolled(threshold: number) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
