import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MdVerified, MdStar, MdOutlinePets } from "react-icons/md";
import { FiArrowRight, FiShield, FiHeart } from "react-icons/fi";
import SectionHeading from "@/src/components/ui/SectionHeading";
import CtaBand from "@/src/components/home/CtaBand";
import { breeders, pets, stats } from "@/src/lib/data";

export const metadata: Metadata = {
  title: "Verified Breeders",
  description:
    "Browse PawVerse's network of vetted, verified breeders across the US and Canada. Every breeder passes identity, health, and ethics checks before listing.",
};

const screening = [
  {
    icon: <FiShield size={20} />,
    title: "Identity & licensing",
    body: "Government ID, breeding licenses, and facility records are verified before any listing goes live.",
  },
  {
    icon: <FiHeart size={20} />,
    title: "Health & welfare",
    body: "Genetic testing, vaccination protocols, and living conditions are reviewed by our veterinary partners.",
  },
  {
    icon: <MdStar size={20} />,
    title: "Ongoing reputation",
    body: "Verified buyer reviews and response times keep every breeder accountable, long after they join.",
  },
];

export default function BreedersPage() {
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
              The people behind the pets
              <span className="h-px w-6 bg-clay/50" />
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Breeders worth trusting
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
              Every breeder on PawVerse passes a multi-point screening for
              licensing, health testing, and facility standards. Get to know
              them before you ever commit.
            </p>
          </div>

          <dl className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-sand-dark/60 bg-white/70 px-4 py-5 text-center shadow-sm shadow-ink/5"
              >
                <dt className="font-display text-2xl font-semibold text-clay sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs font-medium uppercase tracking-[1.5px] text-ink-soft">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Breeder directory */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The directory"
          title="Meet our verified breeders"
          subtitle="Real, vetted breeders with verified track records — not anonymous listings. Each profile is transparent and accountable."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {breeders.map((b) => {
            const flag = b.country === "CA" ? "🇨🇦" : "🇺🇸";
            const available = pets.filter(
              (p) => p.breederId === b.id && p.availability !== "Sold",
            ).length;
            return (
              <article
                key={b.id}
                className="flex flex-col rounded-2xl border border-sand-dark/60 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-sand">
                    <Image
                      src={b.avatar}
                      alt={b.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="flex items-center gap-1.5 font-display text-lg font-semibold leading-tight text-ink">
                      {b.kennel}
                      {b.verified && (
                        <MdVerified className="text-olive" size={17} />
                      )}
                    </h3>
                    <p className="text-sm text-ink-soft">by {b.name}</p>
                    <p className="text-sm text-ink-soft">
                      {b.city}, {b.region} {flag}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm text-ink-soft">{b.specialty}</p>

                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-sand-dark/50 pt-4 text-sm">
                  <span className="flex items-center gap-1 font-semibold text-ink">
                    <MdStar className="text-gold" size={18} />
                    {b.rating.toFixed(1)}
                    <span className="font-normal text-ink-soft">
                      ({b.reviews})
                    </span>
                  </span>
                  <span className="text-right text-ink-soft">
                    {b.yearsActive} yrs active
                  </span>
                  {/* <span className="flex items-center gap-1.5 text-ink-soft">
                    <MdOutlinePets className="text-clay" size={16} />
                    {available} available
                  </span> */}
                  {/* {b.verified && (
                    <span className="flex items-center justify-end gap-1 text-olive-dark">
                      <MdVerified size={14} /> Verified
                    </span>
                  )} */}
                </div>

                <Link
                  href="/browse-pets"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[1px] text-clay transition hover:gap-2.5"
                >
                  View available pets <FiArrowRight />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      {/* Screening process */}
      <section className="border-y border-sand-dark/60 bg-sand">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our standards"
            title="How a breeder earns the badge"
            subtitle="Verification isn't a one-time checkbox. Here's what every breeder clears before — and after — they join PawVerse."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {screening.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-sand-dark/60 bg-white p-7 shadow-sm shadow-ink/5"
              >
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
        </div>
      </section>

      <CtaBand />
    </div>
  );
}
