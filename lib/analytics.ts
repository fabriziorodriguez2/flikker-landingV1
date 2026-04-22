type PlausibleProps = Record<string, string | number | boolean>;

type PlausibleFn = (
  event: string,
  options?: { props?: PlausibleProps; callback?: () => void }
) => void;

declare global {
  interface Window {
    plausible?: PlausibleFn & { q?: unknown[] };
  }
}

/**
 * Dispara un evento custom a Plausible.
 * Seguro de llamar en SSR o si el script todavía no cargó:
 * cuando el script no existe, Plausible no hace nada.
 */
export function trackEvent(event: string, props?: PlausibleProps) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
}

/**
 * Helpers para construir las clases que detecta el script
 * `script.tagged-events.js` — elementos con class `plausible-event-name=*`
 * se trackean automáticamente al clickearlos.
 * Los espacios en nombres/props se escriben como `+`.
 */
export function plausibleClass(
  eventName: string,
  props?: Record<string, string>
) {
  const encode = (s: string) => s.replace(/\s+/g, "+");
  const classes = [`plausible-event-name=${encode(eventName)}`];
  if (props) {
    for (const [k, v] of Object.entries(props)) {
      classes.push(`plausible-event-${k}=${encode(v)}`);
    }
  }
  return classes.join(" ");
}
