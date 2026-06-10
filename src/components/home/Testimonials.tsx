import Image from "next/image";
import { MdFormatQuote, MdStar } from "react-icons/md";
import SectionHeading from "@/src/components/ui/SectionHeading";
import { testimonials } from "@/src/lib/data";

export default function Testimonials() {
  return (
    <section className="bg-sand/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Loved by families"
          title="Happy homes, healthy pets"
          subtitle="Thousands of families across North America have found their companion through PawVerse."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="flex flex-col rounded-2xl border border-sand-dark/60 bg-white p-7 shadow-sm"
            >
              <MdFormatQuote className="text-clay/30" size={40} />
              <blockquote className="mt-2 flex-1 text-[15px] leading-relaxed text-ink">
                {t.quote}
              </blockquote>
              <div className="mt-5 flex items-center gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <MdStar key={i} size={16} />
                ))}
              </div>
              <figcaption className="mt-4 flex items-center gap-3 border-t border-sand-dark/50 pt-4">
                <div className="relative h-11 w-11 overflow-hidden rounded-full">
                  <Image
                    src={t.avatar}
                    alt={t.author}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink">{t.author}</p>
                  <p className="text-xs text-ink-soft">
                    {t.location} · {t.pet}
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
