import { createFileRoute } from "@tanstack/react-router";

import { BUSINESS } from "@/config/business";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy & Cookie Policy | Quayside Peri Peri" },
      {
        name: "description",
        content:
          "How Quayside Peri Peri handles customer data for online orders, delivery, loyalty and marketing consent, plus cookie usage and your data rights.",
      },
      { property: "og:title", content: "Privacy & Cookie Policy — Quayside Peri Peri" },
      { property: "og:description", content: "What data we collect for orders, why we collect it, and your rights." },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <h1 className="font-display text-5xl leading-none">PRIVACY & COOKIE POLICY</h1>
      <p className="mt-4 rounded-2xl border border-gold/40 bg-gold/5 p-5 text-sm">
        This is a working template written to match how the platform actually handles data. It is not legal advice and must
        be reviewed and approved by the business, ideally with professional legal input, before launch.
      </p>

      <div className="mt-8 space-y-7 text-muted-foreground">
        <Section title="What we collect">
          Name, email, phone, delivery address and postcode, order history, favourites, loyalty points and voucher history,
          marketing consent, account creation date and total spend. We collect only what the ordering service needs.
        </Section>
        <Section title="Why we collect it">
          To take, prepare, deliver and support your order; to run loyalty and vouchers; and — only with your explicit
          opt-in — to send marketing. Order updates are essential service messages and are separate from marketing.
        </Section>
        <Section title="Payments">
          Card payments are processed by Stripe. We never store or see raw card details.
        </Section>
        <Section title="Cookies">
          We use strictly necessary cookies and local storage to keep your basket and session working. Any analytics or
          marketing cookies are only set where consent has been given through the cookie settings.
        </Section>
        <Section title="Your rights">
          You can access, correct, export or delete your data, withdraw marketing consent at any time, and delete your
          account from the account dashboard.
        </Section>
        <Section title="Contact">
          {BUSINESS.name}, {BUSINESS.address.line1}, {BUSINESS.address.city} {BUSINESS.address.postcode} ·{" "}
          {BUSINESS.phone}. A data-protection contact email needs to be supplied by the business.
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl text-foreground">{title.toUpperCase()}</h2>
      <p className="mt-2 text-sm leading-relaxed">{children}</p>
    </section>
  );
}
