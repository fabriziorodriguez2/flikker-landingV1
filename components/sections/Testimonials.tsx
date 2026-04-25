"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  BellRing,
  MessageCircleMore,
  Sparkles,
  Star,
  Store,
  X,
} from "lucide-react";

import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

type Testimonial = {
  clinic: string;
  location: string;
  quote: string;
  logoSrc?: string;
  statBefore: number;
  statAfter: number;
  highlights: string[];
};

const REAL_TESTIMONIALS: Testimonial[] = [
  {
    clinic: "Gains",
    location: "Montevideo",
    quote:
      "Primer cliente activo de Flikker: automatizamos el envío de mensajes a clientes, sumamos un widget de reseñas en la web y otro de notificaciones. El negocio pasó de 8 a 51 reseñas en Google.",
    logoSrc: "/gains-logo.png",
    statBefore: 8,
    statAfter: 51,
    highlights: [
      "Mensajes automáticos a clientes después de comprar",
      "Widget de reseñas embebido en la web",
      "Widget de notificaciones de reseñas en la web",
    ],
  },
];

function GainsLogo() {
  return (
    <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-black">
      <Image
        src="/gains-logo.png"
        alt="Logo de Gains"
        width={56}
        height={56}
        className="h-full w-full object-cover"
        unoptimized
      />
    </div>
  );
}

function HighlightItem({ item }: { item: string }) {
  const Icon = item.includes("Mensajes")
    ? MessageCircleMore
    : item.includes("notificaciones")
      ? BellRing
      : Store;

  return (
    <div className="flex items-start gap-3 rounded-xl border border-midnight/10 bg-mist/80 px-4 py-3">
      <Icon
        aria-hidden="true"
        className="mt-0.5 h-4 w-4 shrink-0 text-periwinkle"
        strokeWidth={2}
      />
      <span className="text-sm leading-[1.5] text-midnight/75">{item}</span>
    </div>
  );
}

function WebsiteWidgetPreview({
  onOpen,
}: {
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group overflow-hidden rounded-[1.35rem] border border-midnight/10 bg-white text-left shadow-sm transition-transform duration-200 hover:scale-[1.01]"
    >
      <div className="flex items-center justify-between border-b border-midnight/10 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-midnight">Widget de reseñas</p>
          <p className="mt-1 text-xs text-midnight/55">
            Tocá para agrandar la captura real de Gains
          </p>
        </div>
        <div className="flex items-center gap-1 text-[#fbbc04]">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={1.7} />
          ))}
        </div>
      </div>
      <div className="relative bg-white">
        <Image
          src="/gains-review-widget.png"
          alt="Captura del widget de reseñas de Gains"
          width={960}
          height={540}
          className="h-auto max-h-[260px] w-full object-cover object-top"
          unoptimized
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-4 py-3 text-xs font-semibold text-white/95">
          Ver imagen completa
        </div>
      </div>
    </button>
  );
}

function NotificationWidgetMock() {
  return (
    <div className="rounded-[1.35rem] border border-periwinkle/20 bg-[#e8ebff] p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-periwinkle text-white">
          <Star className="h-5 w-5 fill-current" strokeWidth={1.7} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold leading-[1.35] text-midnight">
            Capucha SRL nos dejó 5 estrellas
          </p>
          <div className="mt-1 flex items-center gap-1 text-[#f5a623]">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={1.7} />
            ))}
          </div>
          <p className="mt-1 text-xs text-midnight/55">hace 3 semanas</p>
          <p className="mt-1 text-xs text-midnight/60">Powered by Flikker</p>
        </div>
      </div>
    </div>
  );
}

