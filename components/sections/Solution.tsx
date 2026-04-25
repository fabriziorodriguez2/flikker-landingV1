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
    title: "El cliente termina su compra o visita",
    body: "Se va como siempre. Nadie le pide una reseña cara a cara.",
  },
  {
    icon: MessageCircle,
    title: "Flikker le manda un WhatsApp",
    body: "Un mensaje breve con tu marca. Califica en un toque.",
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
    title: "Volvés a activar clientes",
    body: "A los 30, 60 o 90 días les recordamos volver. Compran o reservan más.",
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
      className="scroll-mt-20 bg-midnight px-6 py-24 text-mist md:px-8 md:py-32"
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
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-periwinkle">
            La solución
          </span>
          <h2 className="font-display mt-4 text-[32px] font-bold leading-[1.1] tracking-[-0.02em] md:text-[48px]">
            De la compra a la reseña.
            <br />
            De la reseña al próximo cliente.
          </h2>
          <p className="mt-5 text-base leading-[1.6] text-mist/70 md:text-lg">
            Un flujo continuo que convierte clientes felices en reputación, y
            reputación en nuevas ventas. Vos no tocás nada.
          </p>
        </motion.div>

        <div className="relative mt-20">
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
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-midnight ring-2 ring-periwinkle md:h-12 md:w-12">
                    <Icon
                      className="h-6 w-6 text-periwinkle md:h-5 md:w-5"
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
          El ciclo se repite con cada cliente. Automático. Sin intervención.
        </motion.p>
      </div>
    </section>
  );
}
