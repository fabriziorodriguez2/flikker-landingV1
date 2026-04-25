"use client";

import { AlertTriangle, Clock, Users, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const cards: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: AlertTriangle,
    title: "Pedir reseñas se siente incómodo.",
    body: "Atendés bien, vendés bien o brindás un buen servicio, pero pedir el favor en persona rompe el momento.",
  },
  {
    icon: Clock,
    title: "No tenés tiempo para hacerlo siempre.",
    body: "Entre ventas, atención, pedidos y administración, pedir reseñas queda para después.",
  },
  {
    icon: Users,
    title: "Los clientes felices no aparecen en Google.",
    body: "Quien te busca online ve pocos comentarios o los de siempre. La mayoría de los satisfechos no deja nada.",
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
    <section className="bg-mist px-6 py-24 text-midnight md:px-8 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={initial}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-periwinkle">
            El problema
          </span>
          <h2 className="font-display mt-4 max-w-3xl text-[32px] font-bold leading-[1.1] tracking-[-0.02em] md:text-[48px]">
            Hacés bien tu trabajo.
            <br />
            Google no lo refleja.
          </h2>
        </motion.div>

        <motion.div
          initial={initial}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
          className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8"
        >
          {cards.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="group rounded-lg border border-midnight/10 bg-white/40 p-8 transition-all duration-200 hover:-translate-y-1 hover:border-rose-300/60 hover:bg-rose-50/70 hover:shadow-md hover:shadow-rose-100/60"
            >
              <Icon
                aria-hidden="true"
                className="h-8 w-8 text-periwinkle transition-colors duration-200 group-hover:text-rose-500"
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
