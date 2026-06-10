import type { Metadata } from "next";
import Link from "next/link";
import {
  FiShield,
  FiHeart,
  FiCheckCircle,
  FiFileText,
  FiActivity,
  FiCalendar,
  FiPhoneCall,
} from "react-icons/fi";
import SectionHeading from "@/src/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Health Guarantee",
  description:
    "Every pet on PawVerse comes with a written health guarantee — vet checks, congenital coverage, and a clear claim process for total peace of mind.",
};

const pillars = [
  {
    Icon: FiActivity,
    title: "Certified vet check",
    description:
      "Every pet receives a full veterinary examination within 72 hours before going home, with documented results shared with you.",
  },
  {
    Icon: FiShield,
    title: "1-year congenital coverage",
    description:
      "We cover life-threatening congenital and hereditary conditions for the first 12 months after your pet arrives home.",
  },
  {
    Icon: FiHeart,
    title: "Up-to-date vaccinations",
    description:
      "Pets are age-appropriately vaccinated, dewormed, and microchipped before delivery — records included.",
  },
  {
    Icon: FiFileText,
    title: "Written guarantee",
    description:
      "You receive a signed health guarantee document detailing exactly what is covered and for how long.",
  },
];

const covered = [
  "Congenital and hereditary defects that affect quality of life",
  "Life-threatening conditions present at the time of sale",
  "A clean bill of health from a licensed veterinarian at pickup",
  "Replacement pet or refund if a covered condition is confirmed",
];

const notCovered = [
  "Conditions caused by injury, neglect, or improper care after delivery",
  "Common parasites or minor illnesses treatable with routine care",
  "Cosmetic traits such as coat color, markings, or adult size",
  "Claims filed without supporting veterinary documentation",
];

const steps = [
  {
    Icon: FiCalendar,
    step: "01",
    title: "Visit your vet within 7 days",
    description:
      "Schedule a wellness exam with a licensed veterinarian within 7 days of bringing your pet home.",
  },
  {
    Icon: FiFileText,
    step: "02",
    title: "Gather documentation",
    description:
      "Collect your vet’s written diagnosis, test results, and any related medical records.",
  },
  {
    Icon: FiPhoneCall,
    step: "03",
    title: "Contact PawVerse support",
    description:
      "Submit your claim to our support team. We review most claims within 5 business days.",
  },
  {
    Icon: FiCheckCircle,
    step: "04",
    title: "Resolution",
    description:
      "Once approved, we coordinate covered veterinary costs, a replacement, or a refund per your guarantee.",
  },
];

export default function GuaranteePage() {
  return (
    <main className="bg-cream">
      <section className="container mx-auto px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Health Guarantee"
          title="Healthy pets, backed in writing"
          subtitle="Adopting a pet is a lifelong commitment — our health guarantee makes sure you start that journey with confidence and total peace of mind."
        />

        {/* Pillars */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ Icon, title, description }) => (
            <div
              key={title}
              className="flex h-full flex-col rounded-[1.75rem] border border-sand-dark/70 bg-white p-7 shadow-xl shadow-ink/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-olive text-cream">
                <Icon size={20} />
              </span>
              <h3 className="mt-5 text-lg font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Covered / not covered */}
        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-sand-dark/70 bg-white p-8 shadow-xl shadow-ink/5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-olive text-cream">
                <FiCheckCircle size={18} />
              </span>
              <h3 className="text-xl font-semibold text-ink">
                What’s covered
              </h3>
            </div>
            <ul className="mt-6 space-y-4">
              {covered.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-ink-soft">
                  <FiCheckCircle
                    className="mt-0.5 shrink-0 text-olive"
                    size={18}
                  />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[2rem] border border-sand-dark/70 bg-white p-8 shadow-xl shadow-ink/5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-clay text-cream">
                <FiFileText size={18} />
              </span>
              <h3 className="text-xl font-semibold text-ink">
                What’s not covered
              </h3>
            </div>
            <ul className="mt-6 space-y-4">
              {notCovered.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-ink-soft">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Claim steps */}
        <div className="mt-24">
          <SectionHeading
            eyebrow="Filing a Claim"
            title="How to use your guarantee"
            subtitle="If a covered condition appears, we make the claim process simple and fair."
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
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay text-cream">
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

        {/* CTA */}
        <div className="mt-24 rounded-[2rem] border border-sand-dark/70 bg-sand p-10 text-center shadow-xl shadow-ink/5 sm:p-14">
          <h3 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            Questions about coverage?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-soft">
            Our team is happy to walk you through your health guarantee before
            and after you bring your new companion home.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-clay px-8 py-4 text-sm font-semibold uppercase tracking-[1px] text-cream transition hover:bg-clay-dark"
            >
              Contact support
            </Link>
            <Link
              href="/help"
              className="inline-flex items-center justify-center rounded-full border border-sand-dark bg-white px-8 py-4 text-sm font-semibold uppercase tracking-[1px] text-ink transition hover:border-clay hover:text-clay"
            >
              Visit help center
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
