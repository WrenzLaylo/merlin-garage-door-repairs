import {
  Cog,
  PackageCheck,
  ShieldCheck,
  Smartphone,
  Volume2,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

const ICONS: Record<string, LucideIcon> = {
  wrench: Wrench,
  volume: Volume2,
  smartphone: Smartphone,
  cog: Cog,
  shield: ShieldCheck,
  package: PackageCheck,
};

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container-x">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">Services</span>
          <h2 className="h-section">Everything your Merlin opener needs.</h2>
          <p className="mt-3 text-muted">
            Repairs, tuning, accessories, safety checks, and new installs, handled by
            technicians who work with Merlin systems every week.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.icon] ?? Wrench;
            return (
              <ScrollReveal key={service.id} delay={index * 0.04}>
                <article className="card group h-full overflow-hidden p-0 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40">
                  {service.image ? (
                    <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
                      <img
                        src={service.image}
                        alt={`${service.title} in Melbourne`}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                        loading={index < 3 ? "eager" : "lazy"}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                      <span className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-2xl border border-white/40 bg-white/85 text-brand-deep shadow-soft backdrop-blur transition-all duration-300 group-hover:bg-white group-hover:scale-110">
                        <Icon size={24} />
                      </span>
                      {service.badge ? (
                        <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-white">
                          {service.badge}
                        </span>
                      ) : null}
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-4">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand-deep transition-all duration-300 group-hover:bg-brand/20 group-hover:scale-110">
                        <Icon size={24} />
                      </span>
                      {service.badge ? (
                        <span className="rounded-full bg-accent-tint px-3 py-1 text-xs font-semibold text-accent">
                          {service.badge}
                        </span>
                      ) : null}
                    </div>
                  )}

                  <div className="p-6">
                    {!service.image ? null : (
                      <span className="mb-4 inline-flex rounded-full border border-brand/20 bg-brand-tint px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand-deep">
                        Merlin service
                      </span>
                    )}
                    <h3 className="font-display text-xl font-semibold text-ink">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted">{service.desc}</p>
                    <ul className="mt-5 grid gap-2 text-sm text-muted">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-brand" /> {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
