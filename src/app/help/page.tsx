import type { Metadata } from "next";
import Link from "next/link";
import {
  FiSearch,
  FiShoppingBag,
  FiTruck,
  FiShield,
  FiUser,
  FiCreditCard,
  FiArrowRight,
  FiMail,
  FiPhone,
  FiMessageCircle,
} from "react-icons/fi";
import SectionHeading from "@/src/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Help Center",
  description:
    "Find answers about buying pets, breeders, payments, delivery, and health guarantees on PawVerse — or get in touch with our support team.",
};

const topics = [
  {
    Icon: FiShoppingBag,
    title: "Buying a pet",
    description:
      "How listings work, reserving a pet, and what happens after you place a deposit.",
  },
  {
    Icon: FiUser,
    title: "Working with breeders",
    description:
      "How we vet breeders, arranging visits, and communicating before you buy.",
  },
  {
    Icon: FiCreditCard,
    title: "Payments & deposits",
    description:
      "Accepted payment methods, secure escrow deposits, and refunds.",
  },
  {
    Icon: FiTruck,
    title: "Shipping & delivery",
    description:
      "Nationwide pet delivery, in-person pickup, and travel-day logistics.",
    href: "/shipping",
  },
  {
    Icon: FiShield,
    title: "Health guarantee",
    description:
      "What our health guarantee covers, vet checks, and how to file a claim.",
    href: "/guarantee",
  },
  {
    Icon: FiSearch,
    title: "Account & listings",
    description:
      "Managing your profile, saved pets, and notifications about new listings.",
  },
];

const faqs = [
  {
    q: "How do I reserve a pet I found on PawVerse?",
    a: "Open the listing and select “Reserve.” You’ll place a secure deposit held in escrow until you complete a video or in-person meet with the breeder. Once you confirm, the remaining balance is released to the breeder.",
  },
  {
    q: "Are the breeders on PawVerse verified?",
    a: "Yes. Every breeder completes our vetting process, which includes identity verification, facility review, and health-record checks. Look for the verified badge on each breeder profile.",
  },
  {
    q: "What is covered by the health guarantee?",
    a: "All pets come with a written health guarantee covering congenital conditions and a clean vet check at pickup. See our Health Guarantee page for full coverage details and claim steps.",
  },
  {
    q: "How are pets delivered to me?",
    a: "You can choose nationwide ground or flight-nanny delivery, or arrange in-person pickup with the breeder. Delivery options and costs are shown at checkout.",
  },
  {
    q: "Can I get a refund on my deposit?",
    a: "Deposits are fully refundable if the breeder cancels, if the pet fails its pre-delivery vet check, or if you cancel within 48 hours of placing the deposit.",
  },
];

export default function HelpPage() {
  return (
    <main className="bg-cream">
      <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Help Center"
          title="How can we help you today?"
          subtitle="Browse common topics and frequently asked questions, or reach out to our support team for a hand with anything PawVerse."
        />

        {/* Search */}
        <div className="mx-auto mt-10 max-w-xl">
          <label className="flex items-center gap-3 rounded-full border border-sand-dark/70 bg-white px-5 py-4 shadow-xl shadow-ink/5 transition focus-within:border-clay">
            <FiSearch className="text-ink-soft" size={18} />
            <input
              type="search"
              placeholder="Search help articles…"
              className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft/70"
            />
          </label>
        </div>

        {/* Topic grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map(({ Icon, title, description, href }) => {
            const card = (
              <div className="group flex h-full flex-col rounded-[1.75rem] border border-sand-dark/70 bg-white p-7 shadow-xl shadow-ink/5 transition hover:-translate-y-1 hover:border-clay/60">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay text-cream">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                  {description}
                </p>
                {href && (
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-clay transition group-hover:gap-2.5">
                    Learn more <FiArrowRight size={15} />
                  </span>
                )}
              </div>
            );
            return href ? (
              <Link key={title} href={href} className="block h-full">
                {card}
              </Link>
            ) : (
              <div key={title}>{card}</div>
            );
          })}
        </div>

        {/* FAQ */}
        <div className="mt-24">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            subtitle="Quick answers to the questions we hear most from buyers."
          />
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-[1.5rem] border border-sand-dark/70 bg-white p-6 shadow-xl shadow-ink/5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-ink">
                  {faq.q}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sand-dark text-ink-soft transition group-open:rotate-45 group-open:border-clay group-open:text-clay">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-24 rounded-[2rem] border border-sand-dark/70 bg-sand p-10 text-center shadow-xl shadow-ink/5 sm:p-14">
          <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Still need a hand?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
            Our support team is available Monday to Friday, 9am–6pm ET, and
            typically replies within 24 hours.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-sand-dark/70 bg-white p-6">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-clay text-cream">
                <FiMessageCircle size={18} />
              </span>
              <p className="mt-4 text-sm font-semibold text-ink">Live chat</p>
              <p className="mt-1 text-sm text-ink-soft">Mon–Fri · 9am–6pm ET</p>
            </div>
            <div className="rounded-3xl border border-sand-dark/70 bg-white p-6">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-clay text-cream">
                <FiMail size={18} />
              </span>
              <p className="mt-4 text-sm font-semibold text-ink">Email us</p>
              <p className="mt-1 text-sm text-ink-soft">support@pawverse.com</p>
            </div>
            <div className="rounded-3xl border border-sand-dark/70 bg-white p-6">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-clay text-cream">
                <FiPhone size={18} />
              </span>
              <p className="mt-4 text-sm font-semibold text-ink">Call us</p>
              <p className="mt-1 text-sm text-ink-soft">+1 (800) 555-0137</p>
            </div>
          </div>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-clay px-8 py-4 text-sm font-semibold uppercase tracking-[1px] text-cream transition hover:bg-clay-dark"
          >
            Contact support
          </Link>
        </div>
      </section>
    </main>
  );
}
