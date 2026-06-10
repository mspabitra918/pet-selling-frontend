import type { Metadata } from "next";
import Link from "next/link";
import {
  FiTruck,
  FiMapPin,
  FiHome,
  FiClock,
  FiPackage,
  FiThermometer,
  FiClipboard,
  FiSmile,
} from "react-icons/fi";
import SectionHeading from "@/src/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Shipping & Delivery",
  description:
    "Learn how PawVerse delivers pets safely — flight-nanny travel, ground transport, and local pickup — with comfort-first handling and live updates.",
};

const options = [
  {
    Icon: FiHome,
    title: "Local pickup",
    eta: "By appointment",
    price: "Free",
    description:
      "Meet the breeder in person to collect your pet and review health records on the spot.",
  },
  {
    Icon: FiTruck,
    title: "Ground transport",
    eta: "2–5 days",
    price: "From $250",
    description:
      "Climate-controlled vehicles with trained pet handlers and regular comfort and exercise stops.",
  },
  {
    Icon: FiPackage,
    title: "Flight nanny",
    eta: "1–2 days",
    price: "From $450",
    description:
      "A dedicated handler accompanies your pet in-cabin door-to-door for the fastest, gentlest arrival.",
  },
];

const steps = [
  {
    Icon: FiClipboard,
    step: "01",
    title: "Booking confirmed",
    description:
      "Once your purchase is complete, we schedule a travel date that works for you and the breeder.",
  },
  {
    Icon: FiThermometer,
    step: "02",
    title: "Pre-travel vet check",
    description:
      "Your pet receives a wellness check and travel-fitness clearance within 72 hours of departure.",
  },
  {
    Icon: FiTruck,
    step: "03",
    title: "Safe transit",
    description:
      "Trained handlers care for your pet en route with food, water, and comfort breaks the whole way.",
  },
  {
    Icon: FiSmile,
    step: "04",
    title: "Happy arrival",
    description:
      "We hand your pet to you with all paperwork, then check in a few days later to see how they’ve settled.",
  },
];

const carePoints = [
  {
    Icon: FiThermometer,
    title: "Comfort-first handling",
    description:
      "Climate-controlled transport and frequent rest stops keep stress low and tails wagging.",
  },
  {
    Icon: FiMapPin,
    title: "Live tracking",
    description:
      "Get real-time location updates and photos so you always know where your new friend is.",
  },
  {
    Icon: FiClock,
    title: "Flexible scheduling",
    description:
      "Pick a travel window that fits your week — weekend and evening arrivals available.",
  },
];

export default function ShippingPage() {
  return (
    <main className="bg-cream">
      <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Shipping & Delivery"
          title="Safe travels, all the way home"
          subtitle="From local pickup to door-to-door flight nannies, every PawVerse delivery is built around your pet’s comfort, safety, and a smooth arrival."
        />

        {/* Delivery options */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {options.map(({ Icon, title, eta, price, description }) => (
            <div
              key={title}
              className="flex h-full flex-col rounded-[1.75rem] border border-sand-dark/70 bg-white p-7 shadow-xl shadow-ink/5 transition hover:-translate-y-1 hover:border-clay/60"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay text-cream">
                <Icon size={20} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                {description}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-sand-dark/60 pt-5">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[1px] text-ink-soft">
                  <FiClock size={14} /> {eta}
                </span>
                <span className="text-sm font-semibold text-clay">{price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Process timeline */}
        <div className="mt-24">
          <SectionHeading
            eyebrow="The Journey"
            title="How delivery works"
            subtitle="A clear, four-step process from booking to a wagging-tail welcome."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ Icon, step, title, description }) => (
              <div
                key={step}
                className="relative flex h-full flex-col rounded-[1.75rem] border border-sand-dark/70 bg-white p-7 shadow-xl shadow-ink/5"
              >
                <span className="absolute right-6 top-6 font-display text-3xl font-semibold text-sand-dark">
                  {step}
                </span>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-olive text-cream">
                  <Icon size={20} />
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Care highlights */}
        <div className="mt-24 rounded-[2rem] border border-sand-dark/70 bg-sand p-8 shadow-xl shadow-ink/5 sm:p-12">
          <div className="grid gap-8 sm:grid-cols-3">
            {carePoints.map(({ Icon, title, description }) => (
              <div key={title}>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-clay">
                  <Icon size={18} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Coverage + CTA */}
        <div className="mt-20 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-[2rem] border border-sand-dark/70 bg-white p-8 shadow-xl shadow-ink/5">
            <h3 className="text-xl font-semibold text-ink">
              Delivery coverage & timing
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              We deliver pets to homes across the United States and Canada.
              Final pricing depends on distance, delivery type, and your pet’s
              size — your exact quote is shown at checkout before you confirm.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-sand-dark/70 bg-cream p-5">
                <p className="text-xs uppercase tracking-[2px] text-ink-soft">
                  Coverage area
                </p>
                <p className="mt-2 text-sm font-semibold text-ink">🇨🇦 Canada</p>
              </div>
              <div className="rounded-3xl border border-sand-dark/70 bg-cream p-5">
                <p className="text-xs uppercase tracking-[2px] text-ink-soft">
                  Typical arrival
                </p>
                <p className="mt-2 text-sm font-semibold text-ink">
                  1–5 days after booking
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-[2rem] border border-sand-dark/70 bg-ink p-8 text-center shadow-xl shadow-ink/10">
            <h3 className="font-display text-2xl font-semibold text-cream">
              Ready to bring one home?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              Browse available pets and we’ll handle the journey to your door.
            </p>
            <Link
              href="/browse-pets"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-clay px-8 py-4 text-sm font-semibold uppercase tracking-[1px] text-cream transition hover:bg-clay-dark"
            >
              Browse pets
            </Link>
            <Link
              href="/contact"
              className="mt-3 text-sm font-medium text-cream/70 transition hover:text-cream"
            >
              Questions about delivery? Contact us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
