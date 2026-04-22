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
  const [patients, setPatients] = useState<number>(slider.default);

  const reviews = useMemo(
    () => reviewsIn60Days(patients),
    [patients, reviewsIn60Days]
  );
  const reactivations = useMemo(
    () => reactivated(patients),
    [patients, reactivated]
  );

  const progress = ((patients - slider.min) / (slider.max - slider.min)) * 100;
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
      className="scroll-mt-20 bg-gradient-to-b from-mist to-periwinkle/10 px-6 py-24 md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-4xl text-midnight">
        <div className="text-center">
          <span className="text-[12px] font-semibold tracking-[0.18em] uppercase text-periwinkle">
            Calculá tu impacto
          </span>
          <h2 className="font-display mt-4 text-[32px] leading-[1.1] tracking-[-0.02em] font-extrabold md:text-[48px]">
            ¿Cuántas reseñas podrías tener en 60 días?
          </h2>
        </div>

        <div className="mt-12 rounded-2xl border border-midnight/10 bg-white/70 p-8 shadow-sm backdrop-blur-sm md:p-12">
          <label htmlFor="patients" className="block">
            <span className="text-sm font-medium text-midnight/70">
              Atiendo
            </span>
            <div className="mt-2 flex items-baseline gap-3">
              <span className="font-display text-[56px] font-extrabold leading-none text-periwinkle tabular-nums md:text-[72px]">
                {patients}
              </span>
              <span className="text-base font-medium text-midnight/70 md:text-lg">
                pacientes por mes
              </span>
            </div>
          </label>

          <input
            id="patients"
            type="range"
            min={slider.min}
            max={slider.max}
            step={slider.step}
            value={patients}
            onChange={(e) => setPatients(Number(e.target.value))}
            style={trackStyle}
            aria-label="Pacientes por mes"
            aria-valuetext={`${patients} pacientes por mes`}
            className={sliderClasses}
          />
          <div className="mt-2 flex justify-between text-xs font-medium text-midnight/50">
            <span>{slider.min}</span>
            <span>{slider.max}+</span>
          </div>

          <hr className="my-10 border-midnight/10" />

          <ul className="space-y-6">
            <li className="flex flex-col items-start gap-1 md:flex-row md:items-baseline md:gap-4">
              <span className="font-display text-[28px] font-extrabold leading-none text-periwinkle md:text-[36px]">
                ~<CountUp value={reviews} />
              </span>
              <span className="text-base text-midnight/80 md:text-lg">
                reseñas nuevas en Google
              </span>
            </li>
            <li className="flex flex-col items-start gap-1 md:flex-row md:items-baseline md:gap-4">
              <span className="font-display text-[28px] font-extrabold leading-none text-periwinkle md:text-[36px]">
                +<CountUp value={reactivations} />
              </span>
              <span className="text-base text-midnight/80 md:text-lg">
                pacientes reactivados
              </span>
            </li>
            <li className="flex flex-col items-start gap-1 md:flex-row md:items-baseline md:gap-4">
              <span className="font-display text-[28px] font-extrabold leading-none text-periwinkle md:text-[36px]">
                de ~12% a ~35%
              </span>
              <span className="text-base text-midnight/80 md:text-lg">
                de búsquedas locales
              </span>
            </li>
          </ul>

          <div className="mt-10 flex justify-center">
            <WhatsAppButton
              size="xl"
              message={message}
              onClick={() =>
                trackEvent("Calculator Submit", {
                  patients,
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
