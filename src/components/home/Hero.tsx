"use client";
import Image from "next/image";
import Link from "next/link";
import { FiSearch, FiMapPin } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { stats } from "@/src/lib/data";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {
    router.push(`/browse-pets?search=${encodeURIComponent(searchQuery)}`);
  };
  return (
    <section className="relative overflow-hidden bg-cream">
      {/* warm ambient glow */}
      <div className="pointer-events-none absolute -right-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-clay/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-[28rem] w-[28rem] rounded-full bg-olive/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:py-24">
        {/* Copy */}
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-sand-dark bg-sand/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[2px] text-ink-soft">
            <MdVerified className="text-olive" /> Trusted across the Canada
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Find your next
            <span className="block text-clay">best friend.</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
            A premium marketplace for healthy, ethically raised pets —
            connecting loving homes with breeders we&apos;ve personally vetted.
          </p>

          {/* Search bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="mt-8 flex max-w-md flex-col gap-3 rounded-2xl border border-sand-dark/70 bg-white/70 p-3 shadow-sm sm:flex-row sm:items-center sm:rounded-full sm:p-2"
          >
            <div className="flex flex-1 items-center gap-2 px-3">
              <FiSearch className="shrink-0 text-clay" size={18} />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Breed, e.g. Golden Retriever"
                className="w-full bg-transparent py-2 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none"
              />
            </div>
            {/* <div className="hidden h-6 w-px bg-sand-dark sm:block" />
            <div className="flex items-center gap-2 px-3">
              <FiMapPin className="shrink-0 text-clay" size={17} />
              <input
                type="text"
                placeholder="Canada"
                className="w-full bg-transparent py-2 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none sm:w-28"
              />
            </div> */}
            <button
              // href="/browse-pets"
              className="rounded-full bg-clay px-6 py-3 text-center text-sm font-semibold uppercase tracking-[1.5px] text-cream transition hover:bg-clay-dark"
            >
              Search
            </button>
          </form>

          {/* Stats */}
          <dl className="mt-10 grid max-w-md grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.slice(0, 3).map((s) => (
              <div key={s.label}>
                <dt className="font-display text-2xl font-semibold text-ink">
                  {s.value}
                </dt>
                <dd className="mt-1 text-xs leading-snug text-ink-soft">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Imagery */}
        <div className="relative animate-rise [animation-delay:120ms]">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl shadow-ink/10">
            <Image
              src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80"
              alt="A happy puppy looking up"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Floating verified card */}
          <div className="absolute -left-4 top-10 hidden items-center gap-3 rounded-2xl border border-sand-dark/60 bg-white/90 px-4 py-3 shadow-xl backdrop-blur sm:flex">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-olive/15 text-olive">
              <MdVerified size={22} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">Vetted breeders</p>
              <p className="text-xs text-ink-soft">
                Health-checked &amp; verified
              </p>
            </div>
          </div>

          {/* Floating rating card */}
          <div className="absolute -bottom-5 right-2 flex items-center gap-3 rounded-2xl border border-sand-dark/60 bg-white/90 px-4 py-3 shadow-xl backdrop-blur sm:right-6">
            <span className="font-display text-2xl font-semibold text-clay">
              4.9
            </span>
            <div>
              <p className="text-xs font-semibold text-ink">★★★★★</p>
              <p className="text-xs text-ink-soft">12,000+ happy homes</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
