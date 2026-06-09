import { MdArrowForward, MdPhone } from "react-icons/md";
import type { NetworkConfig } from "../../hooks/useNetworkConfig";
import { trackCall } from "../../utils/analytics";
import ScrollReveal from "../ui/ScrollReveal";

export default function FinalCTA({ config }: { config: NetworkConfig }) {
  return (
    <section className="section">
      <div className="container-x">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-surface via-surface to-brand-tint shadow-soft">
            <img
              src="/faq-quote-support.webp"
              alt=""
              className="absolute inset-y-0 right-0 hidden h-full w-1/2 object-cover lg:block"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/95 to-surface/55" />
            <div className="relative max-w-2xl p-10 sm:p-14">
              <span className="eyebrow mb-4">Fast, clear, repair-first</span>
              <h2 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
                Garage door playing up?
              </h2>
              <p className="mt-3 text-muted">
                Get a fast, no-obligation quote from Melbourne's Merlin specialists.
                Same-day service and No Fix No Fee.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={`tel:${config.contact.emergency.tel}`}
                  onClick={() => trackCall("emergency")}
                  className="btn-accent text-base"
                >
                  <MdPhone size={18} /> Call {config.contact.emergency.number}
                </a>
                <a href="#contact" className="btn-secondary text-base">
                  Request a quote <MdArrowForward size={18} />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
