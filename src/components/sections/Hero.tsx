import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, Phone, ShieldCheck, Sparkles } from "lucide-react";
import { BUSINESS } from "../../constants";
import type { NetworkConfig } from "../../hooks/useNetworkConfig";
import { trackCall } from "../../utils/analytics";

export default function Hero({ config }: { config: NetworkConfig }) {
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 650], [0, 110]);
  const panelY = useTransform(scrollY, [0, 650], [0, -45]);

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
            <Sparkles size={14} /> {BUSINESS.tagline}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[0.95] text-white sm:text-6xl lg:text-7xl"
          >
            Same-day Merlin garage door repairs in Melbourne.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-slate-300"
          >
            Genuine Merlin parts, myQ setup, remote pairing, opener repairs, and new motor
            installs. No Fix No Fee, backed by AGG Doors.
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
            {["No Fix No Fee", "12-month workmanship warranty", "600+ Melbourne reviews"].map(
              (item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 size={17} className="text-teal-light" /> {item}
                </span>
              ),
            )}
          </motion.div>
        </div>

        <motion.div style={{ y: panelY }} className="card hidden lg:block">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal/15 text-teal-light">
              <ShieldCheck size={24} />
            </span>
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">Emergency line</p>
              <a
                href={`tel:${config.contact.emergency.tel}`}
                onClick={() => trackCall("emergency")}
                className="font-display text-2xl font-bold text-white"
              >
                {config.contact.emergency.number}
              </a>
            </div>
          </div>
          <div className="mt-6 grid gap-3 text-sm text-slate-400">
            <p>Stuck door, failed opener, broken gear, faulty remote, or myQ setup.</p>
            <p className="rounded-xl border border-flame/30 bg-flame/10 p-4 text-flame">
              Same-day appointments available across Greater Melbourne.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
