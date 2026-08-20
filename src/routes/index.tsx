import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Nav, WHATSAPP } from "@/components/site/Nav";
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
      {eyebrow && <p className="eyebrow text-gold">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl leading-tight text-primary sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">{subtitle}</p>
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
        <section id="home" className="relative overflow-hidden bg-cream pt-28 pb-16 lg:pt-36 lg:pb-24">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-gold-soft/15 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16 lg:px-10">
            <div>
              <Reveal>
                <p className="eyebrow text-gold">Farm Fresh Raw Milk • Hyderabad</p>
                <h1 className="mt-5 text-4xl leading-[1.08] text-primary sm:text-5xl lg:text-6xl">
                  Direct our dairy
                  <br />
                  <span className="text-gold italic">to your door.</span>
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                  Welwhite brings raw buffalo and cow milk directly to homes across
                  Hyderabad, with a focus on freshness, careful handling and a simple
                  connection between dairy and doorstep.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={wa("Hello Welwhite, I would like to enquire about raw milk delivery.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground shadow-soft transition-all hover:bg-secondary hover:shadow-lift"
                  >
                    Order / Enquire <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#our-milk"
                    className="inline-flex items-center justify-center rounded-lg border border-primary/25 bg-transparent px-7 py-3.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
                  >
                    Explore Our Milk
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120} className="order-first lg:order-last">
              <div className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-border bg-cream-soft shadow-lift">
                <img
                  src={heroBottle}
                  alt="Welwhite 1 litre glass milk bottle with golden cap in a green pasture"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover"
                />
                <div className="absolute bottom-4 left-4 rounded-lg border border-border/70 bg-cream-soft/90 px-4 py-2 backdrop-blur">
                  <p className="eyebrow text-gold">1 Litre</p>
                  <p className="text-sm font-medium text-primary">Reusable glass bottle</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180} className="relative mx-auto mt-14 max-w-4xl px-5 lg:px-10">
            <ul className="grid grid-cols-1 divide-y divide-border rounded-xl border border-border bg-cream-soft text-center sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {["Raw Milk", "Glass Bottle", "Home Delivery"].map((t) => (
                <li key={t} className="px-6 py-5">
                  <span className="eyebrow text-primary">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* WHY */}
        <section className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <SectionHead
              eyebrow="Why Welwhite"
              title="Why Welwhite?"
              subtitle="Simple principles behind every bottle."
            />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Leaf, t: "Farm Fresh", d: "Milk sourced and prepared with a focus on freshness." },
                { icon: Milk, t: "Glass Bottle", d: "A premium reusable glass-bottle approach instead of conventional plastic packaging." },
                { icon: Snowflake, t: "Cold Care", d: "Milk is handled and refrigerated with care." },
                { icon: Truck, t: "Direct Delivery", d: "Our goal is to connect the dairy directly with homes." },
              ].map((c, i) => (
                <Reveal
                  key={c.t}
                  delay={i * 90}
                  className="group rounded-xl border border-border bg-card p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
                >
                  <c.icon className="h-6 w-6 text-gold" strokeWidth={1.5} />
                  <h3 className="mt-5 text-xl text-primary">{c.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* OUR MILK */}
        <section id="our-milk" className="bg-cream py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <SectionHead
              eyebrow="Products"
              title="Our Milk"
              subtitle="Fresh raw milk for everyday homes."
            />
            <div className="mt-14 grid gap-8 lg:grid-cols-2">
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
                  className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lift"
                >
                  <div className="flex items-center justify-center bg-cream-soft px-8 py-10">
                    <img
                      src={bottleSpec}
                      alt={`${p.t} in a 1 litre Welwhite glass bottle`}
                      loading="lazy"
                      width={1024}
                      height={1280}
                      className="h-56 w-auto object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-8">
                    <h3 className="text-2xl text-primary">{p.t}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {["1 L", "Glass Bottle", "Raw Milk"].map((d) => (
                        <li
                          key={d}
                          className="rounded-md border border-gold/30 bg-gold/5 px-3 py-1.5 text-xs font-medium tracking-wide text-gold"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={wa(p.msg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-secondary"
                    >
                      {p.cta} <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* RAW MILK CARE */}
            <Reveal className="mt-12 rounded-2xl border border-gold/35 bg-gold/5 p-8 sm:p-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
                <Thermometer className="h-6 w-6 shrink-0 text-gold" strokeWidth={1.5} />
                <div className="min-w-0">
                  <h3 className="text-2xl text-primary">Raw Milk Care</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    Keep refrigerated at 4°C (40°F) or below. Because this is raw milk,
                    boil before consuming.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* JOURNEY */}
        <section id="journey" className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <SectionHead
              eyebrow="Our Journey"
              title={
                <>
                  From our dairy
                  <br />
                  <span className="italic text-gold">to your doorstep.</span>
                </>
              }
            />
            <ol className="mt-16 grid gap-10 lg:grid-cols-4 lg:gap-6">
              {[
                { n: "01", t: "Source", d: "Milk begins at the dairy." },
                { n: "02", t: "Handle", d: "Milk is handled carefully and kept refrigerated." },
                { n: "03", t: "Bottle", d: "Prepared in the Welwhite glass-bottle format." },
                { n: "04", t: "Deliver", d: "Delivered directly to homes across Hyderabad." },
              ].map((s, i) => (
                <Reveal key={s.n} delay={i * 110} className="relative lg:pr-6">
                  <span className="font-display text-4xl text-gold/50">{s.n}</span>
                  <h3 className="mt-4 text-xl uppercase tracking-[0.14em] text-primary">
                    {s.t}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                  <span className="mt-6 block h-px w-full bg-gradient-to-r from-gold/50 to-transparent" />
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* COLD & CARE */}
        <section className="relative overflow-hidden bg-primary py-20 text-primary-foreground lg:py-28">
          <img
            src={farm}
            alt="Cows grazing on a green pasture at sunrise"
            loading="lazy"
            width={1600}
            height={912}
            className="absolute inset-0 h-full w-full object-cover opacity-15"
          />
          <div className="relative mx-auto max-w-7xl px-5 lg:px-10">
            <div className="max-w-2xl">
              <p className="eyebrow text-gold-soft">Cold &amp; Care</p>
              <h2 className="mt-3 text-3xl leading-tight sm:text-4xl md:text-5xl">
                Kept Cold. Handled With Care.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-primary-foreground/80">
                Raw milk depends on temperature. Refrigeration and careful handling at
                every stage are central to how Welwhite plans and runs its dairy-to-door
                operation.
              </p>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-4">
              {["Dairy", "Collection", "Refrigeration", "Bottle", "Cold Delivery", "Home"].map(
                (step, i, arr) => (
                  <div key={step} className="flex items-center gap-3">
                    <span className="rounded-lg border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.14em]">
                      {step}
                    </span>
                    {i < arr.length - 1 && (
                      <ArrowRight className="h-4 w-4 text-gold-soft" aria-hidden="true" />
                    )}
                  </div>
                ),
              )}
            </div>

            <p className="mt-10 inline-flex items-center gap-2 border-t border-primary-foreground/15 pt-6 text-sm text-primary-foreground/75">
              <Snowflake className="h-4 w-4 text-gold-soft" />
              Recommended storage: 4°C (40°F) or below
            </p>
          </div>
        </section>

        {/* BOTTLE */}
        <section id="bottle" className="bg-cream py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 lg:grid-cols-2 lg:gap-20 lg:px-10">
            <Reveal className="order-last lg:order-first">
              <div className="overflow-hidden rounded-2xl border border-border bg-cream-soft shadow-lift">
                <img
                  src={bottleSpec}
                  alt="Welwhite 1 litre reusable glass milk bottle with golden cap"
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionHead
                center={false}
                eyebrow="Our Bottle"
                title="A bottle made to feel like real dairy."
                subtitle="Welwhite is built around a premium reusable glass-bottle experience designed to bring the dairy feeling back to the doorstep."
              />
              <Reveal delay={100} className="mt-10 grid grid-cols-2 gap-4">
                {[
                  { k: "Capacity", v: "1 L" },
                  { k: "Approx. Height", v: "27 cm" },
                  { k: "Approx. Diameter", v: "8.75 cm" },
                  { k: "Approx. Circumference", v: "27.5 cm" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="rounded-xl border border-border bg-card p-5 shadow-soft"
                  >
                    <p className="eyebrow text-muted-foreground">{s.k}</p>
                    <p className="mt-2 font-display text-2xl text-primary">{s.v}</p>
                  </div>
                ))}
              </Reveal>
              <p className="mt-5 text-xs text-muted-foreground">
                All dimensions are approximate.
              </p>
            </div>
          </div>
        </section>

        {/* DELIVERY */}
        <section id="delivery" className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <div className="overflow-hidden rounded-3xl border border-border bg-cream-soft shadow-soft">
              <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:p-16">
                <div>
                  <p className="eyebrow text-gold">Hyderabad Delivery</p>
                  <h2 className="mt-3 text-3xl leading-tight text-primary sm:text-4xl md:text-5xl">
                    Fresh dairy, delivered home.
                  </h2>
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
                    Welwhite is starting with direct-to-home raw milk delivery across
                    Hyderabad.
                  </p>
                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <a
                      href={wa("Hello Welwhite, I would like to check delivery availability in my area.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-secondary"
                    >
                      WhatsApp Welwhite
                    </a>
                    <a
                      href="tel:+919542793470"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/25 px-7 py-3.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
                    >
                      <Phone className="h-4 w-4" /> +91 95427 93470
                    </a>
                  </div>
                  <p className="mt-6 text-xs text-muted-foreground">
                    Availability depends on delivery area. Contact us to check.
                  </p>
                </div>
                <Reveal className="rounded-2xl border border-border bg-card p-8">
                  <MapPin className="h-6 w-6 text-gold" strokeWidth={1.5} />
                  <h3 className="mt-5 text-2xl text-primary">Hyderabad, Telangana</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Orders are taken over WhatsApp or a phone call while we build our
                    delivery network across the city.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="bg-cream py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-10">
            <SectionHead
              eyebrow="About Welwhite"
              title="Why we started."
              subtitle="In a world where customers increasingly want to know more about what they consume, Welwhite is built around a simple idea: make the journey from dairy to doorstep more direct, transparent and carefully handled."
            />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {["Freshness", "Transparency", "Care", "Consistency"].map((v, i) => (
                <Reveal
                  key={v}
                  delay={i * 90}
                  className="rounded-xl border border-border bg-card px-6 py-10 text-center shadow-soft"
                >
                  <Sparkles className="mx-auto h-5 w-5 text-gold" strokeWidth={1.5} />
                  <p className="mt-4 font-display text-xl text-primary">{v}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-background py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-5 lg:px-10">
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
                  <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                    <AccordionTrigger className="text-left font-display text-lg text-primary hover:no-underline">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                      {f.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="bg-primary py-20 text-primary-foreground lg:py-28">
          <div className="mx-auto max-w-3xl px-5 text-center lg:px-10">
            <Reveal>
              <h2 className="text-3xl leading-tight sm:text-4xl md:text-5xl">
                Good dairy should feel
                <br />
                <span className="italic text-gold-soft">close to home.</span>
              </h2>
              <p className="mt-5 text-base text-primary-foreground/80">
                Direct our dairy to your door.
              </p>
              <a
                href={wa("Hello Welwhite, I would like to start a conversation about milk delivery.")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-8 py-4 text-sm font-medium text-accent-foreground transition-colors hover:bg-gold-soft sm:w-auto"
              >
                Start a Conversation <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-cream py-14">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <img
                src={logo.url}
                alt="Welwhite — farm fresh raw milk"
                loading="lazy"
                width={200}
                height={150}
                className="h-16 w-auto"
              />
              <p className="eyebrow mt-4 text-gold">Farm Fresh Raw Milk</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Direct our dairy to your door.
              </p>
            </div>
            <nav aria-label="Footer">
              <h3 className="eyebrow text-primary">Explore</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {[
                  { l: "Our Milk", h: "#our-milk" },
                  { l: "Our Journey", h: "#journey" },
                  { l: "Our Bottle", h: "#bottle" },
                  { l: "Delivery", h: "#delivery" },
                  { l: "FAQ", h: "#faq" },
                ].map((x) => (
                  <li key={x.h}>
                    <a href={x.h} className="transition-colors hover:text-primary">
                      {x.l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <h3 className="eyebrow text-primary">Contact</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                <li>
                  <a href="tel:+919542793470" className="transition-colors hover:text-primary">
                    +91 95427 93470
                  </a>
                </li>
                <li>Email: Coming soon</li>
                <li>Hyderabad, Telangana, India</li>
              </ul>
            </div>
          </div>
          <p className="mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
            © 2026 Welwhite. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
