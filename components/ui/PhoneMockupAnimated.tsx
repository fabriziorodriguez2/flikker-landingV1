"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion";
import { Star } from "lucide-react";

import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

/**
 * iPhone mockup con 5 pantallas que ciclan.
 * Total del loop: ~7 segundos (2 + 1 + 1 + 2 + 1).
 * Con prefers-reduced-motion se muestra solo la pantalla 1, estática.
 */

const SCREEN_DURATIONS_MS = [5000, 2000, 3000, 3000, 2000];

const fadeTransition: Transition = { duration: 0.35, ease: "easeInOut" };

export function PhoneMockupAnimated() {
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = window.setTimeout(
      () => setIndex((i) => (i + 1) % SCREEN_DURATIONS_MS.length),
      SCREEN_DURATIONS_MS[index]
    );
    return () => window.clearTimeout(id);
  }, [index, shouldReduceMotion]);

  const screens = useMemo(
    () => [
      <WhatsAppScreen key="whatsapp" />,
      <ReviewRatingScreen key="rating" />,
      <ThankYouScreen key="thanks" />,
      <GoogleReviewsScreen key="google" />,
      <CounterScreen key="counter" />,
    ],
    []
  );

  const activeIndex = shouldReduceMotion ? 0 : index;

  return (
    <div className="relative mx-auto w-[260px] sm:w-[280px] md:w-[300px]">
      {/* Glow behind the phone — soft periwinkle halo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 translate-y-6 scale-[0.92] rounded-[3rem] bg-periwinkle/30 blur-3xl"
      />

      {/* Phone bezel */}
      <div className="relative aspect-[9/19.5] rounded-[2.75rem] bg-zinc-950 p-2.5 shadow-2xl ring-1 ring-white/10">
        {/* Notch */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-2.5 z-20 h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-zinc-950"
        />

        {/* Screen */}
        <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-white">
          {shouldReduceMotion ? (
            <div className="absolute inset-0">{screens[0]}</div>
          ) : (
            <AnimatePresence initial={false}>
              <motion.div
                key={activeIndex}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={fadeTransition}
              >
                {screens[activeIndex]}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}

/* ---------- Screen 1: WhatsApp message from Flikker ---------- */

function WhatsAppScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-[#ece5dd]">
      <div className="flex items-center gap-2.5 bg-[#128c7e] px-3 pt-10 pb-2.5 text-white">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <Logo variant="isotype" className="h-4 w-auto" />
        </div>
        <div className="leading-tight">
          <p className="text-[11px] font-semibold">Flikker</p>
          <p className="text-[9px] text-white/80">en línea</p>
        </div>
      </div>

      <div className="flex-1 space-y-2 px-2.5 py-3">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.1 }}
          className="max-w-[85%] rounded-lg rounded-tl-sm bg-white px-2.5 py-2 text-[10px] leading-snug text-zinc-800 shadow-sm"
        >
          Hola María 👋 Gracias por venir hoy a Clínica Sonrisa.
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.45 }}
          className="max-w-[85%] rounded-lg rounded-tl-sm bg-white px-2.5 py-2 text-[10px] leading-snug text-zinc-800 shadow-sm"
        >
          ¿Nos ayudás contándonos cómo fue tu experiencia? Son 30 segundos.
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 0.85 }}
          className="max-w-[85%] rounded-lg rounded-tl-sm bg-white px-2.5 py-2 text-[10px] leading-snug text-zinc-800 shadow-sm"
        >
          <span className="font-semibold text-[#128c7e]">flikker.app/r/clinica-sonrisa</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 1.6 }}
          className="ml-auto max-w-[85%] rounded-lg rounded-tr-sm bg-[#dcf8c6] px-2.5 py-2 text-[10px] leading-snug text-zinc-800 shadow-sm"
        >
          ¡Genial! La atención fue súper amable y rápida 😊
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: 2.3 }}
          className="ml-auto max-w-[85%] rounded-lg rounded-tr-sm bg-[#dcf8c6] px-2.5 py-2 text-[10px] leading-snug text-zinc-800 shadow-sm"
        >
          Ya les dejé la reseña ⭐️⭐️⭐️⭐️⭐️
        </motion.div>
      </div>

      <div className="flex items-center gap-1.5 border-t border-black/5 bg-white px-2 py-1.5">
        <div className="h-6 flex-1 rounded-full bg-zinc-100" />
        <div className="h-6 w-6 rounded-full bg-[#128c7e]" />
      </div>
    </div>
  );
}

/* ---------- Screen 2: Rating landing with 5 stars ---------- */

