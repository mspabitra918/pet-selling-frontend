"use client";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import SectionHeading from "@/src/components/ui/SectionHeading";
import PetCard from "@/src/components/ui/PetCard";
import { Pet, pets } from "@/src/lib/data";
import { useEffect, useState } from "react";
import { useApi } from "@/src/lib/api";

export default function FeaturedPets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const api = useApi();
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const { data } = await api.get<Pet[]>("/pets");
        setPets(data);
      } catch (error) {
        console.error("Failed to fetch pets", error);
      }
    };

    fetchPets();
  }, [api]);

  return (
    <section className="bg-sand/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow="Newly listed"
            title="Featured companions"
            subtitle="Hand-picked pups, kittens, and birds ready to meet their new families this week."
          />
          <Link
            href="/browse-pets"
            className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-ink/15 px-5 py-2.5 text-sm font-semibold uppercase tracking-[1.5px] text-ink transition hover:border-clay hover:text-clay sm:self-auto"
          >
            View all
            <FiArrowRight />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pets.slice(0, 8).map((pet) => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </section>
  );
}
