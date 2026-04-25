"use client";

import { useEffect, useMemo, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { CALCULATOR_FORMULAS } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

function CountUp({ value }: { value: number }) {
  const reduced = useReducedMotion();
  const mv = useMotionValue(value);
  const rounded = useTransform(mv, (v) =>
    Math.round(v).toLocaleString("es-UY")
  );

  useEffect(() => {
    if (reduced) {
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration: 0.6, ease: "easeOut" });
    return () => controls.stop();
  }, [value, mv, reduced]);

  return <motion.span className="tabular-nums">{rounded}</motion.span>;
}

export function ImpactCalculator() {
  const { slider, reviewsIn60Days, reactivated } = CALCULATOR_FORMULAS;
  const [customers, setCustomers] = useState<number>(slider.default);

  const reviews = useMemo(
    () => reviewsIn60Days(customers),
    [customers, reviewsIn60Days]
  );
  const reactivations = useMemo(
    () => reactivated(customers),
    [customers, reactivated]
  );

  const progress = ((customers - slider.min) / (slider.max - slider.min)) * 100;
  const trackStyle = {
    background: `linear-gradient(to right, var(--color-periwinkle) 0%, var(--color-periwinkle) ${progress}%, rgba(0, 4, 65, 0.12) ${progress}%, rgba(0, 4, 65, 0.12) 100%)`,
  };

  const message = `Hola! Calculé que podría tener ${reviews} reseñas con Flikker, quiero saber más.`;

  const sliderClasses = [
    "mt-6 w-full appearance-none h-2 rounded-full cursor-pointer",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-periwinkle focus-visible:ring-offset-2 focus-visible:ring-offset-white",
    "[&::-webkit-slider-thumb]:appearance-none",
    "[&::-webkit-slider-thumb]:h-6",
    "[&::-webkit-slider-thumb]:w-6",
    "[&::-webkit-slider-thumb]:rounded-full",
    "[&::-webkit-slider-thumb]:bg-periwinkle",
    "[&::-webkit-slider-thumb]:border-4",
    "[&::-webkit-slider-thumb]:border-white",
    "[&::-webkit-slider-thumb]:shadow-md",
    "[&::-webkit-slider-thumb]:cursor-pointer",
    "[&::-webkit-slider-thumb]:transition-transform",
    "hover:[&::-webkit-slider-thumb]:scale-110",
    "active:[&::-webkit-slider-thumb]:scale-105",
    "[&::-moz-range-thumb]:h-6",
    "[&::-moz-range-thumb]:w-6",
    "[&::-moz-range-thumb]:rounded-full",
    "[&::-moz-range-thumb]:bg-periwinkle",
    "[&::-moz-range-thumb]:border-4",
    "[&::-moz-range-thumb]:border-white",
    "[&::-moz-range-thumb]:shadow-md",
    "[&::-moz-range-thumb]:cursor-pointer",
    "[&::-moz-range-track]:bg-transparent",
  ].join(" ");

  return (
    <section
      id="calculadora"
      className="scroll-mt-20 bg-gradient-to-b from-mist to-periwinkle/10 px-6 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto max-w-3xl text-midnight">
        <div className="text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-periwinkle">
            Calculá tu impacto
          </span>
          <h2 className="font-display mt-3 text-[26px] font-bold leading-[1.1] tracking-[-0.02em] md:text-[36px]">
            ¿Cuántas reseñas podrías tener en 60 días?
          </h2>
        </div>

        <div className="mt-8 rounded-2xl border border-midnight/10 bg-white/70 p-6 shadow-sm backdrop-blur-sm md:p-8">
          <label htmlFor="customers" className="block">
            <span className="text-xs font-medium text-midnight/70">
              Atiendo o vendo a
            </span>
            <div className="mt-1.5 flex items-baseline gap-2.5">
              <span className="font-display tabular-nums text-[40px] font-bold leading-none text-periwinkle md:text-[52px]">
                {customers}
              </span>
              <span className="text-sm font-medium text-midnight/70 md:text-base">
                clientes por mes
              </span>
            </div>
          </label>

          <input
            id="customers"
            type="range"
            min={slider.min}
            max={slider.max}
            step={slider.step}
            value={customers}
            onChange={(e) => setCustomers(Number(e.target.value))}
            style={trackStyle}
            aria-label="Clientes por mes"
            aria-valuetext={`${customers} clientes por mes`}
            className={sliderClasses}
          />
          <div className="mt-1.5 flex justify-between text-[11px] font-medium text-midnight/50">
            <span>{slider.min}</span>
            <span>{slider.max}+</span>
          </div>

          <hr className="my-6 border-midnight/10" />

          <ul className="space-y-4">
            <li className="flex flex-col items-start gap-0.5 md:flex-row md:items-baseline md:gap-3">
              <span className="font-display text-[22px] font-bold leading-none text-periwinkle md:text-[28px]">
                ~<CountUp value={reviews} />
              </span>
              <span className="text-sm text-midnight/80 md:text-base">
                reseñas nuevas en Google
              </span>
            </li>
            <li className="flex flex-col items-start gap-0.5 md:flex-row md:items-baseline md:gap-3">
              <span className="font-display text-[22px] font-bold leading-none text-periwinkle md:text-[28px]">
                +<CountUp value={reactivations} />
              </span>
              <span className="text-sm text-midnight/80 md:text-base">
                clientes reactivados
              </span>
            </li>
            <li className="flex flex-col items-start gap-0.5 md:flex-row md:items-baseline md:gap-3">
              <span className="font-display text-[22px] font-bold leading-none text-periwinkle md:text-[28px]">
                de ~12% a ~35%
              </span>
              <span className="text-sm text-midnight/80 md:text-base">
                de búsquedas locales
              </span>
            </li>
          </ul>

          <div className="mt-7 flex justify-center">
            <WhatsAppButton
              message={message}
              onClick={() =>
                trackEvent("Calculator Submit", {
                  customers,
                  reviews,
                  reactivations,
                })
              }
            >
              Quiero estos números
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
