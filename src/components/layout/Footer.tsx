import { Mail, MapPin, Phone } from "lucide-react";
import { BUSINESS, CONTACT, NAV_LINKS } from "../../constants";
import type { NetworkConfig } from "../../hooks/useNetworkConfig";
import { trackCall } from "../../utils/analytics";

export default function Footer({ config }: { config: NetworkConfig }) {
  return (
    <footer className="border-t border-ink-line bg-ink-soft pb-24 pt-12 md:pb-12">
      <div className="container-x grid gap-10 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-teal to-flame font-display font-bold text-white">
              M
            </span>
            <div>
              <strong className="block font-display text-lg text-white">{BUSINESS.name}</strong>
              <span className="text-sm text-slate-400">{BUSINESS.tagline}</span>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm text-slate-400">
            Specialist Merlin opener repairs, servicing, remote setup, and new opener installs
            across Greater Melbourne. Backed by AGG Doors.
          </p>
        </div>

        <div>
          <h3 className="font-display font-semibold text-white">Navigate</h3>
          <div className="mt-4 grid gap-2 text-sm text-slate-400">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-teal-light">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display font-semibold text-white">Contact</h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-400">
            <a
              href={`tel:${config.contact.emergency.tel}`}
              onClick={() => trackCall("emergency")}
              className="flex items-center gap-2 hover:text-teal-light"
            >
              <Phone size={16} /> {config.contact.emergency.number}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-teal-light">
              <Mail size={16} /> {CONTACT.email}
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={16} /> {CONTACT.address}
            </span>
          </div>
        </div>
      </div>

      <div className="container-x mt-10 border-t border-ink-line pt-6 text-xs text-slate-500">
        <p>
          © {new Date().getFullYear()} {BUSINESS.name}. Powered by{" "}
          <a href={BUSINESS.parentUrl} className="text-teal-light hover:text-white">
            {BUSINESS.parent}
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
