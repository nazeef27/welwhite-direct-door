import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/welwhite-logo.asset.json";

// "/#section" (not "#section") so these still work from pages other than the
// homepage, like /lab-reports — the browser navigates to "/" then jumps to
// the anchor, instead of doing nothing on the current page.
const links = [
  { label: "Home", href: "/#home" },
  { label: "Our Milk", href: "/#our-milk" },
  { label: "Our Journey", href: "/#journey" },
  { label: "Our Bottle", href: "/#bottle" },
  { label: "Delivery", href: "/#delivery" },
  { label: "FAQ", href: "/#faq" },
  { label: "Lab Reports", href: "/lab-reports" },
];

export const WHATSAPP = "https://wa.me/919542793470";
export const EMAIL = "abdulghaninazeef27@gmail.com";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/70 bg-cream-soft/95 shadow-hairline backdrop-blur-md"
          : "border-b border-transparent bg-cream-soft/40 backdrop-blur-sm"
      }`}
    >
      <nav
        className={`mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 transition-all duration-500 sm:px-6 lg:px-10 ${
          scrolled ? "py-2.5" : "py-3.5"
        }`}
      >
        <a href="/#home" className="flex min-w-0 items-center gap-3">
          <img
            src={logo.url}
            alt="Welwhite — farm fresh raw milk"
            className={`w-auto shrink-0 transition-all duration-500 ${
              scrolled ? "h-10 sm:h-11" : "h-11 sm:h-13"
            }`}
            width={160}
            height={120}
          />
          <span className="sr-only">Welwhite</span>
        </a>

        <div className="flex items-center gap-2">
          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative text-[0.82rem] font-medium uppercase tracking-[0.11em] text-foreground/75 transition-colors duration-300 hover:text-primary after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-premium ml-5 hidden rounded-xl bg-primary px-5 py-2.5 text-sm font-medium tracking-wide text-primary-foreground shadow-soft hover:bg-secondary hover:shadow-lift sm:inline-flex"
          >
            Order / Enquire
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border text-primary transition-colors hover:border-gold/40 hover:bg-gold/5 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border bg-cream-soft lg:hidden">
          <ul className="mx-auto max-w-7xl px-5 py-2 sm:px-6">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/50 py-3.5 text-[0.95rem] font-medium tracking-wide text-foreground/85 transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-5 pb-2">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block rounded-xl bg-primary px-5 py-3.5 text-center text-sm font-medium tracking-wide text-primary-foreground shadow-soft"
              >
                Order / Enquire
              </a>
            </li>
            <li className="pb-4 text-center">
              <a
                href={`mailto:${EMAIL}`}
                onClick={() => setOpen(false)}
                className="mt-3 inline-block break-all text-xs text-muted-foreground transition-colors hover:text-gold"
              >
                {EMAIL}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
