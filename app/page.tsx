import { CTAFinal } from "@/components/sections/CTAFinal";
import { Demo } from "@/components/sections/Demo";
import { FAQ } from "@/components/sections/FAQ";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { ImpactCalculator } from "@/components/sections/ImpactCalculator";
import { Navbar } from "@/components/sections/Navbar";
import { Pricing } from "@/components/sections/Pricing";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Testimonials } from "@/components/sections/Testimonials";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Problem />
        <Solution />
        <Demo />
        <ImpactCalculator />
        <Features />
        <Testimonials hasTestimonials={false} />
        <Pricing />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />

      <WhatsAppButton
        variant="floating"
        message={WHATSAPP_MESSAGES.floating}
        label="Hablar por WhatsApp"
      />
    </>
  );
}
