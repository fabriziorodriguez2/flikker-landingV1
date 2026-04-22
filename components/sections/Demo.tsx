export function Demo() {
  return (
    <section className="bg-mist px-6 py-24 text-midnight md:px-8 md:py-32">
      <div className="mx-auto max-w-5xl">
        <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-periwinkle">
          Demo en vivo
        </span>
        <h2 className="font-display mt-4 max-w-3xl text-[32px] font-extrabold leading-[1.1] tracking-[-0.02em] md:text-[48px]">
          Así se ve una conversación real.
        </h2>

        <div className="mt-12 flex items-center justify-center rounded-2xl border-2 border-dashed border-periwinkle/40 bg-white/40 px-8 py-20 text-center">
          <p className="max-w-md text-sm text-midnight/60">
            Placeholder — el demo interactivo (chat + dashboard) llega en el
            próximo prompt.
          </p>
        </div>
      </div>
    </section>
  );
}
