import { BadgeDollarSign, ShieldCheck } from "lucide-react";
import { PROMISES } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

export default function PricingCallout() {
  return (
    <section className="section">
      <div className="container-x">
        <ScrollReveal>
          <div className="grid overflow-hidden rounded-3xl border border-ink-line bg-gradient-to-br from-ink-soft via-ink-soft to-teal-dark/20 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="border-b border-ink-line p-8 lg:border-b-0 lg:border-r lg:p-10">
              <span className="eyebrow mb-4">
                <BadgeDollarSign size={14} /> No Fix No Fee
              </span>
              <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
                You get a clear quote before the repair.
              </h2>
            </div>
            <div className="grid gap-5 p-8 sm:grid-cols-2 lg:p-10">
              <div className="rounded-2xl border border-ink-line bg-ink/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:bg-ink/70">
                <ShieldCheck className="text-teal-light" />
                <h3 className="mt-4 font-display font-semibold text-white">Repair-first diagnosis</h3>
                <p className="mt-2 text-sm text-slate-400">
                  If repair makes sense, we fix it. If replacement is better value, we tell you.
                </p>
              </div>
              <div className="rounded-2xl border border-ink-line bg-ink/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-teal/30 hover:bg-ink/70">
                <ShieldCheck className="text-teal-light" />
                <h3 className="mt-4 font-display font-semibold text-white">
                  {PROMISES.warrantyMonths}-month workmanship warranty
                </h3>
                <p className="mt-2 text-sm text-slate-400">
                  Genuine Merlin parts and workmanship covered after the job.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
