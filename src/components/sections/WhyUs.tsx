import { MdEmojiEvents, MdOutlineAccessTime, MdVerifiedUser, MdBuild } from "react-icons/md";
import type { IconType } from "react-icons";
import { WHY_US } from "../../constants";
import ScrollReveal from "../ui/ScrollReveal";

const ICONS: Record<string, IconType> = {
  award: MdEmojiEvents,
  parts: MdBuild,
  clock: MdOutlineAccessTime,
  shield: MdVerifiedUser,
};

export default function WhyUs() {
  return (
    <section className="section">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <ScrollReveal>
            <span className="eyebrow mb-4">Why choose us</span>
            <h2 className="h-section">Melbourne's <span className="text-brand">Merlin</span> specialists.</h2>
            <p className="mt-4 max-w-xl text-muted">
              We focus on repair-first diagnosis, correct Merlin-compatible parts,
              and opener settings that keep the door safe after the technician leaves.
            </p>

            <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-surface shadow-soft">
              <div className="relative aspect-[4/3]">
                <img
                  src="/why-merlin-specialists.webp"
                  alt="Technician servicing a Merlin-style garage door opener"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <span className="rounded-2xl border border-white/20 bg-white/15 px-4 py-3 text-sm font-semibold text-white backdrop-blur">
                      Merlin-focused diagnostics
                    </span>
                    <span className="rounded-2xl border border-accent/40 bg-accent/30 px-4 py-3 text-sm font-semibold text-white backdrop-blur">
                      Repair-first advice
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {WHY_US.map((item, index) => {
              const Icon = ICONS[item.icon] ?? MdEmojiEvents;
              return (
                <ScrollReveal key={item.title} delay={index * 0.05}>
                  <div className="card-hover group h-full">
                    <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand/10 text-brand-deep transition-all duration-300 group-hover:bg-brand/20 group-hover:scale-110">
                      <Icon size={26} />
                    </span>
                    <h3 className="font-display font-semibold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted">{item.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