function ReviewRatingScreen() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white px-5 pt-10 text-center">
      <Logo variant="default" className="h-6 w-auto" />
      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.1em] text-periwinkle">
        Clínica Sonrisa
      </p>
      <h3 className="mt-2 text-[16px] font-extrabold leading-tight tracking-tight text-midnight font-display">
        ¿Cómo estuvo
        <br />
        tu experiencia?
      </h3>

      <div className="mt-5 flex items-center gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.2 }}
          >
            <Star className="h-6 w-6 fill-apricot text-apricot" />
          </motion.div>
        ))}
      </div>

      <p className="mt-4 text-[9px] text-midnight/50">Tocá para calificar</p>
    </div>
  );
}

/* ---------- Screen 3: Thank you + Google CTA ---------- */

function ThankYouScreen() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white px-5 pt-10 text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-periwinkle/15"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-7 w-7"
          aria-hidden="true"
        >
          <path
            d="M5 12.5l4.5 4.5L19 7.5"
            stroke="var(--color-periwinkle)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <h3 className="mt-4 text-[15px] font-extrabold leading-tight text-midnight font-display">
        ¡Gracias, María!
      </h3>
      <p className="mt-2 text-[10px] leading-snug text-midnight/70">
        ¿Nos ayudás dejándola
        <br />
        también en Google?
      </p>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.2 }}
        className="mt-4 flex items-center gap-1.5 rounded-full bg-midnight px-3.5 py-2 text-[10px] font-semibold text-mist"
      >
        <GoogleG className="h-3 w-3" />
        <span>Dejar reseña en Google</span>
      </motion.div>
    </div>
  );
}

/* ---------- Screen 4: Google Reviews, stars filling in ---------- */

function GoogleReviewsScreen() {
  return (
    <div className="flex h-full w-full flex-col bg-white pt-10">
      <div className="flex items-center justify-between px-3 pb-2">
        <div className="flex items-center gap-1.5">
          <GoogleG className="h-4 w-4" />
          <span className="text-[10px] font-semibold text-midnight">
            Clínica Sonrisa
          </span>
        </div>
        <span className="text-[9px] text-midnight/50">Reseña</span>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-periwinkle/20 text-[11px] font-bold text-periwinkle">
          M
        </div>
        <p className="text-center text-[10px] text-midnight/70">
          Tu calificación
        </p>
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.25 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.25, duration: 0.15 }}
            >
              <Star className="h-5 w-5 fill-[#fbbc04] text-[#fbbc04]" />
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.25 }}
          className="mt-2 rounded-full bg-[#1a73e8] px-3 py-1.5 text-[10px] font-semibold text-white"
        >
          Publicar
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Screen 5: Counter ticking up ---------- */

function CounterScreen() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-white px-5 pt-10 text-center">
      <div className="flex items-center gap-1.5">
        <GoogleG className="h-3.5 w-3.5" />
        <span className="text-[9px] font-semibold uppercase tracking-[0.08em] text-midnight/60">
          Reseñas de Google
        </span>
      </div>

      <div className="relative mt-4 flex items-baseline gap-1 font-display">
        <AnimatePresence mode="wait">
          <motion.span
            key="count"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35 }}
            className="text-5xl font-extrabold leading-none text-midnight"
          >
            35
          </motion.span>
        </AnimatePresence>
      </div>

      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 18 }}
        className="mt-3 rounded-full bg-periwinkle/15 px-2.5 py-1 text-[9px] font-semibold text-periwinkle"
      >
        +1 nueva
      </motion.span>

      <div className="mt-4 flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            className="h-3.5 w-3.5 fill-[#fbbc04] text-[#fbbc04]"
          />
        ))}
        <span className="ml-1 text-[10px] font-semibold text-midnight">
          4.8
        </span>
      </div>
    </div>
  );
}

/* ---------- Google G logo (simplified, brand-safe colors) ---------- */

function GoogleG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={cn("h-4 w-4", className)}
    >
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8a12 12 0 1 1 7.9-21l5.7-5.7A20 20 0 1 0 44 24c0-1.2-.1-2.4-.4-3.5Z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8A12 12 0 0 1 24 12c3 0 5.8 1.2 7.9 3L37.6 9A20 20 0 0 0 6.3 14.7Z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2A12 12 0 0 1 12.7 28l-6.6 5C9.5 39.6 16.2 44 24 44Z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3a12 12 0 0 1-4.1 5.6l6.2 5.2C37 40.3 44 35 44 24c0-1.2-.1-2.4-.4-3.5Z"
      />
    </svg>
  );
}
