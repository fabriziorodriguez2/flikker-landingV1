"use client";

import { useEffect, useState, type AnchorHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { WHATSAPP_MESSAGES, buildWhatsAppUrl } from "@/lib/constants";
import { plausibleClass } from "@/lib/analytics";

/**
 * Ícono de WhatsApp inline — Lucide no incluye brand icons.
 * Path del logo oficial, optimizado para 24x24.
 */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      className={cn("h-5 w-5", className)}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.05 4.91A10 10 0 0 0 12 2a10 10 0 0 0-8.52 15.21L2 22l4.91-1.45A10 10 0 0 0 22 12a10 10 0 0 0-2.95-7.09ZM12 20.17a8.19 8.19 0 0 1-4.19-1.14l-.3-.18-3.1.92.93-3.02-.2-.31A8.2 8.2 0 1 1 12 20.17Zm4.7-6.15c-.26-.13-1.52-.75-1.75-.83-.23-.09-.4-.13-.57.13-.17.26-.66.83-.8 1-.15.17-.29.19-.54.06-.26-.13-1.09-.4-2.07-1.28a7.78 7.78 0 0 1-1.43-1.78c-.15-.26 0-.4.12-.53.12-.12.26-.32.39-.47.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.07-.13-.57-1.37-.78-1.87-.2-.5-.41-.43-.57-.43-.15 0-.32-.02-.49-.02-.17 0-.45.06-.68.32-.23.26-.89.87-.89 2.12 0 1.25.91 2.46 1.04 2.63.13.17 1.79 2.74 4.35 3.84.61.26 1.08.42 1.45.54.61.2 1.16.17 1.6.1.49-.07 1.52-.62 1.73-1.22.21-.6.21-1.11.15-1.22-.07-.11-.24-.17-.5-.3Z" />
    </svg>
  );
}

const whatsappButton = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-whatsapp focus-visible:ring-offset-mist disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-whatsapp text-white rounded-full px-6 py-3.5 text-base shadow-sm hover:bg-whatsapp-hover hover:shadow-md hover:scale-[1.02] active:scale-100",
        secondary:
          "border-2 border-whatsapp text-whatsapp bg-transparent rounded-full px-6 py-3 text-base hover:bg-whatsapp hover:text-white",
        nav: "bg-whatsapp text-white rounded-full px-4 py-2 text-sm min-h-[40px] hover:bg-whatsapp-hover",
        floating:
          "fixed bottom-6 right-6 z-50 md:hidden bg-whatsapp text-white rounded-full w-14 h-14 shadow-lg hover:bg-whatsapp-hover hover:shadow-xl active:scale-95",
      },
      size: {
        default: "",
        xl: "px-8 py-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

type WhatsAppButtonProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children"
> &
  VariantProps<typeof whatsappButton> & {
    /** Texto pre-escrito que se abre en el chat. */
    message?: string;
    /** Label del botón. Omitir para variant="floating" (ícono solo). */
    children?: React.ReactNode;
    /** aria-label custom. Si no, usa children o un fallback descriptivo. */
    label?: string;
  };

export function WhatsAppButton({
  variant = "primary",
  size,
  message = WHATSAPP_MESSAGES.hero,
  children,
  label,
  className,
  ...rest
}: WhatsAppButtonProps) {
  const href = buildWhatsAppUrl(message);
  const isFloating = variant === "floating";
  const accessibleLabel =
    label ??
    (typeof children === "string" ? children : undefined) ??
    "Hablar por WhatsApp";

  const visible = useFloatingVisibility(isFloating);

  const floatingVisibilityClasses = isFloating
    ? cn(
        "transition-opacity duration-200",
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      )
    : "";

  const analyticsClass = plausibleClass("WhatsApp Click", {
    variant: variant ?? "primary",
  });

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={accessibleLabel}
      aria-hidden={isFloating && !visible ? true : undefined}
      tabIndex={isFloating && !visible ? -1 : undefined}
      className={cn(
        whatsappButton({ variant, size }),
        floatingVisibilityClasses,
        analyticsClass,
        className
      )}
      {...rest}
    >
      <WhatsAppIcon className={iconSizeFor(variant, size)} />
      {!isFloating && children && <span>{children}</span>}
    </a>
  );
}

function iconSizeFor(
  variant: WhatsAppButtonProps["variant"],
  size: WhatsAppButtonProps["size"]
) {
  if (variant === "floating") return "h-7 w-7";
  if (size === "xl") return "h-6 w-6";
  return undefined;
}

/**
 * Solo aplica al variant="floating": aparece después de 200px de scroll.
 * Retorna true siempre para los otros variants (no gating).
 */
function useFloatingVisibility(enabled: boolean) {
  const [visible, setVisible] = useState(!enabled);

  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled]);

  return visible;
}
