"use client";

import {
  BarChart3,
  LayoutGrid,
  LifeBuoy,
  RefreshCw,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const features: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Zap,
    title: "Reseñas automáticas",
    body: "Se envían solas después de cada compra, visita o servicio.",
  },
  {
    icon: ShieldCheck,
    title: "Filtro inteligente",
    body: "Las malas llegan a tu privado, no a Google.",
  },
  {
    icon: RefreshCw,
    title: "Reactivación",
    body: "Recupera clientes que no vuelven hace meses.",
  },
  {
    icon: LayoutGrid,
    title: "Widget para tu web",
    body: "Mostrá tus reseñas de Google en tu sitio.",
  },
  {
    icon: LifeBuoy,
    title: "Soporte",
    body: "Te acompañamos con respuesta rápida para que todo funcione sin fricción.",
  },
  {
    icon: BarChart3,
    title: "Dashboard simple",
    body: "Métricas claras, sin jerga de marketing.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
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
            Qué incluye
          </span>
          <h2 className="font-display mt-4 max-w-3xl text-[32px] font-bold leading-[1.1] tracking-[-0.02em] md:text-[48px]">
            Todo lo que necesitás.
            <br />
            Nada de lo que sobra.
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex min-h-[220px] flex-col rounded-lg border border-midnight/10 bg-white/40 p-6 transition-colors hover:border-periwinkle"
            >
              <Icon
                aria-hidden="true"
                className="h-6 w-6 text-periwinkle"
                strokeWidth={1.75}
              />
              <h3 className="mt-4 text-base font-bold md:text-lg">{title}</h3>
              <p className="mt-2 text-sm leading-[1.55] text-midnight/70">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
