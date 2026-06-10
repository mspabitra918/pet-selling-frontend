import Image from "next/image";
import Link from "next/link";
import { FiMapPin } from "react-icons/fi";
import { MdVerified, MdOutlineFavoriteBorder } from "react-icons/md";
import { formatPrice, getBreeder, type Pet } from "@/src/lib/data";

type PetCardProps = {
  pet: Pet;
};

export default function PetCard({ pet }: PetCardProps) {
  const breeder = getBreeder(pet.breederId);
  const flag = pet.country === "CA" ? "🇨🇦" : "🇺🇸";

  return (
    <Link
      href={`/pet/${pet.id}?id=${pet.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-sand-dark/60 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={pet.image}
          alt={`${pet.breed} named ${pet.name}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-ink/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[1px] text-cream backdrop-blur">
          {pet.species}
        </span>
        <span
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-soft opacity-0 shadow transition group-hover:opacity-100 hover:text-clay"
          aria-hidden
        >
          <MdOutlineFavoriteBorder size={18} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold leading-tight text-ink">
              {pet.name}
            </h3>
            <p className="text-sm text-ink-soft">{pet.breed}</p>
          </div>
          <p className="shrink-0 font-display text-lg font-semibold text-clay">
            {formatPrice(pet.priceUsd)}
          </p>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-sand px-2.5 py-0.5 text-[11px] font-medium text-ink-soft">
            {pet.gender}
          </span>
          <span className="rounded-full bg-sand px-2.5 py-0.5 text-[11px] font-medium text-ink-soft">
            {pet.ageLabel}
          </span>
          {pet.badges.slice(0, 1).map((b) => (
            <span
              key={b}
              className="rounded-full bg-olive/12 px-2.5 py-0.5 text-[11px] font-medium text-olive-dark"
            >
              {b}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-sand-dark/50 pt-3 text-xs text-ink-soft">
          <span className="flex items-center gap-1">
            <FiMapPin size={13} className="text-clay" />
            {pet.city}, {pet.region} {flag}
          </span>
          {breeder?.verified && (
            <span className="flex items-center gap-1 text-olive-dark">
              <MdVerified size={14} /> Verified
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
