import { Award, Clock, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import { WHY_US } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

const ICONS: Record<string, LucideIcon> = {
  award: Award,
  parts: Wrench,
  clock: Clock,
  shield: ShieldCheck,
};

export default function WhyUs() {
  return (
    <section className="section">
      <div className="container-x">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">Why choose us</span>
          <h2 className="h-section">Melbourne's Merlin specialists.</h2>
        </ScrollReveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_US.map((item, index) => {
            const Icon = ICONS[item.icon] ?? Award;
            return (
              <ScrollReveal key={item.title} delay={index * 0.05}>
                <div className="card h-full text-center">
                  <span className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-teal/10 text-teal-light">
                    <Icon size={26} />
                  </span>
                  <h3 className="font-display font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-400">{item.desc}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
