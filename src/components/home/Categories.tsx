import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import SectionHeading from "@/src/components/ui/SectionHeading";
import { categories } from "@/src/lib/data";

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Browse by companion"
        title="Find the right kind of love"
        subtitle="From energetic pups to gentle lap cats and bright, talkative birds — every listing comes from a breeder we trust."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/${cat.slug}`}
            className="group relative overflow-hidden rounded-3xl border border-sand-dark/60 shadow-sm transition duration-300 hover:shadow-xl hover:shadow-ink/10"
          >
            <div className="relative aspect-[5/6] w-full overflow-hidden sm:aspect-[4/5]">
              <Image
                src={cat.image}
                alt={cat.label}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 text-cream">
              <p className="text-xs font-semibold uppercase tracking-[2px] text-cream/80">
                {cat.count.toLocaleString()} available
              </p>
              <div className="mt-1 flex items-center justify-between">
                <h3 className="font-display text-2xl font-semibold">
                  {cat.label}
                </h3>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream/15 backdrop-blur transition group-hover:bg-clay">
                  <FiArrowUpRight size={20} />
                </span>
              </div>
              <p className="mt-1 text-sm text-cream/85">{cat.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
