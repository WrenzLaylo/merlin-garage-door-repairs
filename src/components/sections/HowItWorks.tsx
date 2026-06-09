import { STEPS } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section bg-canvas">
      <div className="container-x">
        <ScrollReveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4">How it works</span>
          <h2 className="h-section">Fast, clear, and repair-first.</h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <ScrollReveal key={step.num} delay={index * 0.06}>
              <article className="card-hover group h-full">
                <span className="font-display text-5xl font-bold text-brand/40 transition-colors duration-300 group-hover:text-brand">{step.num}</span>
                <h3 className="mt-8 font-display text-xl font-semibold text-ink">{step.title}</h3>
                <p className="mt-3 text-sm text-muted">{step.desc}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
