import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

export function CTAFinal() {
  return (
    <section className="bg-midnight px-6 py-32 text-mist md:px-8 md:py-40 lg:py-48">
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-periwinkle">
          ¿Empezamos?
        </span>

        <h2 className="font-display mt-6 text-[40px] font-extrabold leading-[1.02] tracking-[-0.03em] md:text-[72px] lg:text-[88px]">
          Tu próximo paciente ya te{" "}
          <span className="text-periwinkle">está googleando.</span>
        </h2>

        <p className="mt-8 max-w-xl text-lg leading-[1.55] text-mist/75 md:text-xl">
          Hablemos 15 minutos. Te mostramos el dashboard, te damos un número
          para tu clínica. Sin compromiso, sin sales pitch.
        </p>

        <div className="mt-12">
          <WhatsAppButton
            size="xl"
            message={WHATSAPP_MESSAGES.ctaFinal}
            className="px-10 py-6 text-xl md:px-14 md:py-7 md:text-2xl"
          >
            Hablemos por WhatsApp
          </WhatsAppButton>
        </div>

        <p className="mt-6 text-sm text-mist/55">
          Te escribe el fundador. En persona. Sin bots.
        </p>
      </div>
    </section>
  );
}
