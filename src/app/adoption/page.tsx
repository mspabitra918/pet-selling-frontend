import type { Metadata } from "next";
import Link from "next/link";
import {
  FiArrowRight,
  FiSearch,
  FiMessageCircle,
  FiShield,
  FiHome,
  FiCheckCircle,
} from "react-icons/fi";
import PetCard from "@/src/components/ui/PetCard";
import SectionHeading from "@/src/components/ui/SectionHeading";
import CtaBand from "@/src/components/home/CtaBand";
import { pets } from "@/src/lib/data";

export const metadata: Metadata = {
  title: "Adoption",
  description:
    "Adopt a healthy, ethically raised pet through PawVerse. A transparent, escrow-protected process with verified breeders and a 14-day health guarantee.",
};

const steps = [
  {
    icon: <FiSearch size={20} />,
    step: "01",
    title: "Browse & shortlist",
    body: "Filter by species, breed, age, and location. Every listing shows transparent health records and breeder credentials.",
  },
  {
    icon: <FiMessageCircle size={20} />,
    step: "02",
    title: "Connect & verify",
    body: "Message the breeder, request vet records, and schedule a video meet-and-greet — all inside PawVerse before you commit.",
  },
  {
    icon: <FiShield size={20} />,
    step: "03",
    title: "Reserve securely",
    body: "Place a deposit held safely in escrow. Funds release to the breeder only once your pet is confirmed delivered and healthy.",
  },
  {
    icon: <FiHome size={20} />,
    step: "04",
    title: "Welcome home",
    body: "Insured nationwide transport, a 14-day written health guarantee, and onboarding support for your first weeks together.",
  },
];

const requirements = [
  "Be 18 years or older with a valid government ID",
  "Provide a safe, suitable home environment for the breed",
  "Commit to routine veterinary care and vaccinations",
  "Agree to the breeder's spay/neuter and rehoming terms",
  "Complete a short lifestyle questionnaire for the right match",
];

const faqs = [
  {
    q: "How is PawVerse different from a classifieds site?",
    a: "Every breeder is screened for licensing, health testing, and facility standards before they can list. Payments are escrow-protected and each pet ships with a written health guarantee.",
  },
  {
    q: "What does the health guarantee cover?",
    a: "Each pet arrives vet-checked and vaccinated, backed by a 14-day written guarantee against undisclosed congenital health conditions.",
  },
  {
    q: "Can I meet the pet before adopting?",
    a: "Yes. You can message the breeder and schedule a live video meet-and-greet, and request additional vet records, before placing any deposit.",
  },
  {
    q: "How does delivery work?",
    a: "Choose local pickup, airport delivery, or climate-controlled nationwide transport. All shipping options are insured and tracked door-to-door.",
  },
];

export default function AdoptionPage() {
  const availablePets = pets
    .filter((p) => p.availability !== "Sold")
    .slice(0, 6);

  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-sand-dark/60 bg-sand">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-clay/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-olive/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[3px] text-clay">
              <span className="h-px w-6 bg-clay/50" />
              A premium adoption journey
              <span className="h-px w-6 bg-clay/50" />
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Adopt with confidence and care
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
              From your first search to your pet&apos;s first night home, every
              step is transparent, protected, and built around the wellbeing of
              the animal.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/browse-pets"
                className="inline-flex items-center gap-2 rounded-full bg-clay px-7 py-3.5 text-sm font-semibold uppercase tracking-[1.5px] text-cream transition hover:bg-clay-dark"
              >
                Browse available pets <FiArrowRight />
              </Link>
              <Link
                href="/breeders"
                className="inline-flex items-center gap-2 rounded-full border border-clay/40 px-7 py-3.5 text-sm font-semibold uppercase tracking-[1.5px] text-clay transition hover:bg-clay/5"
              >
                Meet the breeders
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How adoption works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The process"
          title="How adoption works"
          subtitle="Four simple, protected steps from browsing to bringing your new companion home."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.step}
              className="relative flex flex-col rounded-2xl border border-sand-dark/60 bg-white p-7 shadow-sm shadow-ink/5"
            >
              <span className="absolute right-6 top-6 font-display text-4xl font-semibold text-sand-dark">
                {s.step}
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-clay text-cream">
                {s.icon}
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Available now */}
      <section className="border-y border-sand-dark/60 bg-sand">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              align="left"
              eyebrow="Ready for a home"
              title="Available for adoption now"
              subtitle="A selection of healthy, vetted companions waiting to meet their families."
            />
            <Link
              href="/browse-pets"
              className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[1px] text-clay transition hover:gap-2.5"
            >
              View all <FiArrowRight />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {availablePets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </div>
      </section>

      {/* Requirements + FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Before you apply"
              title="Adoption requirements"
              subtitle="A few simple commitments help us make sure every pet lands in the right home."
            />
            <ul className="mt-8 space-y-4">
              {requirements.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-3 rounded-2xl border border-sand-dark/60 bg-white p-5 text-sm text-ink shadow-sm shadow-ink/5"
                >
                  <FiCheckCircle
                    className="mt-0.5 shrink-0 text-olive"
                    size={18}
                  />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <SectionHeading
              align="left"
              eyebrow="Good to know"
              title="Frequently asked questions"
              subtitle="The essentials about adopting through PawVerse."
            />
            <div className="mt-8 space-y-4">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group rounded-2xl border border-sand-dark/60 bg-white p-6 shadow-sm shadow-ink/5"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-lg font-semibold text-ink marker:content-none">
                    {f.q}
                    <span className="shrink-0 text-clay transition group-open:rotate-45">
                      <FiArrowRight className="rotate-45" size={18} />
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
