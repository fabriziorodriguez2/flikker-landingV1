import { ArrowDown } from "lucide-react";

import { PhoneMockupAnimated } from "@/components/ui/PhoneMockupAnimated";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-midnight text-mist"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 pb-24 pt-28 md:px-8 md:pb-32 md:pt-32 lg:grid-cols-5 lg:gap-20 lg:pb-40 lg:pt-40">
        <div className="lg:col-span-3">
          <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-periwinkle">
            Flikker · Para negocios y marcas locales
          </span>

          <h1 className="font-display mt-6 text-[44px] font-bold leading-[1.05] tracking-[-0.03em] md:text-[64px] lg:text-[72px]">
            Tenés clientes felices.
            <br />
            <span className="text-periwinkle">
              Google no lo está mostrando.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-[1.55] text-mist/80 md:text-xl">
            Flikker pide reseñas por WhatsApp después de cada compra, visita o
            servicio. Las buenas llegan a Google. Las malas te avisan primero a
            vos.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
            <WhatsAppButton size="xl" message={WHATSAPP_MESSAGES.hero}>
              Hablar por WhatsApp
            </WhatsAppButton>

            <a
              href="#solucion"
              className="group inline-flex items-center gap-2 rounded-sm text-base font-semibold text-mist/90 transition-colors hover:text-periwinkle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-periwinkle focus-visible:ring-offset-2 focus-visible:ring-offset-midnight"
            >
              Ver cómo funciona
              <ArrowDown
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
              />
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="mx-auto w-full max-w-[320px] md:max-w-[360px]">
            <PhoneMockupAnimated />
          </div>
        </div>
      </div>
    </section>
  );
}
