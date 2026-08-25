import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Nav, WHATSAPP, EMAIL } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import logo from "@/assets/welwhite-logo.asset.json";
import heroBottle from "@/assets/hero-bottle.jpg";
import bottleSpec from "@/assets/bottle-spec.jpg";
import farm from "@/assets/farm.jpg";
import {
  Milk,
  Leaf,
  Snowflake,
  Truck,
  Thermometer,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const TITLE = "Welwhite | Farm Fresh Raw Milk Delivered in Hyderabad";
const DESCRIPTION =
  "Welwhite delivers farm fresh raw buffalo and cow milk in glass bottles directly to homes across Hyderabad.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Welwhite",
          description: DESCRIPTION,
          telephone: "+91 95427 93470",
          email: EMAIL,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Hyderabad",
            addressRegion: "Telangana",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
});

const wa = (message: string) =>
  `${WHATSAPP}?text=${encodeURIComponent(message)}`;

const mailto = (subject: string) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

const btnPrimary =
  "btn-premium inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-medium tracking-wide text-primary-foreground shadow-soft hover:bg-secondary hover:shadow-lift";
const btnGhost =
  "btn-premium inline-flex items-center justify-center gap-2 rounded-xl border border-primary/20 bg-cream-soft/60 px-7 py-3.5 text-sm font-medium tracking-wide text-primary hover:border-gold/45 hover:bg-cream-soft";

function Eyebrow({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <p
      className={`eyebrow eyebrow-rule text-gold ${center ? "eyebrow-rule-center justify-center" : ""}`}
    >
      {children}
    </p>
  );
}

