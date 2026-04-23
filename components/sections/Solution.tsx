"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Globe,
  MessageCircle,
  RefreshCcw,
  Star,
} from "lucide-react";

const steps = [
  {
    icon: CheckCircle2,
    title: "El paciente termina la consulta",
    body: "Se va como siempre. Nadie le pide una reseña cara a cara.",
  },
  {
    icon: MessageCircle,
    title: "Flikker le manda un WhatsApp",
    body: "Un mensaje breve con tu nombre. Califica en un toque.",
  },
  {
    icon: Star,
    title: "La reseña buena llega a Google",
    body: "Las negativas te avisan primero a vos, en privado.",
  },
  {
    icon: Globe,
    title: "Se muestran en tu web",
    body: "Un widget embebible con tus reseñas reales.",
  },
  {
    icon: RefreshCcw,
    title: "Volvés a estar presente",
    body: "A los 30, 60, 90 días les recordamos volver. Reservan más.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Solution() {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : "hidden";

  return (
    <section
      id="solucion"
      className="bg-midnight text-mist px-6 py-24 md:px-8 md:py-32 scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={initial}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-periwinkle">
            La solución
          </span>
          <h2 className="font-display mt-4 text-[32px] leading-[1.1] tracking-[-0.02em] font-extrabold md:text-[48px]">
            De la consulta a la reseña. De la reseña al próximo paciente.
          </h2>
          <p className="mt-5 text-base leading-[1.6] text-mist/70 md:text-lg">
            Un flujo continuo que convierte pacientes felices en reputación, y
            reputación en nuevos turnos. Vos no tocás nada.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Connecting line — desktop */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-transparent via-periwinkle/40 to-transparent md:block"
          />

          <motion.ol
            initial={initial}
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: 0.1, delayChildren: 0.15 },
              },
            }}
            className="grid gap-10 md:grid-cols-5 md:gap-6"
          >
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <motion.li
                  key={step.title}
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="relative flex flex-col items-start md:items-center md:text-center"
                >
                  {/* Node */}
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-midnight ring-2 ring-periwinkle">
                    <Icon
                      className="h-[18px] w-[18px] text-periwinkle"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-5 text-base font-bold leading-tight md:text-[17px]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.55] text-mist/65 md:text-[14px]">
                    {step.body}
                  </p>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>

        <motion.p
          initial={initial}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="mt-16 text-center text-sm text-mist/50"
        >
          El ciclo se repite con cada paciente. Automático. Sin intervención.
        </motion.p>
      </div>
    </section>
  );
}
