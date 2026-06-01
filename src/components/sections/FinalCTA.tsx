import { ArrowRight, Phone } from "lucide-react";
import type { NetworkConfig } from "../../hooks/useNetworkConfig";
import { trackCall } from "../../utils/analytics";
import ScrollReveal from "../ui/ScrollReveal";

export default function FinalCTA({ config }: { config: NetworkConfig }) {
  return (
    <section className="section">
      <div className="container-x">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-ink-line bg-ink-soft shadow-soft">
            <img
              src="/faq-quote-support.webp"
              alt=""
              className="absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover opacity-45 lg:block"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink-soft/95 to-ink/65" />
            <div className="relative max-w-2xl p-10 sm:p-14">
              <span className="eyebrow mb-4">Fast, clear, repair-first</span>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                Garage door playing up?
              </h2>
              <p className="mt-3 text-slate-300">
                Get a fast, no-obligation quote from Melbourne's Merlin specialists.
                Same-day service and No Fix No Fee.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={`tel:${config.contact.emergency.tel}`}
                  onClick={() => trackCall("emergency")}
                  className="btn-primary text-base"
                >
                  <Phone size={18} /> Call {config.contact.emergency.number}
                </a>
                <a href="#contact" className="btn-secondary text-base">
                  Request a quote <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
