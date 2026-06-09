import { BRANDS } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

export default function Brands() {
  return (
    <section className="py-10">
      <div className="container-x">
        <ScrollReveal>
          <p className="text-center text-sm uppercase tracking-widest text-slate-500">
            Merlin models we service
          </p>
        </ScrollReveal>
        <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {BRANDS.map((brand, index) => (
            <ScrollReveal key={brand.name} delay={index * 0.03}>
              <div className="rounded-2xl border border-line bg-surface p-4 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-brand-tint">
                <p className="font-display font-semibold text-ink">{brand.name}</p>
                <p className="mt-1 text-xs text-slate-500">{brand.subtitle}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
