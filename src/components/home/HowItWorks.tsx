import SectionHeading from "@/src/components/ui/SectionHeading";
import { howItWorks } from "@/src/lib/data";

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="How PawVerse works"
        title="A calmer way to welcome a pet"
        subtitle="We handle the trust, the logistics, and the paperwork — so you can focus on the wagging tail at the end of it."
      />

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {howItWorks.map((s, i) => (
          <div key={s.step} className="relative">
            <span className="font-display text-5xl font-semibold text-sand-dark">
              {s.step}
            </span>
            {i < howItWorks.length - 1 && (
              <span className="absolute right-0 top-7 hidden h-px w-1/2 bg-sand-dark lg:block" />
            )}
            <h3 className="mt-3 font-display text-xl font-semibold text-ink">
              {s.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
