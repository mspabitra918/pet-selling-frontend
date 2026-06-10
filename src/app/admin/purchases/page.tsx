"use client";

import { useApi } from "@/src/lib/api";
import {
  PURCHASE_STATUSES,
  STATUS_STYLES,
  type PetPurchase,
  type PurchaseStatus,
} from "@/src/lib/admin-types";
import { useEffect, useMemo, useState } from "react";
import { MdSearch, MdEdit, MdDelete, MdClose, MdRefresh } from "react-icons/md";

export default function PurchasesPage() {
  const api = useApi();
  const [purchases, setPurchases] = useState<PetPurchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [editing, setEditing] = useState<PetPurchase | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get<PetPurchase[]>("/pet-purchases");
      setPurchases(data);
    } catch (err) {
      console.error(err);
      setError("Could not load purchases.");
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
    return purchases.filter((p) => {
      if (statusFilter !== "ALL" && p.status !== statusFilter) return false;
      if (!q) return true;
      return [
        p.fullName,
        p.email,
        p.phoneNumber,
        p.city,
        p.state,
        p.pet?.name,
        p.id,
      ]
        .filter(Boolean)
        .some((v) => (v as string).toLowerCase().includes(q));
    });
  }, [purchases, search, statusFilter]);

  // Quick inline status change directly from the table.
  const quickStatus = async (p: PetPurchase, status: PurchaseStatus) => {
    setSavingId(p.id);
    const prev = p.status;
    setPurchases((list) =>
      list.map((x) => (x.id === p.id ? { ...x, status } : x)),
    );
    try {
      await api.patch(`/pet-purchases/${p.id}/status`, { status });
    } catch (err) {
      console.error(err);
      setPurchases((list) =>
        list.map((x) => (x.id === p.id ? { ...x, status: prev } : x)),
      );
      alert("Failed to update status.");
    } finally {
      setSavingId(null);
    }
  };

  const handleDelete = async (p: PetPurchase) => {
    if (!confirm(`Delete purchase by ${p.fullName || p.email || p.id}?`))
      return;
    try {
      await api.delete(`/pet-purchases/${p.id}`);
      setPurchases((list) => list.filter((x) => x.id !== p.id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete purchase.");
    }
  };

  const onSaved = (updated: PetPurchase) => {
    setPurchases((list) =>
      list.map((x) => (x.id === updated.id ? { ...x, ...updated } : x)),
    );
    setEditing(null);
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">
            Purchases
          </h1>
          <p className="mt-1 text-sm text-ink-soft">
            {filtered.length} of {purchases.length} orders
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-2 rounded-lg border border-sand-dark/60 bg-white px-4 py-2 text-sm font-medium text-ink hover:bg-sand/40"
        >
          <MdRefresh className="h-5 w-5" /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="mt-5 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <MdSearch className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-soft" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, pet, city…"
            className="w-full rounded-lg border border-sand-dark/60 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-clay"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-sand-dark/60 bg-white px-4 py-2.5 text-sm outline-none focus:border-clay"
        >
          <option value="ALL">All statuses</option>
          {PURCHASE_STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mt-5 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="mt-5 overflow-x-auto rounded-2xl border border-sand-dark/40 bg-white">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="border-b border-sand-dark/40 bg-sand/30 text-xs uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3 font-semibold">Buyer</th>
              <th className="px-4 py-3 font-semibold">Pet</th>
              <th className="px-4 py-3 font-semibold">Location</th>
              <th className="px-4 py-3 font-semibold">Qty</th>
              <th className="px-4 py-3 font-semibold">Total</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-dark/30">
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-ink-soft"
                >
                  Loading purchases…
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-ink-soft"
                >
                  No purchases found.
                </td>
              </tr>
            ) : (
              filtered.map((p) => (
                <tr key={p.id} className="hover:bg-cream/60">
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink">{p.fullName || "—"}</p>
                    <p className="text-xs text-ink-soft">{p.email || ""}</p>
                    <p className="text-xs text-ink-soft">
                      {p.phoneNumber || ""}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {p.pet?.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={p.pet.image}
                          alt={p.pet?.name || "pet"}
                          className="h-9 w-9 rounded-md object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium text-ink">
                          {p.pet?.name || "—"}
                        </p>
                        <p className="text-xs text-ink-soft">{p.pet?.breed}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-soft">
                    {[p.city, p.state, p.country].filter(Boolean).join(", ") ||
                      "—"}
                  </td>
                  <td className="px-4 py-3 text-ink">{p.quantity}</td>
                  <td className="px-4 py-3 font-medium text-ink">
                    ${Number(p.purchasePriceUsd).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={p.status}
                      disabled={savingId === p.id}
                      onChange={(e) =>
                        quickStatus(p, e.target.value as PurchaseStatus)
                      }
                      className={`rounded-full border px-2.5 py-1 text-xs font-medium outline-none ${STATUS_STYLES[p.status]} disabled:opacity-60`}
                    >
                      {PURCHASE_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setEditing(p)}
                        className="rounded-lg p-2 text-ink-soft hover:bg-sand/60 hover:text-clay"
                        title="Edit details"
                      >
                        <MdEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p)}
                        className="rounded-lg p-2 text-ink-soft hover:bg-rose-50 hover:text-rose-600"
                        title="Delete"
                      >
                        <MdDelete className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <EditPurchaseModal
          purchase={editing}
          onClose={() => setEditing(null)}
          onSaved={onSaved}
        />
      )}
    </div>
  );
}

function EditPurchaseModal({
  purchase,
  onClose,
  onSaved,
}: {
  purchase: PetPurchase;
  onClose: () => void;
  onSaved: (p: PetPurchase) => void;
}) {
  const api = useApi();
  const [form, setForm] = useState<PetPurchase>({ ...purchase });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = <K extends keyof PetPurchase>(key: K, value: PetPurchase[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const save = async () => {
    setSaving(true);
    setError(null);
    // Only send the editable fields the backend accepts.
    const payload = {
      fullName: form.fullName,
      email: form.email,
      phoneNumber: form.phoneNumber,
      address: form.address,
      zipCode: form.zipCode,
      city: form.city,
      state: form.state,
      country: form.country,
      quantity: Number(form.quantity),
      purchasePriceUsd: Number(form.purchasePriceUsd),
      status: form.status,
    };
    try {
      const { data } = await api.patch<PetPurchase>(
        `/pet-purchases/${purchase.id}`,
        payload,
      );
      onSaved({ ...purchase, ...data });
    } catch (err: unknown) {
      console.error(err);
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to save changes.";
      setError(Array.isArray(message) ? message.join(", ") : message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} />
      <div className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-sand-dark/40 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-ink">
            Edit purchase
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-ink-soft hover:bg-sand/60"
          >
            <MdClose className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 px-6 py-5">
          {error && (
            <div className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          )}

          <div className="rounded-lg bg-sand/30 px-4 py-3 text-sm">
            <span className="text-ink-soft">Pet: </span>
            <span className="font-medium text-ink">
              {purchase.pet?.name || purchase.petId}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <input
                disabled
                className={inputCls}
                value={form.fullName || ""}
                onChange={(e) => set("fullName", e.target.value)}
              />
            </Field>
            <Field label="Email">
              <input
                disabled
                className={inputCls}
                value={form.email || ""}
                onChange={(e) => set("email", e.target.value)}
              />
            </Field>
            <Field label="Phone">
              <input
                disabled
                className={inputCls}
                value={form.phoneNumber || ""}
                onChange={(e) => set("phoneNumber", e.target.value)}
              />
            </Field>
            <Field label="Status">
              <select
                // disabled
                className="w-full rounded-lg border border-sand-dark/60 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-clay"
                value={form.status}
                onChange={(e) =>
                  set("status", e.target.value as PurchaseStatus)
                }
              >
                {PURCHASE_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Address" full>
              <input
                disabled
                className={inputCls}
                value={form.address || ""}
                onChange={(e) => set("address", e.target.value)}
              />
            </Field>
            <Field label="City">
              <input
                disabled
                className={inputCls}
                value={form.city || ""}
                onChange={(e) => set("city", e.target.value)}
              />
            </Field>
            <Field label="State / Province">
              <input
                disabled
                className={inputCls}
                value={form.state || ""}
                onChange={(e) => set("state", e.target.value)}
              />
            </Field>
            <Field label="Zip / Postal">
              <input
                disabled
                className={inputCls}
                value={form.zipCode || ""}
                onChange={(e) => set("zipCode", e.target.value)}
              />
            </Field>
            <Field label="Country">
              <input
                disabled
                className={inputCls}
                value={form.country || ""}
                onChange={(e) => set("country", e.target.value)}
              />
            </Field>
            <Field label="Quantity">
              <input
                disabled
                type="number"
                min={1}
                className={inputCls}
                value={form.quantity}
                onChange={(e) => set("quantity", Number(e.target.value))}
              />
            </Field>
            <Field label="Total (USD)">
              <input
                disabled
                type="number"
                min={0}
                step="0.01"
                className={inputCls}
                value={form.purchasePriceUsd}
                onChange={(e) =>
                  set("purchasePriceUsd", Number(e.target.value))
                }
              />
            </Field>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-sand-dark/40 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-sand-dark/60 bg-white px-5 py-2.5 text-sm font-medium text-ink hover:bg-sand/40"
          >
            Cancel
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="rounded-lg bg-clay px-5 py-2.5 text-sm font-medium text-white hover:bg-clay-dark disabled:opacity-70"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-lg border border-sand-dark/60 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-clay cursor-not-allowed";

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1.5 block text-xs font-medium text-ink-soft">
        {label}
      </span>
      {children}
    </label>
  );
}
