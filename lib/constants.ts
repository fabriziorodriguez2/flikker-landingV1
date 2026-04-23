/**
 * Flikker landing — constantes compartidas.
 *
 * Reemplazá WHATSAPP_NUMBER con el número real antes de publicar.
 * Formato E.164 sin el "+" (es lo que wa.me espera).
 */

export const WHATSAPP_NUMBER = "59891624988"; // placeholder Uruguay +598 99 000 000

type WhatsAppMessageKey =
  | "nav"
  | "hero"
  | "calculator"
  | "pricing_starter"
  | "pricing_pro"
  | "pricing_business"
  | "testimonials_beta"
  | "ctaFinal"
  | "floating";

export const WHATSAPP_MESSAGES: Record<WhatsAppMessageKey, string> = {
  nav: "Hola! Quiero saber más de Flikker para mi clínica.",
  hero: "Hola! Vi la landing de Flikker y quiero más reseñas en Google para mi clínica.",
  calculator:
    "Hola! Calculé el impacto en la landing y quiero estos números para mi clínica.",
  pricing_starter: "Hola! Me interesa el plan Starter de Flikker.",
  pricing_pro: "Hola! Me interesa el plan Pro de Flikker.",
  pricing_business: "Hola! Me interesa el plan Business de Flikker.",
  testimonials_beta:
    "Hola! Quiero ser de las primeras clínicas en probar Flikker en beta.",
  ctaFinal: "Hola! Hablemos 15 minutos sobre reseñas para mi clínica.",
  floating: "Hola! Me quedé con dudas mirando Flikker, ¿podemos hablar?",
};

/**
 * Construye el link wa.me para un mensaje pre-escrito.
 * El número se envía sin "+" y el texto va URI-encoded.
 */
export function buildWhatsAppUrl(message: string, number = WHATSAPP_NUMBER) {
  const cleanNumber = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Fórmulas de la calculadora de impacto (brief sección 07).
 * Funciones puras — fácil de ajustar si cambian las tasas.
 */
export const CALCULATOR_FORMULAS = {
  /** Pacientes × 2 contactos × 15% conversión en 60 días. */
  reviewsIn60Days: (patientsPerMonth: number) =>
    Math.round(patientsPerMonth * 2 * 0.15),

  /** 8% de los pacientes del mes vuelven al reactivarlos. */
  reactivated: (patientsPerMonth: number) =>
    Math.round(patientsPerMonth * 0.08),

  /** Rango default del slider de la calculadora. */
  slider: {
    min: 20,
    max: 1000,
    step: 10,
    default: 150,
  },
} as const;

/**
 * Enlaces de navegación del navbar y footer.
 * href apunta a los ids de las secciones del landing.
 */
export const NAV_LINKS = [
  { label: "Cómo funciona", href: "#solucion" },
  { label: "Precios", href: "#precios" },
  { label: "Casos", href: "#casos" },
  { label: "FAQ", href: "#faq" },
] as const;