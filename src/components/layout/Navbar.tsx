import { MdPhone, MdMenu, MdClose } from "react-icons/md";
import { TbClock24 } from "react-icons/tb";
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
    <header className="sticky top-0 z-40 border-b border-line bg-surface/85 shadow-card backdrop-blur-xl">
      <div className="flex h-20 w-full items-center justify-between gap-4 px-4 sm:px-6 xl:gap-6 xl:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-3" aria-label={`${BUSINESS.name} home`}>
          <img
            src="/site-logo.png"
            alt={BUSINESS.name}
            className="h-11 w-auto max-w-[180px] xl:h-12 xl:max-w-[220px]"
          />
        </a>

        <nav className="hidden min-w-0 flex-1 items-center justify-center overflow-hidden gap-0 lg:flex xl:gap-1" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="btn-ghost whitespace-nowrap px-2.5 text-xs xl:px-3 xl:text-sm">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3 pl-4 xl:pl-6 border-l border-line">
          <a
            href={`tel:${config.contact.business.tel}`}
            onClick={() => trackCall("business")}
            className="btn-secondary whitespace-nowrap px-3 text-xs xl:px-5 xl:text-sm"
          >
            <MdPhone size={16} /> {config.contact.business.number}
          </a>
          <a
            href={`tel:${config.contact.emergency.tel}`}
            onClick={() => trackCall("emergency")}
            className="btn-accent whitespace-nowrap px-3 text-xs xl:px-5 xl:text-sm"
          >
            <TbClock24 size={17} /> {config.contact.emergency.number}
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
          {open ? <MdClose size={20} /> : <MdMenu size={20} />}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-label="Navigation menu"
          className="border-t border-line bg-surface lg:hidden"
        >
          <div className="container-x grid gap-2 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-semibold text-ink hover:bg-brand-tint hover:text-brand-deep"
              >
                {link.label}
              </a>
            ))}
            {/* Phone links in mobile menu too */}
            <a
              href={`tel:${config.contact.emergency.tel}`}
              onClick={() => { trackCall("emergency"); setOpen(false); }}
              className="btn-accent mt-2 justify-center"
            >
              <TbClock24 size={17} /> 24/7 {config.contact.emergency.number}
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
