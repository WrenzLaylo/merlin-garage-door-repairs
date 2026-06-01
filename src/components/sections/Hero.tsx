import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import type { NetworkConfig } from "../../hooks/useNetworkConfig";
import { trackCall } from "../../utils/analytics";

export default function Hero({ config }: { config: NetworkConfig }) {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 650], [0, 110]);
  const panelY = useTransform(scrollY, [0, 650], [0, -45]);
  const panelRotate = useTransform(scrollY, [0, 650], [0, -1.5]);

  return (
    <section id="top" className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-20 bg-[url('/hero-bg.jpg')] bg-cover bg-center"
        style={{ y: imageY, scale: 1.08 }}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-ink via-ink/90 to-ink/55" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      <div className="container-x grid min-h-[calc(100vh-5rem)] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.75fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            <Star size={14} className="fill-teal-light text-teal-light" />
            {config.stats.rating}/5 from {config.stats.reviews}+ reviews
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[0.95] text-white sm:text-6xl lg:text-7xl"
          >
            Merlin garage door <span className="text-teal-light">repairs</span> in Melbourne.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
          >
            Same-day repairs, servicing, myQ setup, remote pairing, and new motor
            installs for Merlin openers. No Fix No Fee, backed by AGG Doors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href={`tel:${config.contact.emergency.tel}`}
              onClick={() => trackCall("emergency")}
              className="btn-primary text-base"
            >
              <Phone size={18} /> Call {config.contact.emergency.number}
            </a>
            <a href="#contact" className="btn-secondary text-base">
              Request free quote <ArrowRight size={18} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.34 }}
            className="mt-8 grid gap-3 text-sm text-slate-300 sm:grid-cols-3"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck size={17} className="text-teal-light" /> No Fix No Fee
            </span>
            <span className="flex items-center gap-2">
              <Clock size={17} className="text-teal-light" /> Same-day and 24/7
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={17} className="text-teal-light" /> Genuine Merlin parts
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 42, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{ y: panelY, rotate: panelRotate }}
          className="hidden lg:block"
        >
          <div className="card border-teal/20 bg-ink-soft/85 shadow-glow backdrop-blur">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-teal-light">
                  Fast quote
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-white">
                  Tell us your model and fault.
                </h2>
                <p className="mt-2 text-sm text-slate-400">
                  We will call you back with the right next step for your Merlin opener.
                </p>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-teal/15 text-teal-light">
                <Sparkles size={24} />
              </span>
            </div>

            <a href="#contact" className="btn-primary mt-6 w-full">
              Request callback <ArrowRight size={18} />
            </a>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.42 }}
                className="rounded-xl bg-ink p-3"
              >
                <p className="font-display text-xl font-bold text-teal-light">
                  {config.stats.years}+
                </p>
                <p className="text-xs text-slate-400">Years</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.5 }}
                className="rounded-xl bg-ink p-3"
              >
                <p className="font-display text-xl font-bold text-teal-light">
                  {config.stats.warrantyMonths}
                </p>
                <p className="text-xs text-slate-400">Month warranty</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.58 }}
                className="rounded-xl bg-ink p-3"
              >
                <p className="font-display text-xl font-bold text-teal-light">
                  {config.stats.rating}
                </p>
                <p className="text-xs text-slate-400">Rating</p>
              </motion.div>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-flame/30 bg-flame/10 p-4 text-sm text-flame">
              <Phone size={18} />
              <a
                href={`tel:${config.contact.emergency.tel}`}
                onClick={() => trackCall("emergency")}
                className="font-semibold"
              >
                Emergency line: {config.contact.emergency.number}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
