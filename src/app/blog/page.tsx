import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiClock } from "react-icons/fi";
import SectionHeading from "@/src/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Expert guides on choosing, raising, and caring for your new pet — from puppy nutrition to bringing home a rescue, written by PawVerse vets and breeders.",
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
};

const posts: Post[] = [
  {
    slug: "first-week-with-a-new-puppy",
    title: "The first week with a new puppy: a calm-start checklist",
    excerpt:
      "Those first seven days shape everything. Here's how to set up your home, your routine, and your puppy for a confident, stress-free start.",
    category: "New Owners",
    author: "Dr. Elena Marsh, DVM",
    date: "May 28, 2026",
    readTime: "8 min read",
    image: img("photo-1601758228041-f3b2795255f1"),
    featured: true,
  },
  {
    slug: "choosing-the-right-breed",
    title: "How to choose the right breed for your lifestyle",
    excerpt:
      "Energy level, space, grooming, and time all matter more than looks. A practical framework for matching a breed to your real life.",
    category: "Buying Guide",
    author: "Hannah Reyes",
    date: "May 21, 2026",
    readTime: "6 min read",
    image: img("photo-1543466835-00a7907e9de1"),
  },
  {
    slug: "spotting-a-responsible-breeder",
    title: "10 signs of a responsible, ethical breeder",
    excerpt:
      "Health testing, transparency, and lifelong support separate great breeders from the rest. Here's exactly what to look for.",
    category: "Buying Guide",
    author: "Daniel Tremblay",
    date: "May 14, 2026",
    readTime: "7 min read",
    image: img("photo-1450778869180-41d0601e046e"),
  },
  {
    slug: "kitten-nutrition-basics",
    title: "Kitten nutrition basics: feeding for healthy growth",
    excerpt:
      "From weaning to the first year, what to feed, how often, and the common mistakes that set kittens back.",
    category: "Health & Care",
    author: "Mei Lin",
    date: "May 7, 2026",
    readTime: "5 min read",
    image: img("photo-1574158622682-e40e69881006"),
  },
  {
    slug: "settling-in-an-anxious-pet",
    title: "Helping an anxious pet settle into a new home",
    excerpt:
      "Decompression takes time. Gentle, science-backed steps to build trust and help a nervous companion feel safe.",
    category: "Health & Care",
    author: "Dr. Elena Marsh, DVM",
    date: "April 30, 2026",
    readTime: "9 min read",
    image: img("photo-1450778869180-41d0601e046e"),
  },
  {
    slug: "hand-raised-birds-guide",
    title: "What hand-raised really means for pet birds",
    excerpt:
      "Socialization in the early weeks defines a bird's temperament for life. A look inside ethical hand-rearing.",
    category: "Health & Care",
    author: "Hannah Reyes",
    date: "April 23, 2026",
    readTime: "6 min read",
    image: img("photo-1552728089-57bdde30beb3"),
  },
  {
    slug: "safe-pet-transport",
    title: "Inside insured, climate-controlled pet transport",
    excerpt:
      "How modern nationwide delivery keeps pets calm, safe, and tracked from the breeder's door to yours.",
    category: "Behind the Scenes",
    author: "PawVerse Team",
    date: "April 16, 2026",
    readTime: "4 min read",
    image: img("photo-1583337130417-3346a1be7dee"),
  },
];

const categories = [
  "All",
  "New Owners",
  "Buying Guide",
  "Health & Care",
  "Behind the Scenes",
];

export default function BlogPage() {
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured.slug);

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
              The PawVerse journal
              <span className="h-px w-6 bg-clay/50" />
            </span>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Guides for a happier pet
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-soft">
              Expert advice on choosing, raising, and caring for your companion
              — written by our veterinary partners and verified breeders.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {categories.map((c) => (
              <span
                key={c}
                className={`rounded-full border px-4 py-2 text-[13px] font-medium uppercase tracking-[1px] transition ${
                  c === "All"
                    ? "border-clay bg-clay text-cream"
                    : "border-sand-dark/70 bg-white/70 text-ink-soft hover:border-clay hover:text-clay"
                }`}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Link
          href={`/blog/${featured.slug}`}
          className="group grid overflow-hidden rounded-[2rem] border border-sand-dark/60 bg-white shadow-sm transition hover:shadow-xl hover:shadow-ink/10 lg:grid-cols-2"
        >
          <div className="relative aspect-[16/11] overflow-hidden lg:aspect-auto">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            <span className="absolute left-4 top-4 rounded-full bg-clay px-3 py-1 text-[11px] font-semibold uppercase tracking-[1px] text-cream">
              Featured
            </span>
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-12">
            <span className="text-xs font-semibold uppercase tracking-[2px] text-clay">
              {featured.category}
            </span>
            <h2 className="mt-4 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              {featured.excerpt}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-soft">
              <span className="font-medium text-ink">{featured.author}</span>
              <span>{featured.date}</span>
              <span className="flex items-center gap-1">
                <FiClock size={13} /> {featured.readTime}
              </span>
            </div>
            <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[1px] text-clay transition group-hover:gap-2.5">
              Read article <FiArrowRight />
            </span>
          </div>
        </Link>
      </section>

      {/* Article grid */}
      <section className="border-t border-sand-dark/60 bg-sand">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeading
            align="left"
            eyebrow="Latest articles"
            title="From the journal"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-sand-dark/60 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-ink/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[1px] text-cream backdrop-blur">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-lg font-semibold leading-snug text-ink transition group-hover:text-clay">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-soft">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-sand-dark/50 pt-4 text-xs text-ink-soft">
                    <span className="font-medium text-ink">{post.author}</span>
                    <span className="flex items-center gap-1">
                      <FiClock size={12} /> {post.readTime}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-clay px-8 py-16 text-center text-cream sm:px-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cream/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-ink/10 blur-2xl" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Get the journal in your inbox
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-cream/85">
              Practical pet-care guides and new listings, once a week. No spam —
              unsubscribe anytime.
            </p>
            <form className="mx-auto mt-9 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-full border border-cream/30 bg-cream/10 px-6 py-3.5 text-sm text-cream placeholder:text-cream/60 outline-none transition focus:border-cream"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-semibold uppercase tracking-[1.5px] text-ink transition hover:bg-white"
              >
                Subscribe <FiArrowRight />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
