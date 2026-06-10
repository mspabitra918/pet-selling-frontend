"use client";

import { useApi } from "@/src/lib/api";
import { STATUS_STYLES } from "@/src/lib/admin-types";
import { type Pet } from "@/src/lib/data";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { MdSearch, MdEdit, MdRefresh } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function PetsPage() {
  const route = useRouter();
  const api = useApi();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [species, setSpecies] = useState("ALL");

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<Pet[]>("/pets");
      setPets(data);
    } catch (err) {
      console.error(err);
      setError("Could not load pets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return pets.filter((p) => {
      if (
        species !== "ALL" &&
        String(p.species).toLowerCase() !== species.toLowerCase()
      )
        return false;
      if (!q) return true;
      return [p.name, p.breed, p.city, p.region]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q));
    });
  }, [pets, search, species]);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">Pets</h1>
          <p className="mt-1 text-sm text-ink-soft">
            {filtered.length} of {pets.length} listings
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 rounded-lg border border-sand-dark/60 bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-sand/40"
        >
          <MdRefresh className="h-5 w-5" /> Refresh
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <MdSearch className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, breed, location…"
            className="w-full rounded-lg border border-sand-dark/60 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-clay"
          />
        </div>
        <select
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          className="rounded-lg border border-sand-dark/60 bg-white px-4 py-2.5 text-sm outline-none focus:border-clay"
        >
          <option value="ALL">All species</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
        </select>
        <button
          onClick={() => route.push("/admin/pets/add")}
          className="bg-clay px-4 py-2.5 rounded-md text-white"
        >
          Add Pet
        </button>
      </div>

      {error && (
        <div className="mt-5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      {loading ? (
        <p className="mt-10 text-center text-sm text-ink-soft">Loading pets…</p>
      ) : filtered.length === 0 ? (
        <p className="mt-10 text-center text-sm text-ink-soft">
          No pets found.
        </p>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((pet) => {
            const status = (pet as { status?: string }).status;
            return (
              <Link
                key={pet.id}
                href={`/admin/pets/${pet.id}`}
                className="group overflow-hidden rounded-2xl border border-sand-dark/40 bg-white transition hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-sand/40">
                  {pet.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  )}
                  {status && (
                    <span
                      className={`absolute left-2 top-2 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                        STATUS_STYLES[status] || "bg-white/90 text-ink"
                      }`}
                    >
                      {status}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-ink">
                        {pet.name}
                      </p>
                      <p className="truncate text-xs text-ink-soft">
                        {pet.breed} · {pet.species}
                      </p>
                    </div>
                    <MdEdit className="h-5 w-5 shrink-0 text-ink-soft group-hover:text-clay" />
                  </div>
                  <p className="mt-2 text-sm font-semibold text-clay">
                    ${Number(pet.priceUsd).toLocaleString()}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
