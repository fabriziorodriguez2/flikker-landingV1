"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "El paciente termina la consulta",
    body: "Se va como siempre. Ni papeles, ni pedidos incómodos cara a cara.",
  },
  {
    number: "02",
    title: "Flikker le escribe por WhatsApp",
    body: "Un mensaje corto con tu nombre. Sin links raros ni formularios largos.",
  },
  {
    number: "03",
    title: "La reseña buena llega a Google",
    body: "Las negativas te avisan primero a vos, en privado, antes de ser públicas.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function StepIllustration({ variant }: { variant: number }) {
  const common = "h-full w-full";
  if (variant === 0) {
    return (
      <svg viewBox="0 0 160 80" className={common} aria-hidden="true">
        <rect
          x="12"
          y="12"
          width="136"
          height="56"
          rx="8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.5"
        />
        <circle cx="40" cy="40" r="10" fill="currentColor" opacity="0.25" />
        <rect
          x="60"
          y="34"
          width="70"
          height="4"
          rx="2"
          fill="currentColor"
          opacity="0.35"
        />
        <rect
          x="60"
          y="44"
          width="50"
          height="4"
          rx="2"
          fill="currentColor"
          opacity="0.2"
        />
      </svg>
    );
  }
  if (variant === 1) {
    return (
      <svg viewBox="0 0 160 80" className={common} aria-hidden="true">
        <rect
          x="24"
          y="14"
          width="112"
          height="36"
          rx="12"
          fill="currentColor"
          opacity="0.22"
        />
        <rect
          x="36"
          y="26"
          width="66"
          height="4"
          rx="2"
          fill="currentColor"
          opacity="0.55"
        />
        <rect
          x="36"
          y="36"
          width="44"
          height="4"
          rx="2"
          fill="currentColor"
          opacity="0.4"
        />
        <path
          d="M40 50 L30 66"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 80" className={common} aria-hidden="true">
      <polygon
        points="80,14 90,36 114,38 96,54 102,76 80,64 58,76 64,54 46,38 70,36"
        fill="currentColor"
        opacity="0.35"
      />
      <polygon
        points="80,14 90,36 114,38 96,54 102,76 80,64 58,76 64,54 46,38 70,36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />
    </svg>
  );
}

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
        >
          <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-periwinkle">
            La solución
          </span>
          <h2 className="font-display mt-4 max-w-3xl text-[32px] leading-[1.1] tracking-[-0.02em] font-extrabold md:text-[48px]">
            Flikker hace lo que vos no tenés tiempo.
          </h2>
        </motion.div>

        <motion.div
          initial={initial}
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } }}
          className="mt-16 flex flex-col gap-14 md:flex-row md:items-start md:gap-0"
        >
          {steps.map((step, i) => (
            <Fragment key={step.number}>
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex-1"
              >
                <span className="font-display block text-[72px] font-extrabold leading-none text-periwinkle md:text-[88px]">
                  {step.number}
                </span>
                <div className="mt-6 flex h-24 items-center justify-center rounded-lg bg-mist/5 ring-1 ring-mist/10 text-periwinkle md:h-28">
                  <StepIllustration variant={i} />
                </div>
                <h3 className="mt-6 text-lg font-bold md:text-xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-[1.55] text-mist/70">
                  {step.body}
                </p>
              </motion.div>
              {i < steps.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden md:mt-12 md:mx-6 md:h-px md:w-16 md:flex-none md:border-t-2 md:border-dashed md:border-periwinkle/40 md:block"
                />
              )}
            </Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
