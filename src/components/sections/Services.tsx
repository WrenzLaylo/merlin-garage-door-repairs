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
          <p className="mt-3 text-slate-400">
            Repairs, tuning, accessories, safety checks, and new installs, handled by
            technicians who work with Merlin systems every week.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.icon] ?? Wrench;
            return (
              <ScrollReveal key={service.id} delay={index * 0.04}>
                <article className="card h-full hover:border-teal/40">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal/10 text-teal-light">
                      <Icon size={24} />
                    </span>
                    {service.badge ? (
                      <span className="rounded-full bg-flame/15 px-3 py-1 text-xs font-semibold text-flame">
                        {service.badge}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm text-slate-400">{service.desc}</p>
                  <ul className="mt-5 grid gap-2 text-sm text-slate-300">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-teal" /> {feature}
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
