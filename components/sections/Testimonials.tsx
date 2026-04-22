import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { cn } from "@/lib/utils";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

type Testimonial = {
  quote: string;
  name: string;
  clinic: string;
  location: string;
  avatarUrl?: string;
};

const PLACEHOLDER_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Pasamos de 12 a 47 reseñas en Google en dos meses. Los pacientes nuevos nos dicen que nos encontraron arriba.",
    name: "Dra. María González",
    clinic: "Sonrisa Dental",
    location: "Montevideo",
  },
  {
    quote:
      "Antes le pedía reseñas a mis pacientes y me daba vergüenza. Ahora Flikker lo hace por mí y quedamos todos contentos.",
    name: "Dr. Federico Silva",
    clinic: "Centro Estética Pocitos",
    location: "Montevideo",
  },
  {
    quote:
      "La reactivación nos trajo de vuelta 8 pacientes el primer mes. Se pagó solo.",
    name: "Lic. Camila Rodríguez",
    clinic: "Estudio Dermo",
    location: "Punta del Este",
  },
];

function Initials({ name, className }: { name: string; className?: string }) {
  const initials = name
    .replace(/(Dra?|Lic|Sr[a]?)\.?/gi, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex items-center justify-center rounded-full bg-periwinkle/15 text-periwinkle font-bold",
        className
      )}
    >
      {initials}
    </span>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="flex h-full min-w-[300px] snap-start flex-col rounded-lg border border-midnight/10 bg-white/60 p-7 md:min-w-0">
      <p className="text-base leading-[1.55] italic text-midnight/85 md:text-lg">
        “{t.quote}”
      </p>
      <div className="mt-6 flex items-center gap-3 pt-6 border-t border-midnight/10">
        <Initials name={t.name} className="h-11 w-11 text-sm" />
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-midnight">{t.name}</p>
          <p className="truncate text-xs text-midnight/60">
            {t.clinic} · {t.location}
          </p>
        </div>
      </div>
    </article>
  );
}

type TestimonialsProps = {
  hasTestimonials?: boolean;
  items?: Testimonial[];
};

export function Testimonials({
  hasTestimonials = false,
  items = PLACEHOLDER_TESTIMONIALS,
}: TestimonialsProps) {
  return (
    <section
      id="casos"
      className="scroll-mt-20 bg-mist px-6 py-24 text-midnight md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display max-w-3xl text-[32px] leading-[1.1] tracking-[-0.02em] font-extrabold md:text-[48px]">
          Clínicas reales. Números reales.
        </h2>

        {hasTestimonials ? (
          <>
            <div className="mt-14 hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
              {items.map((t) => (
                <TestimonialCard key={t.name} t={t} />
              ))}
            </div>
            <div className="mt-10 -mx-6 flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory md:hidden">
              {items.map((t) => (
                <TestimonialCard key={t.name} t={t} />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-14 mx-auto flex max-w-2xl flex-col items-start gap-6 rounded-lg border border-periwinkle/40 bg-white/60 p-10 md:p-12">
            <span className="inline-flex items-center rounded-full bg-periwinkle/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-periwinkle">
              En beta
            </span>
            <h3 className="font-display text-[24px] font-extrabold leading-[1.15] tracking-[-0.015em] md:text-[32px]">
              Arrancamos con 3 clínicas. Sé de los primeros.
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
    </section>
  );
}
