"use client";
import PetCard from "@/src/components/ui/PetCard";
import { type Pet } from "@/src/lib/data";
import { useEffect, useMemo, useState } from "react";
import { IoReturnDownBack } from "react-icons/io5";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useApi } from "@/src/lib/api";
import axios from "axios";

export default function AllPetPages() {
  const param = useSearchParams();
  const search = param.get("search") || "";
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState(search);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);

  const api = useApi();

  useEffect(() => {
    setSearchQuery(search);
  }, [search]);

  // Debounce the search text so typing doesn't fire a request per keystroke.
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 350);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPets = async () => {
      // Filters are applied server-side. Multi-selects/buckets are sent as
      // comma-separated lists; the backend maps the bucket keys to ranges.
      const params: Record<string, string> = {};
      if (debouncedSearch.trim()) params.name = debouncedSearch.trim();
      if (selectedGenders.length) params.gender = selectedGenders.join(",");
      if (selectedSpecies.length) params.species = selectedSpecies.join(",");
      if (selectedPrices.length) params.price = selectedPrices.join(",");
      if (selectedAges.length) params.age = selectedAges.join(",");

      try {
        const { data } = await api.get<Pet[]>("/pets", {
          params,
          signal: controller.signal,
        });
        setPets(data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Failed to fetch pets", error);
        }
      }
    };

    fetchPets();
    return () => controller.abort();
  }, [
    api,
    debouncedSearch,
    selectedGenders,
    selectedSpecies,
    selectedPrices,
    selectedAges,
  ]);

  const searchQueryTokens = useMemo(() => {
    const normalized = (searchQuery || search).trim().toLowerCase();
    return normalized ? normalized.split(/\s+/) : [];
  }, [searchQuery, search]);

  const toggleSelection = (
    value: string,
    selected: string[],
    setSelected: (next: string[]) => void,
  ) => {
    setSelected(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
  };

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => {
          router.back();
        }}
        className="mb-6 rounded-sm border border-clay px-4 py-1 text-sm font-semibold uppercase tracking-[1px] text-clay transition hover:bg-clay hover:text-cream cursor-pointer"
      >
        <IoReturnDownBack size={24} />
      </button>
      <div className="">
        <h1 className="text-4xl font-semibold text-ink">Browse Pets</h1>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          Filter by name, age, gender, and price to find the right companion
          fast.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-6 rounded-[0.5rem] border border-sand-dark/70 bg-white p-6 shadow-sm shadow-ink/5">
          <div>
            <label
              className="block text-sm font-semibold text-ink"
              htmlFor="pet-search"
            >
              Search by name or breed
            </label>
            <input
              id="pet-search"
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search Luna, Husky, Pomeranian..."
              className="mt-3 w-full rounded-3xl border border-sand-dark/70 bg-cream px-4 py-3 text-sm text-ink outline-none transition focus:border-clay"
            />
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[2px] text-ink">
              Gender
            </h2>
            <div className="mt-4 space-y-3">
              {(["Male", "Female"] as const).map((gender) => (
                <label
                  key={gender}
                  className="flex cursor-pointer items-center gap-3 rounded-3xl border border-sand-dark/50 bg-sand px-4 py-3 text-sm text-ink transition hover:border-clay"
                >
                  <input
                    type="checkbox"
                    checked={selectedGenders.includes(gender)}
                    onChange={() =>
                      toggleSelection(
                        gender,
                        selectedGenders,
                        setSelectedGenders,
                      )
                    }
                    className="h-4 w-4 rounded border-sand-dark text-clay focus:ring-clay"
                  />
                  {gender}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[2px] text-ink">
              Species
            </h2>
            <div className="mt-4 space-y-3">
              {(["Dog", "Cat", "Bird"] as const).map((species) => (
                <label
                  key={species}
                  className="flex cursor-pointer items-center gap-3 rounded-3xl border border-sand-dark/50 bg-sand px-4 py-3 text-sm text-ink transition hover:border-clay"
                >
                  <input
                    type="checkbox"
                    checked={
                      selectedSpecies.includes(species) ||
                      searchQueryTokens.includes(species.toLowerCase())
                    }
                    onChange={() =>
                      toggleSelection(
                        species,
                        selectedSpecies,
                        setSelectedSpecies,
                      )
                    }
                    className="h-4 w-4 rounded border-sand-dark text-clay focus:ring-clay"
                  />
                  {species}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[2px] text-ink">
              Age
            </h2>
            <div className="mt-4 space-y-3">
              {[
                { key: "8-weeks-or-younger", label: "8 weeks or younger" },
                { key: "9-to-11-weeks", label: "9–11 weeks" },
                { key: "12-weeks-or-older", label: "12+ weeks" },
                { key: "6-months-or-older", label: "6+ months" },
              ].map((option) => (
                <label
                  key={option.key}
                  className="flex cursor-pointer items-center gap-3 rounded-3xl border border-sand-dark/50 bg-sand px-4 py-3 text-sm text-ink transition hover:border-clay"
                >
                  <input
                    type="checkbox"
                    checked={selectedAges.includes(option.key)}
                    onChange={() =>
                      toggleSelection(option.key, selectedAges, setSelectedAges)
                    }
                    className="h-4 w-4 rounded border-sand-dark text-clay focus:ring-clay"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[2px] text-ink">
              Price
            </h2>
            <div className="mt-4 space-y-3">
              {[
                { key: "under-2000", label: "Under $2,000" },
                { key: "2000-2500", label: "$2,000 to $2,500" },
                { key: "above-2500", label: "$2,500+" },
              ].map((option) => (
                <label
                  key={option.key}
                  className="flex cursor-pointer items-center gap-3 rounded-3xl border border-sand-dark/50 bg-sand px-4 py-3 text-sm text-ink transition hover:border-clay"
                >
                  <input
                    type="checkbox"
                    checked={selectedPrices.includes(option.key)}
                    onChange={() =>
                      toggleSelection(
                        option.key,
                        selectedPrices,
                        setSelectedPrices,
                      )
                    }
                    className="h-4 w-4 rounded border-sand-dark text-clay focus:ring-clay"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedGenders([]);
              setSelectedAges([]);
              setSelectedPrices([]);
              setSelectedSpecies([]);
              router.replace(pathname); // removes all query params
            }}
            className="w-full rounded-full border border-clay px-4 py-3 text-sm font-semibold uppercase tracking-[1px] text-clay transition hover:bg-clay hover:text-cream"
          >
            Clear filters
          </button>
        </aside>

        <section>
          <div className="mb-8">
            <div>
              {/* <p className="text-sm uppercase tracking-[2px] text-ink-soft">
                Showing
              </p> */}
              <p className="mt-2 text-sm font-medium text-ink">
                {pets?.length} pets available
              </p>
            </div>
            {/* <p className="text-sm text-ink-soft">
              Search and filter separately to refine the results.
            </p> */}
          </div>

          {pets?.length === 0 ? (
            <div className="rounded-[2rem] border border-sand-dark/70 bg-white p-12 text-center text-ink-soft shadow-sm shadow-ink/5">
              No pets match your filters. Try adjusting the search term or
              selection.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pets?.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
