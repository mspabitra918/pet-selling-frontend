import { MdVerified, MdFavorite } from "react-icons/md";
import { FiLock, FiTruck } from "react-icons/fi";
import type { IconType } from "react-icons";
import { trustPillars, stats } from "@/src/lib/data";

const icons: Record<string, IconType> = {
  shield: MdVerified,
  heart: MdFavorite,
  lock: FiLock,
  truck: FiTruck,
};

export default function WhyChooseUs() {
  return (
    <section className="bg-ink py-20 text-cream">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          {/* Left: heading + stats */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[3px] text-gold">
              <span className="h-px w-6 bg-gold/50" /> Why PawVerse
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Premium isn&apos;t a price tag — it&apos;s peace of mind.
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-cream/70">
              Buying a pet online should never feel risky. Every part of PawVerse
              is built to protect both the families and the animals we serve
              across the US and Canada.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-cream/15 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-3xl font-semibold text-gold">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-sm text-cream/65">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: pillars */}
          <div className="grid gap-5 sm:grid-cols-2">
            {trustPillars.map((p) => {
              const Icon = icons[p.icon] ?? MdVerified;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-cream/12 bg-cream/[0.04] p-6 transition hover:border-gold/40 hover:bg-cream/[0.07]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-gold">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/65">
                    {p.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
