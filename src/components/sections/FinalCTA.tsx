import { ArrowRight, Phone } from "lucide-react";
import type { NetworkConfig } from "../../hooks/useNetworkConfig";
import { trackCall } from "../../utils/analytics";
import ScrollReveal from "../ui/ScrollReveal";

export default function FinalCTA({ config }: { config: NetworkConfig }) {
  return (
    <section className="section">
      <div className="container-x">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-ink-line bg-gradient-to-br from-teal-dark/30 via-ink-soft to-ink p-10 text-center sm:p-14">
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
              Garage door playing up?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-slate-300">
              Get a fast, no-obligation quote from Melbourne's Merlin specialists.
              Same-day service and No Fix No Fee.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
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
        </ScrollReveal>
      </div>
    </section>
  );
}
