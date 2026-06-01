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
            <img
              src="/site-logo.svg"
              alt={BUSINESS.name}
              className="h-14 w-[260px] max-w-full"
            />
          </div>
          <p className="mt-5 max-w-md text-sm text-slate-400">
            Specialist Merlin opener repairs, servicing, remote setup, and new
            opener installs across Greater Melbourne. Backed by AGG Doors.
          </p>
          <a
            href={BUSINESS.parentUrl}
            className="mt-5 inline-flex transition hover:scale-[1.01] opacity-60 hover:opacity-100"
            aria-label="Powered by AGG Doors"
          >
            <img
              src="/Powered_by_AGGDoors.png"
              alt="Powered by AGG Doors"
              className="h-16 w-auto"
            />
          </a>
        </div>

        <div>
          <h3 className="font-display font-semibold text-white">Navigate</h3>
          <div className="mt-4 grid gap-2 text-sm text-slate-400">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-teal-light"
              >
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
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-2 hover:text-teal-light"
            >
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
          Copyright {new Date().getFullYear()} {BUSINESS.name}. Powered by{" "}
          <a
            href={BUSINESS.parentUrl}
            className="text-teal-light hover:text-white"
          >
            {BUSINESS.parent}
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
