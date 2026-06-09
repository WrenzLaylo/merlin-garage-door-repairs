import { MdLocationOn } from "react-icons/md";
import type { NetworkConfig } from "../../hooks/useNetworkConfig";
import ScrollReveal from "../ui/ScrollReveal";

export default function ServiceAreas({ config }: { config: NetworkConfig }) {
  return (
    <section id="service-areas" className="section bg-surface">
      <div className="container-x">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">
            <MdLocationOn size={14} /> Where we work
          </span>
          <h2 className="h-section">Servicing Greater Melbourne.</h2>
          <p className="mt-3 text-muted">
            Same-day Merlin opener service across {config.serviceAreas.regions.length} regions
            and {config.serviceAreas.suburbs.length}+ suburbs.
          </p>
        </ScrollReveal>
        <ScrollReveal className="mt-10">
          <div className="flex flex-wrap justify-center gap-2.5">
            {config.serviceAreas.suburbs.map((suburb) => (
              <span
                key={suburb}
                className="rounded-full border border-line bg-canvas px-3.5 py-1.5 text-sm text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand-tint hover:text-brand-deep"
              >
                {suburb}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
