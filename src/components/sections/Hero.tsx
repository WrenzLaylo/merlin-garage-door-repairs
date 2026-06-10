import { motion, useScroll, useTransform } from "framer-motion";
import { MdPhone, MdArrowForward, MdCheckCircle, MdShield, MdAutoAwesome } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { TbClock24 } from "react-icons/tb";
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
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-canvas via-canvas/92 to-canvas/55" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-canvas to-transparent" />

      <div className="container-x grid min-h-[calc(100vh-5rem)] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.75fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            <FaStar size={14} className="fill-gold text-gold" />
            {config.stats.rating}/5 from {config.stats.reviews}+ reviews
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[0.95] text-ink sm:text-6xl lg:text-7xl"
          >
            <span className="text-brand">Merlin</span> garage door repairs in Melbourne.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mt-6 max-w-2xl text-lg leading-8 text-muted"
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
              className="btn-accent text-base"
            >
              <MdPhone size={18} /> Call {config.contact.emergency.number}
            </a>
            <a href="#contact" className="btn-secondary text-base">
              Request free quote <MdArrowForward size={18} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.34 }}
            className="mt-8 grid gap-3 text-sm text-muted sm:grid-cols-3"
          >
            <span className="flex items-center gap-2">
              <MdShield size={17} className="text-brand" /> No Fix No Fee
            </span>
            <span className="flex items-center gap-2">
              <TbClock24 size={17} className="text-brand" /> Same-day and 24/7
            </span>
            <span className="flex items-center gap-2">
              <MdCheckCircle size={17} className="text-brand" /> Genuine Merlin parts
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
          <div className="card border-line bg-surface/90 shadow-soft backdrop-blur">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-deep">
                  Fast quote
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold text-ink">
                  Tell us your model and fault.
                </h2>
                <p className="mt-2 text-sm text-muted">
                  We will call you back with the right next step for your Merlin opener.
                </p>
              </div>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand/15 text-brand-deep">
                <MdAutoAwesome size={24} />
              </span>
            </div>

            <a href="#contact" className="btn-primary mt-6 w-full">
              Request callback <MdArrowForward size={18} />
            </a>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.42 }}
                className="rounded-xl border border-line bg-brand-tint p-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand/20"
              >
                <p className="font-display text-xl font-bold text-brand-deep">
                  {config.stats.years}+
                </p>
                <p className="text-xs text-muted">Years</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.5 }}
                className="rounded-xl border border-line bg-brand-tint p-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand/20"
              >
                <p className="font-display text-xl font-bold text-brand-deep">
                  {config.stats.warrantyMonths}
                </p>
                <p className="text-xs text-muted">Month warranty</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.58 }}
                className="rounded-xl border border-line bg-brand-tint p-3 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand/20"
              >
                <p className="font-display text-xl font-bold text-brand-deep">
                  {config.stats.rating}
                </p>
                <p className="text-xs text-muted">Rating</p>
              </motion.div>
            </div>

            <div className="mt-5 flex items-center gap-3 rounded-xl border border-accent/30 bg-accent-tint p-4 text-sm text-accent transition-all duration-300 hover:border-accent/50 hover:bg-accent/15">
              <MdPhone size={18} />
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
