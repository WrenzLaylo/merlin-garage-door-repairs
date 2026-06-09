import { useState } from "react";
import { ArrowRight, ChevronDown, ClipboardCheck, HelpCircle } from "lucide-react";
import { FAQ as FAQ_ITEMS } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div>
            <ScrollReveal>
              <span className="eyebrow mb-4">FAQ</span>
              <h2 className="h-section">Common questions.</h2>
              <p className="mt-3 max-w-2xl text-muted">
                Not sure if it is a remote, safety beam, gear, belt, or motor fault?
                These are the questions we hear most before a quote request.
              </p>
            </ScrollReveal>

            <div className="mt-10 space-y-3">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = open === index;
                return (
                  <ScrollReveal key={item.q} delay={index * 0.03}>
                    <div className="card p-0 hover:-translate-y-0.5">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors duration-200 hover:bg-brand-tint/60"
                        aria-expanded={isOpen}
                      >
                        <span className="font-display font-semibold text-ink">{item.q}</span>
                        <ChevronDown
                          size={20}
                          className={`shrink-0 text-brand transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <div
                        className={`grid overflow-hidden px-5 transition-all duration-300 ${
                          isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                        }`}
                      >
                        <p className="overflow-hidden text-sm text-muted">{item.a}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          <ScrollReveal delay={0.1} className="lg:sticky lg:top-24 lg:self-start">
            <aside className="card overflow-hidden p-0">
              <div className="relative aspect-[4/3]">
                <img
                  src="/faq-quote-support.webp"
                  alt="Merlin garage door quote support desk"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <span className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-2xl bg-brand text-white shadow-soft">
                  <HelpCircle size={24} />
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold text-ink">
                  Still unsure what to book?
                </h3>
                <p className="mt-3 text-sm text-muted">
                  Send a photo and a short description. We will route it to the right
                  Merlin repair technician before the visit.
                </p>
                <div className="mt-5 rounded-2xl border border-brand/20 bg-brand-tint p-4 text-sm text-muted">
                  <div className="flex gap-3">
                    <ClipboardCheck className="mt-0.5 shrink-0 text-brand-deep" size={18} />
                    <span>Photos, model numbers, and symptoms help us quote faster.</span>
                  </div>
                </div>
                <a href="#contact" className="btn-primary mt-6 w-full justify-center">
                  Request a quote <ArrowRight size={18} />
                </a>
              </div>
            </aside>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
