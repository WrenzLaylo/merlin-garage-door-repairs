import type { NetworkConfig } from "../../hooks/useNetworkConfig";
import AnimatedCounter from "../ui/AnimatedCounter";
import ScrollReveal from "../ui/ScrollReveal";

export default function StatsBar({ config }: { config: NetworkConfig }) {
  return (
    <section className="border-y border-ink-line bg-ink-soft/40 py-8">
      <div className="container-x grid gap-5 sm:grid-cols-4">
        {[
          { label: "Years experience", value: config.stats.years, suffix: "+" },
          { label: "Melbourne reviews", value: config.stats.reviews, suffix: "+" },
          { label: "Average rating", value: config.stats.rating, suffix: "/5", decimals: 1 },
          { label: "Warranty months", value: config.stats.warrantyMonths, suffix: "" },
        ].map((stat, index) => (
          <ScrollReveal key={stat.label} delay={index * 0.04}>
            <div className="text-center">
              <p className="font-display text-3xl font-bold text-white">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals ?? 0} />
              </p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