function SectionHead({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <Eyebrow center={center}>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 text-[1.85rem] leading-[1.12] text-primary sm:text-4xl md:text-[3.1rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-[0.975rem] leading-relaxed text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        {/* HERO */}
        <section
          id="home"
          className="relative overflow-hidden bg-cream pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-28"
        >
          <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-gold-soft/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-52 bottom-0 h-[26rem] w-[26rem] rounded-full bg-leaf/10 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">
            <div>
              <Reveal>
                <Eyebrow>Farm Fresh Raw Milk — Hyderabad</Eyebrow>
                <h1 className="mt-6 text-[2.6rem] leading-[1.05] text-primary sm:text-5xl lg:text-[4.1rem]">
                  Direct our dairy
                  <br />
                  <span className="font-normal italic text-gold">to your door.</span>
                </h1>
                <p className="mt-7 max-w-xl text-[0.975rem] leading-[1.75] text-muted-foreground sm:text-lg">
                  Welwhite brings raw buffalo and cow milk directly to homes across
                  Hyderabad, with a focus on freshness, careful handling and a simple
                  connection between dairy and doorstep.
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={wa("Hello Welwhite, I would like to enquire about raw milk delivery.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={btnPrimary}
                  >
                    Order / Enquire <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#our-milk" className={btnGhost}>
                    Explore Our Milk
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={140} className="order-first lg:order-last">
              <div className="relative mx-auto max-w-md">
                <div className="pointer-events-none absolute -inset-3 rounded-[1.75rem] border border-gold/20" />
                <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-cream-soft shadow-lift">
                  <img
                    src={heroBottle}
                    alt="Welwhite 1 litre glass milk bottle with golden cap in a green pasture"
                    width={1024}
                    height={1280}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 rounded-xl border border-gold/25 bg-cream-soft/92 px-4 py-2.5 shadow-soft backdrop-blur-sm">
                    <p className="eyebrow text-gold">1 Litre</p>
                    <p className="mt-0.5 text-sm font-medium text-primary">
                      Reusable glass bottle
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative mx-auto mt-16 max-w-4xl px-6 sm:px-8 lg:px-10">
            <ul className="grid grid-cols-1 divide-y divide-border/70 overflow-hidden rounded-2xl border border-border/70 bg-cream-soft/80 text-center shadow-hairline sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {["Raw Milk", "Glass Bottle", "Home Delivery"].map((t) => (
                <li key={t} className="px-6 py-6 transition-colors hover:bg-gold/5">
                  <span className="eyebrow text-primary">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <div className="rule-gold mx-auto max-w-7xl" />

        {/* WHY */}
        <section className="bg-background py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <SectionHead
              eyebrow="Why Welwhite"
              title="Why Welwhite?"
              subtitle="Simple principles behind every bottle."
            />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-4">
              {[
                { icon: Leaf, t: "Farm Fresh", d: "Milk sourced and prepared with a focus on freshness." },
                { icon: Milk, t: "Glass Bottle", d: "A premium reusable glass-bottle approach instead of conventional plastic packaging." },
                { icon: Snowflake, t: "Cold Care", d: "Milk is handled and refrigerated with care." },
                { icon: Truck, t: "Direct Delivery", d: "Our goal is to connect the dairy directly with homes." },
              ].map((c, i) => (
                <Reveal
                  key={c.t}
                  delay={i * 90}
                  className="card-fine group rounded-2xl p-7 hover:-translate-y-1 sm:p-8"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/5 transition-colors duration-300 group-hover:border-gold/45 group-hover:bg-gold/10">
                    <c.icon className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 text-xl text-primary">{c.t}</h3>
                  <p className="mt-3 text-sm leading-[1.7] text-muted-foreground">{c.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* OUR MILK */}
        <section id="our-milk" className="border-y border-border/60 bg-cream py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <SectionHead
              eyebrow="Products"
              title="Our Milk"
              subtitle="Fresh raw milk for everyday homes."
            />
            <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
              {[
                {
                  t: "Raw Buffalo Milk",
                  d: "Rich, traditional buffalo milk supplied fresh and delivered with care.",
                  cta: "Ask About Buffalo Milk",
                  msg: "Hello Welwhite, I would like to know more about Raw Buffalo Milk.",
                },
                {
                  t: "Raw Cow Milk",
                  d: "Fresh raw cow milk for homes looking for an everyday dairy option.",
                  cta: "Ask About Cow Milk",
                  msg: "Hello Welwhite, I would like to know more about Raw Cow Milk.",
                },
              ].map((p, i) => (
                <Reveal
                  key={p.t}
                  delay={i * 120}
                  className="card-fine group flex flex-col overflow-hidden rounded-3xl"
                >
                  <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-cream-soft to-cream px-8 py-12">
                    <span className="pointer-events-none absolute inset-x-10 bottom-8 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
                    <img
                      src={bottleSpec}
                      alt={`${p.t} in a 1 litre Welwhite branded glass bottle`}
                      loading="lazy"
                      width={928}
                      height={1152}
                      className="h-60 w-auto object-contain drop-shadow-[0_18px_28px_rgba(24,52,29,0.12)] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col border-t border-border/60 p-7 sm:p-9">
                    <h3 className="text-2xl text-primary">{p.t}</h3>
                    <p className="mt-3 text-sm leading-[1.7] text-muted-foreground">{p.d}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {["1 L", "Glass Bottle", "Raw Milk"].map((d) => (
                        <li
                          key={d}
                          className="rounded-full border border-gold/30 bg-gold/[0.06] px-3.5 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-gold"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={wa(p.msg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-8 ${btnPrimary}`}
                    >
                      {p.cta} <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* RAW MILK CARE */}
            <Reveal className="mt-10 rounded-3xl border border-gold/30 bg-gold/[0.06] p-8 shadow-hairline sm:mt-12 sm:p-10">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-cream-soft">
                  <Thermometer className="h-5 w-5 text-gold" strokeWidth={1.5} />
                </span>
                <div className="min-w-0">
                  <h3 className="text-2xl text-primary">Raw Milk Care</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-[1.75] text-muted-foreground sm:text-base">
                    Keep refrigerated at 4°C (40°F) or below. Because this is raw milk,
                    boil before consuming.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* JOURNEY */}
        <section id="journey" className="bg-background py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <SectionHead
              eyebrow="Our Journey"
              title={
                <>
                  From our dairy
                  <br />
                  <span className="font-normal italic text-gold">to your doorstep.</span>
                </>
              }
            />
            <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
              {[
                { n: "01", t: "Source", d: "Milk begins at the dairy." },
                { n: "02", t: "Handle", d: "Milk is handled carefully and kept refrigerated." },
                { n: "03", t: "Bottle", d: "Prepared in the Welwhite glass-bottle format." },
                { n: "04", t: "Deliver", d: "Delivered directly to homes across Hyderabad." },
              ].map((s, i) => (
                <Reveal key={s.n} delay={i * 110} className="group relative lg:pr-6">
                  <span className="font-display text-[2.75rem] leading-none text-gold/45 transition-colors duration-500 group-hover:text-gold/70">
                    {s.n}
                  </span>
                  <h3 className="mt-5 text-base font-medium uppercase tracking-[0.2em] text-primary">
                    {s.t}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.7] text-muted-foreground">{s.d}</p>
                  <span className="mt-7 block h-px w-full bg-gradient-to-r from-gold/45 to-transparent" />
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* COLD & CARE */}
        <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground sm:py-24 lg:py-32">
          <img
            src={farm}
            alt="Cows grazing on a green pasture at sunrise"
            loading="lazy"
            width={1600}
            height={912}
            className="absolute inset-0 h-full w-full object-cover opacity-[0.13]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-primary/50" />
          <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="max-w-2xl">
              <p className="eyebrow eyebrow-rule text-gold-soft">Cold &amp; Care</p>
              <h2 className="mt-4 text-[1.85rem] leading-[1.12] sm:text-4xl md:text-[3.1rem]">
                Kept Cold. Handled With Care.
              </h2>
              <p className="mt-6 text-[0.975rem] leading-[1.75] text-primary-foreground/80 sm:text-base">
                Raw milk depends on temperature. Refrigeration and careful handling at
                every stage are central to how Welwhite plans and runs its dairy-to-door
                operation.
              </p>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-3">
              {["Dairy", "Collection", "Refrigeration", "Bottle", "Cold Delivery", "Home"].map(
                (step, i, arr) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/[0.06] px-4 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300 hover:border-gold-soft/40 hover:bg-primary-foreground/10">
                      {step}
                    </span>
                    {i < arr.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-gold-soft/80" aria-hidden="true" />
                    )}
                  </div>
                ),
              )}
            </div>

            <p className="mt-12 inline-flex items-center gap-2.5 border-t border-primary-foreground/15 pt-6 text-sm text-primary-foreground/75">
              <Snowflake className="h-4 w-4 text-gold-soft" />
              Recommended storage: 4°C (40°F) or below
            </p>
          </div>
        </section>

        {/* BOTTLE */}
        <section id="bottle" className="border-b border-border/60 bg-cream py-20 sm:py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">
            <Reveal className="order-last lg:order-first">
              <div className="relative">
                <div className="pointer-events-none absolute -inset-3 rounded-[1.75rem] border border-gold/20" />
                <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-cream-soft shadow-lift">
                  <img
                    src={bottleSpec}
                    alt="Welwhite 1 litre reusable glass milk bottle with golden cap and the Welwhite label"
                    loading="lazy"
                    width={928}
                    height={1152}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
            <div>
              <SectionHead
                center={false}
                eyebrow="Our Bottle"
                title="A bottle made to feel like real dairy."
                subtitle="Welwhite is built around a premium reusable glass-bottle experience designed to bring the dairy feeling back to the doorstep."
              />
              <Reveal delay={100} className="mt-10 grid grid-cols-2 gap-4 sm:gap-5">
                {[
                  { k: "Capacity", v: "1 L" },
                  { k: "Approx. Height", v: "27 cm" },
                  { k: "Approx. Diameter", v: "8.75 cm" },
                  { k: "Approx. Circumference", v: "27.5 cm" },
                ].map((s) => (
                  <div key={s.k} className="card-fine rounded-2xl p-5 sm:p-6">
                    <p className="eyebrow text-muted-foreground">{s.k}</p>
                    <p className="mt-2.5 font-display text-2xl text-primary">{s.v}</p>
                  </div>
                ))}
              </Reveal>
              <p className="mt-6 text-xs tracking-wide text-muted-foreground">
                All dimensions are approximate.
              </p>
            </div>
          </div>
        </section>

        {/* DELIVERY */}
        <section id="delivery" className="bg-background py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <div className="overflow-hidden rounded-[1.75rem] border border-border/70 bg-cream-soft shadow-hairline">
              <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-16">
                <div>
                  <Eyebrow>Hyderabad Delivery</Eyebrow>
                  <h2 className="mt-4 text-[1.85rem] leading-[1.12] text-primary sm:text-4xl md:text-[3.1rem]">
                    Fresh dairy, delivered home.
                  </h2>
                  <p className="mt-6 max-w-lg text-[0.975rem] leading-[1.75] text-muted-foreground">
                    Welwhite is starting with direct-to-home raw milk delivery across
                    Hyderabad.
                  </p>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a
                      href={wa("Hello Welwhite, I would like to check delivery availability in my area.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={btnPrimary}
                    >
                      WhatsApp Welwhite
                    </a>
                    <a href="tel:+919542793470" className={btnGhost}>
                      <Phone className="h-4 w-4" /> +91 95427 93470
                    </a>
                  </div>
                  <p className="mt-6 text-xs leading-relaxed tracking-wide text-muted-foreground">
                    Availability depends on delivery area. Contact us to check.
                  </p>
                </div>
                <Reveal className="card-fine rounded-2xl p-8 sm:p-9">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/5">
                    <MapPin className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 text-2xl text-primary">Hyderabad, Telangana</h3>
                  <p className="mt-3 text-sm leading-[1.7] text-muted-foreground">
                    Orders are taken over WhatsApp or a phone call while we build our
                    delivery network across the city.
                  </p>
                  <div className="mt-7 space-y-3 border-t border-border/70 pt-6 text-sm">
                    <a
                      href="tel:+919542793470"
                      className="flex items-center gap-3 text-primary transition-colors hover:text-gold"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                      +91 95427 93470
                    </a>
                    <a
                      href={mailto("Welwhite raw milk enquiry")}
                      className="flex items-center gap-3 break-all text-primary transition-colors hover:text-gold"
                    >
                      <Mail className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.5} />
                      {EMAIL}
                    </a>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="border-y border-border/60 bg-cream py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
            <SectionHead
              eyebrow="About Welwhite"
              title="Why we started."
              subtitle="In a world where customers increasingly want to know more about what they consume, Welwhite is built around a simple idea: make the journey from dairy to doorstep more direct, transparent and carefully handled."
            />
            <div className="mt-14 grid grid-cols-2 gap-5 lg:mt-16 lg:grid-cols-4 lg:gap-6">
              {["Freshness", "Transparency", "Care", "Consistency"].map((v, i) => (
                <Reveal
                  key={v}
                  delay={i * 90}
                  className="card-fine rounded-2xl px-5 py-9 text-center sm:px-6 sm:py-11"
                >
                  <Sparkles className="mx-auto h-5 w-5 text-gold" strokeWidth={1.5} />
                  <p className="mt-4 font-display text-lg text-primary sm:text-xl">{v}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-background py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-10">
            <SectionHead eyebrow="FAQ" title="Questions, answered." />
            <Reveal className="mt-12">
              <Accordion type="single" collapsible className="w-full">
                {[
                  { q: "Is Welwhite milk raw?", a: "Yes. Welwhite is being built around raw buffalo and cow milk." },
                  { q: "Where does Welwhite deliver?", a: "Welwhite is starting with home delivery in Hyderabad. Contact us to check availability in your area." },
                  { q: "What bottle size is available?", a: "Our primary bottle format is a 1 litre glass bottle." },
                  { q: "How should I store the milk?", a: "Keep the milk refrigerated at 4°C (40°F) or below." },
                  { q: "Should raw milk be boiled?", a: "Yes. Boil before consuming." },
                  { q: "How can I order?", a: "Contact Welwhite through WhatsApp or call +91 95427 93470." },
                  { q: "Can I get regular delivery?", a: "Regular delivery options can be discussed directly with Welwhite." },
                ].map((f, i) => (
                  <AccordionItem
                    key={f.q}
                    value={`item-${i}`}
                    className="border-border/70 transition-colors data-[state=open]:border-gold/30"
                  >
                    <AccordionTrigger className="py-5 text-left font-display text-lg text-primary transition-colors hover:text-gold hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 text-sm leading-[1.75] text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>

            <Reveal delay={120} className="mt-12 rounded-2xl border border-border/70 bg-cream-soft p-7 text-center shadow-hairline sm:p-9">
              <p className="text-sm text-muted-foreground">
                Still have a question? Write to us at{" "}
                <a
                  href={mailto("Welwhite enquiry")}
                  className="break-all font-medium text-primary underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold"
                >
                  {EMAIL}
                </a>
              </p>
            </Reveal>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground sm:py-24 lg:py-32">
          <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-soft/40 to-transparent" />
          <div className="mx-auto max-w-3xl px-6 text-center sm:px-8 lg:px-10">
            <Reveal>
              <h2 className="text-[1.85rem] leading-[1.12] sm:text-4xl md:text-[3.1rem]">
                Good dairy should feel
                <br />
                <span className="font-normal italic text-gold-soft">close to home.</span>
              </h2>
              <p className="mt-6 text-[0.975rem] text-primary-foreground/80 sm:text-base">
                Direct our dairy to your door.
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <a
                  href={wa("Hello Welwhite, I would like to start a conversation about milk delivery.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-premium inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-8 py-4 text-sm font-medium tracking-wide text-accent-foreground shadow-gold hover:bg-gold-soft sm:w-auto"
                >
                  Start a Conversation <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={mailto("Welwhite enquiry")}
                  className="btn-premium inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary-foreground/25 px-8 py-4 text-sm font-medium tracking-wide text-primary-foreground hover:border-gold-soft/50 hover:bg-primary-foreground/[0.06] sm:w-auto"
                >
                  <Mail className="h-4 w-4" /> Email Us
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-cream py-14 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
          <div className="grid gap-10 md:grid-cols-3 lg:gap-12">
            <div>
              <img
                src={logo.url}
                alt="Welwhite — farm fresh raw milk"
                loading="lazy"
                width={200}
                height={150}
                className="h-16 w-auto"
              />
              <p className="eyebrow mt-5 text-gold">Farm Fresh Raw Milk</p>
              <p className="mt-1.5 text-sm text-muted-foreground">
                Direct our dairy to your door.
              </p>
            </div>
            <nav aria-label="Footer">
              <h3 className="eyebrow text-primary">Explore</h3>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                {[
                  { l: "Our Milk", h: "#our-milk" },
                  { l: "Our Journey", h: "#journey" },
                  { l: "Our Bottle", h: "#bottle" },
                  { l: "Delivery", h: "#delivery" },
                  { l: "FAQ", h: "#faq" },
                ].map((x) => (
                  <li key={x.h}>
                    <a
                      href={x.h}
                      className="transition-colors duration-300 hover:text-gold"
                    >
                      {x.l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h3 className="eyebrow text-primary">Contact</h3>
              <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
                <li>
                  <a
                    href="tel:+919542793470"
                    className="transition-colors duration-300 hover:text-gold"
                  >
                    +91 95427 93470
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="break-all transition-colors duration-300 hover:text-gold"
                  >
                    {EMAIL}
                  </a>
                </li>
                <li>Hyderabad, Telangana, India</li>
              </ul>
            </div>
          </div>
          <p className="mt-12 border-t border-border/70 pt-6 text-xs tracking-wide text-muted-foreground">
            © 2026 Welwhite. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
