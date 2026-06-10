"use client";

import { useApi } from "@/src/lib/api";
import {
  PURCHASE_STATUSES,
  STATUS_STYLES,
  type PetPurchase,
} from "@/src/lib/admin-types";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  MdReceiptLong,
  MdOutlinePets,
  MdAttachMoney,
  MdArrowForward,
} from "react-icons/md";

export default function AdminDashboard() {
  const api = useApi();
  const [purchases, setPurchases] = useState<PetPurchase[]>([]);
  const [petCount, setPetCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, petRes] = await Promise.all([
          api.get<PetPurchase[]>("/pet-purchases"),
          api.get<{ id: string }[]>("/pets"),
        ]);
        setPurchases(pRes.data);
        setPetCount(petRes.data.length);
      } catch (err) {
        console.error("Failed to load dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [api]);

  const stats = useMemo(() => {
    const revenue = purchases
      .filter((p) => ["PAID", "SHIPPED", "DELIVERED", "COMPLETED"].includes(p.status))
      .reduce((sum, p) => sum + Number(p.purchasePriceUsd || 0), 0);
    const byStatus = PURCHASE_STATUSES.map((status) => ({
      status,
      count: purchases.filter((p) => p.status === status).length,
    }));
    return { revenue, byStatus };
  }, [purchases]);

  const recent = purchases.slice(0, 5);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-2xl font-bold text-ink">Dashboard</h1>
      <p className="mt-1 text-sm text-ink-soft">
        Overview of purchases and inventory.
      </p>

      {/* Stat cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          icon={<MdReceiptLong className="h-6 w-6" />}
          label="Total purchases"
          value={loading ? "…" : String(purchases.length)}
        />
        <StatCard
          icon={<MdAttachMoney className="h-6 w-6" />}
          label="Revenue (paid+)"
          value={loading ? "…" : `$${stats.revenue.toLocaleString()}`}
        />
        <StatCard
          icon={<MdOutlinePets className="h-6 w-6" />}
          label="Pets listed"
          value={loading || petCount === null ? "…" : String(petCount)}
        />
      </div>

      {/* Status breakdown */}
      <div className="mt-6 rounded-2xl border border-sand-dark/40 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-ink">
          Purchases by status
        </h2>
        <div className="flex flex-wrap gap-2">
          {stats.byStatus.map(({ status, count }) => (
            <span
              key={status}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
            >
              {status}
              <span className="font-bold">{count}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Recent purchases */}
      <div className="mt-6 rounded-2xl border border-sand-dark/40 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-ink">Recent purchases</h2>
          <Link
            href="/admin/purchases"
            className="inline-flex items-center gap-1 text-sm font-medium text-clay hover:text-clay-dark"
          >
            View all <MdArrowForward className="h-4 w-4" />
          </Link>
        </div>
        {loading ? (
          <p className="text-sm text-ink-soft">Loading…</p>
        ) : recent.length === 0 ? (
          <p className="text-sm text-ink-soft">No purchases yet.</p>
        ) : (
          <ul className="divide-y divide-sand-dark/30">
            {recent.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">
                    {p.fullName || "—"}
                  </p>
                  <p className="truncate text-xs text-ink-soft">
                    {p.pet?.name ? `${p.pet.name} · ` : ""}
                    {p.email || ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-ink">
                    ${Number(p.purchasePriceUsd).toLocaleString()}
                  </span>
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[p.status]}`}
                  >
                    {p.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-sand-dark/40 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sand/60 text-clay">
          {icon}
        </div>
      </div>
      <p className="mt-4 text-2xl font-bold text-ink">{value}</p>
      <p className="text-sm text-ink-soft">{label}</p>
    </div>
  );
}
