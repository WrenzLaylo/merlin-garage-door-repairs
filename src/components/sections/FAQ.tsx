import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ as FAQ_ITEMS } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <div className="container-x max-w-3xl">
        <ScrollReveal className="text-center">
          <span className="eyebrow mb-4">FAQ</span>
          <h2 className="h-section">Common questions.</h2>
        </ScrollReveal>
        <div className="mt-10 space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = open === index;
            return (
              <ScrollReveal key={item.q} delay={index * 0.03}>
                <div className="card p-0">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display font-semibold text-white">{item.q}</span>
                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-teal transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`grid overflow-hidden px-5 transition-all duration-300 ${
                      isOpen ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
                    }`}
                  >
                    <p className="overflow-hidden text-sm text-slate-400">{item.a}</p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
