"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trackEvent } from "@/lib/analytics";

const faqs: { q: string; a: string }[] = [
  {
    q: "¿Cómo sabe Flikker cuándo mandar el mensaje?",
    a: "Conectamos Flikker a tu agenda o te damos un panel simple para marcar los turnos terminados. El mensaje se envía unas horas después, cuando el paciente ya está tranquilo en su casa.",
  },
  {
    q: "¿Y si un paciente me deja una reseña mala?",
    a: "Ese es el punto clave. Flikker filtra: si la experiencia fue buena, llevamos al paciente a Google. Si fue mala, te llega a vos primero en privado para que puedas resolverlo antes de que se vuelva público.",
  },
  {
    q: "¿Necesito tener web o perfil de Instagram?",
    a: "No. Solo necesitás tu Ficha de Google Business (la que aparece en Maps). Si todavía no la tenés, te ayudamos a crearla durante el setup.",
  },
  {
    q: "¿Es legal pedir reseñas por WhatsApp?",
    a: "Sí. Siempre que el paciente haya dado su número para contacto (lo cual es estándar en una consulta), podés escribirle. Flikker además suma un opt-out visible en cada mensaje.",
  },
  {
    q: "¿Qué pasa con los datos de mis pacientes?",
    a: "Están en servidores seguros, cifrados, y nunca se comparten con terceros. Cumplimos con la Ley 18.331 de Protección de Datos Personales de Uruguay.",
  },
  {
    q: "¿Cuánto tarda en configurarse?",
    a: "Entre 24 y 48 horas. Vos nos pasás el número de WhatsApp Business, la ficha de Google y una lista inicial de pacientes. El resto lo hacemos nosotros.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí. No hay contratos mínimos ni cláusulas raras. Si querés pausar o cancelar, mandás un WhatsApp y listo.",
  },
];

export function FAQ() {
  const handleOpenChange = (value: string) => {
    if (!value) return;
    const idx = Number(value.replace("faq-", ""));
    const question = faqs[idx]?.q;
    if (question) trackEvent("FAQ Open", { question });
  };

  return (
    <section
      id="faq"
      className="scroll-mt-20 bg-mist px-6 py-24 text-midnight md:px-8 md:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[48px]">
          Dudas comunes.
        </h2>

        <Accordion
          type="single"
          collapsible
          defaultValue="faq-0"
          onValueChange={handleOpenChange}
          className="mt-12 w-full"
        >
          {faqs.map((item, i) => (
            <AccordionItem key={item.q} value={`faq-${i}`}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
