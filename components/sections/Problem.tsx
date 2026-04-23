"use client";

import { AlertTriangle, Clock, Users, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const cards: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: AlertTriangle,
    title: "Pedir reseñas te da vergüenza.",
    body: "Atendés bien y te parece incómodo pedir un favor encima. Preferís no romper el vínculo.",
  },
  {
    icon: Clock,
    title: "No tenés tiempo para recordarles.",
    body: "Entre consultas, turnos y administración, pedir reseñas queda siempre para mañana.",
  },
  {
    icon: Users,
    title: "Los felices no aparecen en Google.",
    body: "Quien te busca online ve a los que se quejan. Los contentos ya se fueron a su casa.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function Problem() {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : "hidden";

  return (
    <section className="bg-mist text-midnight px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={initial}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-periwinkle">
            El problema
          </span>
          <h2 className="font-display mt-4 max-w-3xl text-[32px] leading-[1.1] tracking-[-0.02em] font-extrabold md:text-[48px]">
            Atendés excelente. Google dice otra cosa.
          </h2>
        </motion.div>

        <motion.div
          initial={initial}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }}
          className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8"
        >
          {cards.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-lg border border-midnight/10 bg-white/40 p-8 transition-all duration-200 hover:-translate-y-1 hover:border-periwinkle hover:shadow-sm"
            >
              <Icon
                aria-hidden="true"
                className="h-8 w-8 text-periwinkle"
                strokeWidth={1.75}
              />
              <h3 className="mt-6 text-lg font-bold md:text-xl">{title}</h3>
              <p className="mt-3 text-base leading-[1.55] text-midnight/70">
                {body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
