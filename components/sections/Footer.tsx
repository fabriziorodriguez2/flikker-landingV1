import { Mail, MessageCircle } from "lucide-react";

import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS, WHATSAPP_NUMBER, buildWhatsAppUrl } from "@/lib/constants";

const CONTACT_EMAIL = "fabrizio.rodriguez7274@gmail.com";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2 3.77-2 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9V9Z" />
    </svg>
  );
}

function formatWhatsApp(number: string) {
  const clean = number.replace(/[^0-9]/g, "");
  if (clean.startsWith("598") && clean.length >= 11) {
    return `+598 ${clean.slice(3, 5)} ${clean.slice(5, 8)} ${clean.slice(8)}`;
  }
  return `+${clean}`;
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-mist px-6 pb-10 pt-20 text-midnight md:px-8">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-4 md:gap-10">
        <div className="md:col-span-1">
          <Logo variant="default" className="h-8 w-auto" />
          <p className="mt-5 max-w-[18ch] text-sm leading-[1.5] text-midnight/70">
            Más reseñas. Menos trabajo.
          </p>
        </div>

        <nav aria-label="Navegación del pie">
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-midnight/50">
            Producto
          </h3>
          <ul className="mt-4 space-y-3">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-sm text-midnight/80 transition-colors hover:text-periwinkle"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-midnight/50">
            Contacto
          </h3>
          <ul className="mt-4 space-y-3">
            <li>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 text-sm text-midnight/80 transition-colors hover:text-periwinkle"
              >
                <Mail aria-hidden="true" className="size-4 text-periwinkle" />
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a
                href={buildWhatsAppUrl("Hola! Tengo una consulta sobre Flikker.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-midnight/80 transition-colors hover:text-periwinkle"
              >
                <MessageCircle
                  aria-hidden="true"
                  className="size-4 text-periwinkle"
                />
                {formatWhatsApp(WHATSAPP_NUMBER)}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-midnight/50">
            Más
          </h3>
          <ul className="mt-4 space-y-3">
            <li className="-ml-2 flex items-center gap-1">
              <a
                href="https://instagram.com/flikker.uy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Flikker"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-midnight/70 transition-colors hover:text-periwinkle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-periwinkle focus-visible:ring-offset-2 focus-visible:ring-offset-mist"
              >
                <InstagramIcon className="size-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/flikker-uy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Flikker"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-midnight/70 transition-colors hover:text-periwinkle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-periwinkle focus-visible:ring-offset-2 focus-visible:ring-offset-mist"
              >
                <LinkedinIcon className="size-5" />
              </a>
            </li>
            <li>
              <a
                href="/legal/privacidad"
                className="text-sm text-midnight/80 transition-colors hover:text-periwinkle"
              >
                Privacidad
              </a>
            </li>
            <li>
              <a
                href="/legal/terminos"
                className="text-sm text-midnight/80 transition-colors hover:text-periwinkle"
              >
                Términos
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col items-start justify-between gap-3 border-t border-midnight/10 pt-6 text-xs text-midnight/55 md:flex-row md:items-center">
        <p>© {year} Flikker. Todos los derechos reservados.</p>
        <p>Hecho en Uruguay.</p>
      </div>
    </footer>
  );
}
