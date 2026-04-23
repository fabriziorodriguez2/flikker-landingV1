"use client";

import type { MouseEvent } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Check } from "lucide-react";

import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { WHATSAPP_MESSAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";

type Plan = {
  name: string;
  price: string;
  priceSuffix: string;
  setup: string;
  tagline: string;
  features: string[];
  cta: string;
  message: string;
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    name: "Starter",
    price: "USD 49",
    priceSuffix: "/ mes",
    setup: "Setup USD 99",
    tagline: "Para clínicas chicas que recién arrancan.",
    features: [
      "Hasta 150 pacientes / mes",
      "Pedido automático por WhatsApp",
      "Filtro de reseñas negativas",
      "Dashboard básico",
    ],
    cta: "Empezar con Starter",
    message: WHATSAPP_MESSAGES.pricing_starter,
  },
  {
    name: "Pro",
    price: "USD 89",
    priceSuffix: "/ mes",
    setup: "Setup USD 149",
    tagline: "El equilibrio justo. Lo que recomendamos.",
    features: [
      "Hasta 500 pacientes / mes",
      "Reactivación de pacientes inactivos",
      "Widget de reseñas para tu web",
      "Bot de WhatsApp con FAQs",
      "Reportes mensuales",
    ],
    cta: "Quiero el plan Pro",
    message: WHATSAPP_MESSAGES.pricing_pro,
    highlighted: true,
  },
  {
    name: "Business",
    price: "USD 149",
    priceSuffix: "/ mes",
    setup: "Setup USD 249",
    tagline: "Para clínicas grandes o con varias sedes.",
    features: [
      "Pacientes ilimitados",
      "Multi-sede (hasta 3 sucursales)",
      "Integración con tu sistema de turnos",
      "Soporte prioritario",
      "Onboarding 1:1 con el fundador",
      "Todo lo de Pro",
    ],
    cta: "Quiero el plan Business",
    message: WHATSAPP_MESSAGES.pricing_business,
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const highlighted = plan.highlighted === true;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const glowColor = highlighted
    ? "rgba(145, 136, 245, 0.35)"
    : "rgba(145, 136, 245, 0.22)";

  const background = useMotionTemplate`radial-gradient(260px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 70%)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={cn(
        "group relative flex flex-col rounded-2xl p-8 md:p-10 transition-[box-shadow,border-color] duration-300",
        highlighted
          ? "bg-mist text-midnight shadow-xl ring-1 ring-periwinkle/40 hover:shadow-[0_30px_60px_-20px_rgba(145,136,245,0.55)] lg:scale-[1.05] lg:z-10"
          : "bg-[#0a0f4a] text-mist border border-mist/10 hover:border-periwinkle/50 hover:shadow-[0_25px_50px_-20px_rgba(145,136,245,0.4)]"
      )}
    >
      {/* Cursor-following glow */}
      <motion.div
        aria-hidden="true"
        style={{ background }}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-periwinkle px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-midnight shadow-sm">
          Recomendado
        </span>
      )}

      <div className="relative">
        <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-periwinkle">
          {plan.name}
        </h3>

        <div className="mt-5 flex items-baseline gap-2">
          <span className="font-display text-[44px] font-extrabold leading-none text-periwinkle md:text-[56px]">
            {plan.price}
          </span>
          <span
            className={cn(
              "text-sm font-medium",
              highlighted ? "text-midnight/60" : "text-mist/60"
            )}
          >
            {plan.priceSuffix}
          </span>
        </div>
        <p
          className={cn(
            "mt-2 text-xs font-medium uppercase tracking-[0.08em]",
            highlighted ? "text-midnight/50" : "text-mist/50"
          )}
        >
          {plan.setup}
        </p>

        <p
          className={cn(
            "mt-5 text-sm leading-[1.5]",
            highlighted ? "text-midnight/70" : "text-mist/70"
          )}
        >
          {plan.tagline}
        </p>

        <ul className="mt-7 flex-1 space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-periwinkle"
                strokeWidth={2.5}
              />
              <span
                className={cn(
                  "text-sm leading-[1.5]",
                  highlighted ? "text-midnight/85" : "text-mist/85"
                )}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <WhatsAppButton
            variant={highlighted ? "primary" : "secondary"}
            message={plan.message}
            className="w-full justify-center"
          >
            {plan.cta}
          </WhatsAppButton>
        </div>
      </div>
    </motion.div>
  );
}

export function Pricing() {
  return (
    <section
      id="precios"
      className="scroll-mt-20 bg-midnight px-6 py-24 text-mist md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-periwinkle">
            Precios
          </span>
          <h2 className="font-display mt-4 text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[48px]">
            Sin letra chica. Sin sorpresas.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:gap-8 lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-[1.6] text-mist/70 md:text-base">
          <span className="font-bold text-mist">Garantía:</span> si en 60 días no
          tenés al menos 20 reseñas nuevas, te devolvemos el setup. Sin drama.
        </p>
      </div>
    </section>
  );
}
