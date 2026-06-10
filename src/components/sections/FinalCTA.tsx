import { MdArrowForward, MdPhone } from "react-icons/md";
import type { NetworkConfig } from "../../hooks/useNetworkConfig";
import { trackCall } from "../../utils/analytics";
import ScrollReveal from "../ui/ScrollReveal";

export default function FinalCTA({ config }: { config: NetworkConfig }) {
  return (
    <section className="section">
      <div className="container-x">
        <ScrollReveal>
          <div className="grid overflow-hidden rounded-3xl border border-line bg-surface shadow-soft lg:grid-cols-2">
            <div className="order-2 p-10 sm:p-14 lg:order-1">
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
            <div className="relative order-1 min-h-[240px] lg:order-2 lg:min-h-full">
              <img
                src="/faq-quote-support.webp"
                alt="Merlin technician giving a homeowner an on-the-spot quote"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-20 bg-gradient-to-r from-surface to-transparent lg:block" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
