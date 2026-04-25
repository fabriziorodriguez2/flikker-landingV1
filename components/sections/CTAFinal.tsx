"use client";

import { motion, useReducedMotion } from "framer-motion";

import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

export function CTAFinal() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-midnight px-6 py-32 text-mist md:px-8 md:py-40 lg:py-48">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(142,149,255,0.18),_transparent_38%),linear-gradient(135deg,_rgba(11,18,92,0.96),_rgba(6,10,54,1))]" />

      <motion.div
        aria-hidden="true"
        className="absolute -left-24 top-8 -z-10 h-72 w-72 rounded-full bg-periwinkle/30 blur-3xl md:h-96 md:w-96"
        animate={
          shouldReduceMotion
            ? { x: 0, y: 0, scale: 1 }
            : { x: [0, 42, -10, 0], y: [0, -22, 26, 0], scale: [1, 1.08, 0.96, 1] }
        }
        transition={{
          duration: 14,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute -right-20 bottom-0 -z-10 h-80 w-80 rounded-full bg-apricot/18 blur-3xl md:h-[28rem] md:w-[28rem]"
        animate={
          shouldReduceMotion
            ? { x: 0, y: 0, scale: 1 }
            : { x: [0, -36, 10, 0], y: [0, 18, -28, 0], scale: [1, 0.94, 1.06, 1] }
        }
        transition={{
          duration: 16,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-position:center] [background-size:140px_140px]"
        animate={
          shouldReduceMotion
            ? { backgroundPosition: "center" }
            : {
                backgroundPosition: [
                  "center",
                  "center 140px",
                  "140px 140px",
                  "center",
                ],
              }
        }
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-periwinkle">
          ¿Empezamos?
        </span>

        <h2 className="font-display mt-6 text-[40px] font-bold leading-[1.02] tracking-[-0.03em] md:text-[72px] lg:text-[88px]">
          Tu próximo cliente ya te{" "}
          <span className="text-periwinkle">está googleando.</span>
        </h2>

        <p className="mt-8 max-w-xl text-lg leading-[1.55] text-mist/75 md:text-xl">
          Hablemos 15 minutos. Te mostramos el dashboard, te damos un número
          estimado para tu negocio. Sin compromiso, sin sales pitch.
        </p>

        <div className="mt-12">
          <WhatsAppButton
            size="xl"
            message={WHATSAPP_MESSAGES.ctaFinal}
            className="px-10 py-6 text-xl md:px-14 md:py-7 md:text-2xl"
          >
            Hablemos por WhatsApp
          </WhatsAppButton>
        </div>

        <p className="mt-6 text-sm text-mist/55">
          Te escribe el fundador. En persona. Sin bots.
        </p>
      </div>
    </section>
  );
}
