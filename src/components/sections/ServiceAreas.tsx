import { MapPin } from "lucide-react";
import type { NetworkConfig } from "../../hooks/useNetworkConfig";
import ScrollReveal from "../ui/ScrollReveal";

export default function ServiceAreas({ config }: { config: NetworkConfig }) {
  return (
    <section id="service-areas" className="section bg-ink-soft/40">
      <div className="container-x">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">
            <MapPin size={14} /> Where we work
          </span>
          <h2 className="h-section">Servicing Greater Melbourne.</h2>
          <p className="mt-3 text-slate-400">
            Same-day Merlin opener service across {config.serviceAreas.regions.length} regions
            and {config.serviceAreas.suburbs.length}+ suburbs.
          </p>
        </ScrollReveal>
        <ScrollReveal className="mt-10">
          <div className="flex flex-wrap justify-center gap-2.5">
            {config.serviceAreas.suburbs.map((suburb) => (
              <span
                key={suburb}
                className="rounded-full border border-ink-line bg-ink px-3.5 py-1.5 text-sm text-slate-300 transition-colors hover:border-teal/40 hover:text-teal-light"
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
