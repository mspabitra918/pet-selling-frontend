import Image from "next/image";
import Link from "next/link";
import { MdVerified, MdStar } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import SectionHeading from "@/src/components/ui/SectionHeading";
import { breeders } from "@/src/lib/data";

export default function FeaturedBreeders() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Meet the people"
        title="Breeders worth trusting"
        subtitle="Real, vetted breeders with verified track records — not anonymous listings. Get to know them before you ever commit."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {breeders.map((b) => {
          const flag = b.country === "CA" ? "🇨🇦" : "🇺🇸";
          return (
            <div
              key={b.id}
              className="flex flex-col rounded-2xl border border-sand-dark/60 bg-white p-6 shadow-sm transition hover:shadow-lg hover:shadow-ink/5"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-sand">
                  <Image
                    src={b.avatar}
                    alt={b.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="flex items-center gap-1.5 font-display text-lg font-semibold text-ink">
                    {b.kennel}
                    {b.verified && (
                      <MdVerified className="text-olive" size={17} />
                    )}
                  </h3>
                  <p className="text-sm text-ink-soft">
                    {b.city}, {b.region} {flag}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm text-ink-soft">{b.specialty}</p>

              <div className="mt-5 flex items-center justify-between border-t border-sand-dark/50 pt-4 text-sm">
                <span className="flex items-center gap-1 font-semibold text-ink">
                  <MdStar className="text-gold" size={18} />
                  {b.rating.toFixed(1)}
                  <span className="font-normal text-ink-soft">
                    ({b.reviews})
                  </span>
                </span>
                <span className="text-ink-soft">
                  {b.yearsActive} yrs active
                </span>
              </div>

              {/* <Link
                href={`/breeders/${b.id}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[1px] text-clay transition hover:gap-2.5"
              >
                View profile <FiArrowRight />
              </Link> */}
            </div>
          );
        })}
      </div>
    </section>
  );
}
