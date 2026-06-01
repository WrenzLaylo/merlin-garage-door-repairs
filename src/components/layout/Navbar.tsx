import { Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BUSINESS, NAV_LINKS } from "../../constants";
import type { NetworkConfig } from "../../hooks/useNetworkConfig";
import { trackCall } from "../../utils/analytics";

export default function Navbar({ config }: { config: NetworkConfig }) {
  const [open, setOpen] = useState(false);
  const menuRef   = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Close on Escape; trap focus inside drawer when open
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      // Focus trap
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusable = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    // Move focus into menu on open
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-ink-line bg-ink/85 backdrop-blur-xl">
      <div className="container-x flex h-20 items-center justify-between gap-5">
        <a href="#top" className="flex items-center gap-3" aria-label={`${BUSINESS.name} home`}>
          <img
            src="/site-logo.svg"
            alt={BUSINESS.name}
            className="h-12 w-[225px] max-w-[56vw]"
          />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="btn-ghost px-3">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`tel:${config.contact.business.tel}`}
            onClick={() => trackCall("business")}
            className="btn-secondary"
          >
            <Phone size={16} /> {config.contact.business.number}
          </a>
          <a
            href={`tel:${config.contact.emergency.tel}`}
            onClick={() => trackCall("emergency")}
            className="btn-primary"
          >
            24/7 {config.contact.emergency.number}
          </a>
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="btn-secondary px-3 lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-label="Navigation menu"
          className="border-t border-ink-line bg-ink-soft lg:hidden"
        >
          <div className="container-x grid gap-2 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-slate-200 hover:bg-ink"
              >
                {link.label}
              </a>
            ))}
            {/* Phone links in mobile menu too */}
            <a
              href={`tel:${config.contact.emergency.tel}`}
              onClick={() => { trackCall("emergency"); setOpen(false); }}
              className="btn-primary mt-2 justify-center"
            >
              <Phone size={16} /> 24/7 {config.contact.emergency.number}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
