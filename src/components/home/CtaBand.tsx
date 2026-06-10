import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function CtaBand() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-clay px-8 py-16 text-center text-cream sm:px-16 sm:py-20">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-cream/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-ink/10 blur-2xl" />

        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
            Ready to meet your new best friend?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-cream/85">
            Join thousands of families across the US and Canada who found their
            pet the premium way — safely, transparently, and with love.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/browse-pets"
              className="inline-flex items-center gap-2 rounded-full bg-cream px-7 py-3.5 text-sm font-semibold uppercase tracking-[1.5px] text-ink transition hover:bg-white"
            >
              Browse pets <FiArrowRight />
            </Link>
            <Link
              href="/list-pet"
              className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-7 py-3.5 text-sm font-semibold uppercase tracking-[1.5px] text-cream transition hover:bg-cream/10"
            >
              Become a breeder
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