function CaseStudyCard({
  t,
  onOpenWidget,
}: {
  t: Testimonial;
  onOpenWidget: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-periwinkle/30 bg-white/72 shadow-[0_18px_60px_rgba(25,35,90,0.06)]">
      <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-8 md:p-10">
          <div className="flex items-center gap-4">
            {t.logoSrc ? <GainsLogo /> : null}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-periwinkle/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-periwinkle">
                <Sparkles className="h-3.5 w-3.5" strokeWidth={2} />
                Caso real
              </div>
              <p className="mt-3 text-2xl font-semibold text-midnight">{t.clinic}</p>
              <p className="text-sm text-midnight/60">{t.location}</p>
            </div>
          </div>

          <p className="mt-8 max-w-2xl text-lg leading-[1.65] text-midnight/85 md:text-[22px]">
            {t.quote}
          </p>

          <div className="mt-8 grid gap-3">
            {t.highlights.map((item) => (
              <HighlightItem key={item} item={item} />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-between bg-midnight p-8 text-mist md:p-10">
          <div>
            <span className="inline-flex items-center rounded-full bg-periwinkle/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-periwinkle">
              Resultado visible
            </span>

            <div className="mt-6 flex items-end gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-mist/45">
                  Antes
                </p>
                <p className="mt-1 text-4xl font-semibold leading-none text-mist/75">
                  {t.statBefore}
                </p>
              </div>
              <ArrowUpRight
                aria-hidden="true"
                className="mb-2 h-5 w-5 text-periwinkle"
                strokeWidth={2.2}
              />
              <div>
                <p className="text-[11px] uppercase tracking-[0.14em] text-mist/45">
                  Ahora
                </p>
                <p className="mt-1 text-5xl font-semibold leading-none text-periwinkle">
                  {t.statAfter}
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-1 text-[#fbbc04]">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-4 w-4 fill-current" strokeWidth={1.7} />
              ))}
              <span className="ml-2 text-sm font-semibold text-mist">
                Google Reviews
              </span>
            </div>

            <p className="mt-6 text-sm leading-[1.55] text-mist/70">
              Todavía no hay testimonio del dueño, así que lo mostramos como caso
              real con mejoras concretas visibles en Google y en la web.
            </p>
          </div>

          <div className="mt-8 grid gap-4">
            <WebsiteWidgetPreview onOpen={onOpenWidget} />
            <NotificationWidgetMock />
          </div>
        </div>
      </div>
    </article>
  );
}

function WidgetLightbox({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-midnight/88 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada del widget de reseñas"
    >
      <div
        className="relative w-full max-w-6xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/70"
          aria-label="Cerrar imagen ampliada"
        >
          <X className="h-5 w-5" strokeWidth={2.2} />
        </button>

        <Image
          src="/gains-review-widget.png"
          alt="Captura ampliada del widget de reseñas de Gains"
          width={1600}
          height={900}
          className="h-auto max-h-[85vh] w-full object-contain bg-white"
          unoptimized
        />
      </div>
    </div>
  );
}

type TestimonialsProps = {
  hasTestimonials?: boolean;
  items?: Testimonial[];
};

export function Testimonials({
  hasTestimonials = false,
  items = REAL_TESTIMONIALS,
}: TestimonialsProps) {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);

  return (
    <section
      id="casos"
      className="scroll-mt-20 bg-mist px-6 py-24 text-midnight md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display max-w-3xl text-[32px] font-bold leading-[1.1] tracking-[-0.02em] md:text-[48px]">
          Negocios reales.
          <br />
          Resultados reales.
        </h2>

        {hasTestimonials ? (
          <div className="mt-14 space-y-6">
            {items.map((t) => (
              <CaseStudyCard
                key={`${t.clinic}-${t.location}`}
                t={t}
                onOpenWidget={() => setIsWidgetOpen(true)}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-14 flex max-w-2xl flex-col items-start gap-6 rounded-lg border border-periwinkle/40 bg-white/60 p-10 md:p-12">
            <span className="inline-flex items-center rounded-full bg-periwinkle/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-periwinkle">
              En beta
            </span>
            <h3 className="font-display text-[24px] font-bold leading-[1.15] tracking-[-0.015em] md:text-[32px]">
              Arrancamos con pocos negocios.
              <br />
              Sé de los primeros.
            </h3>
            <p className="text-base leading-[1.55] text-midnight/75 md:text-lg">
              Estamos en fase beta cerrada. Si entrás ahora, tenés acompañamiento
              directo, setup sin costo y precio fundador por 12 meses.
            </p>
            <WhatsAppButton message={WHATSAPP_MESSAGES.testimonials_beta}>
              Quiero ser beta tester
            </WhatsAppButton>
          </div>
        )}
      </div>

      <WidgetLightbox open={isWidgetOpen} onClose={() => setIsWidgetOpen(false)} />
    </section>
  );
}
