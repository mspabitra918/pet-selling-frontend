"use client";

import { useApi } from "@/src/lib/api";
import { type Pet } from "@/src/lib/data";
import { uploadPetImage } from "@/src/lib/supabase";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  MdArrowBack,
  MdCloudUpload,
  MdDelete,
  MdAdd,
  MdSave,
} from "react-icons/md";

// Editable scalar fields rendered as a labelled grid. Anything not listed here
// (nested JSON objects, arrays) is handled separately below.
const SPECIES = ["dog", "cat", "bird"];
const GENDERS = ["Male", "Female"];
const SIZES = ["Small", "Medium", "Large"];
const AVAILABILITY = ["Available", "Pending", "Sold"];
const PET_STATUS = ["AVAILABLE", "NOT_AVAILABLE"];
const LEVELS = ["Low", "Moderate", "High"];
const COAT_TYPES = [
  "Short Smooth Coat",
  "Long Silky Coat",
  "Double Coat",
  "Curly Coat",
  "Wirehaired",
  "Hairless",
  "Long Dense Coat",
];

// Nested JSON object fields edited via a raw-JSON textarea.
const JSON_FIELDS: { key: keyof Pet; label: string }[] = [
  { key: "health", label: "Health" },
  { key: "parents", label: "Parents (sire / dam)" },
  { key: "deliveryOptions", label: "Delivery options" },
  { key: "breeder", label: "Breeder info" },
  { key: "feedingSchedule", label: "Feeding schedule" },
  { key: "training", label: "Training" },
];

// Array fields edited as comma-separated values.
const ARRAY_FIELDS: { key: keyof Pet; label: string }[] = [
  { key: "traits", label: "Traits" },
  { key: "included", label: "Included" },
  { key: "badges", label: "Badges" },
  { key: "temperament", label: "Temperament" },
  { key: "adoptionRequirements", label: "Adoption requirements" },
];

type FormState = Record<string, unknown>;

export default function PetEditPage() {
  const api = useApi();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [form, setForm] = useState<FormState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [jsonErrors, setJsonErrors] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get<Pet>(`/pets/${id}`);
        const next: FormState = { ...data };
        // species comes back lowercase from the DB; normalize just in case.
        if (typeof next.species === "string")
          next.species = (next.species as string).toLowerCase();
        // Serialize JSON object fields into editable text.
        for (const { key } of JSON_FIELDS) {
          next[`__json_${String(key)}`] = data[key]
            ? JSON.stringify(data[key], null, 2)
            : "";
        }
        // Serialize array fields into comma-separated text.
        for (const { key } of ARRAY_FIELDS) {
          const arr = data[key] as string[] | undefined;
          next[`__arr_${String(key)}`] = Array.isArray(arr)
            ? arr.join(", ")
            : "";
        }
        setForm(next);
      } catch (err) {
        console.error(err);
        setError("Could not load this pet.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [api, id]);

  const set = (key: string, value: unknown) =>
    setForm((f) => (f ? { ...f, [key]: value } : f));

  const handleMainUpload = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const url = await uploadPetImage(file);
      set("image", url);
      setSuccess("Photo uploaded. Don't forget to Save.");
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (files: FileList) => {
    setUploading(true);
    setError(null);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        urls.push(await uploadPetImage(file));
      }
      const current = (form?.gallery as string[]) || [];
      set("gallery", [...current, ...urls]);
      setSuccess(`${urls.length} image(s) added to gallery. Don't forget to Save.`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const removeGalleryImage = (url: string) => {
    const current = (form?.gallery as string[]) || [];
    set(
      "gallery",
      current.filter((u) => u !== url),
    );
  };

  const buildPayload = (): Record<string, unknown> | null => {
    if (!form) return null;
    const payload: Record<string, unknown> = {};
    const errs: Record<string, string> = {};

    // Scalars / enums / booleans / numbers — copied as-is from the form.
    const scalarKeys = [
      "name",
      "species",
      "breed",
      "ageLabel",
      "gender",
      "ageWeeks",
      "color",
      "size",
      "weight",
      "coatType",
      "expectedAdultWeight",
      "eyeColor",
      "availability",
      "status",
      "originalPriceUsd",
      "priceUsd",
      "reserveAmount",
      "description",
      "groomingNeeds",
      "exerciseNeeds",
      "personalityType",
      "favoriteToy",
      "registeredOrganization",
      "registrationNumber",
      "trainabilityRating",
      "friendlinessRating",
      "energyRating",
      "goodWithKids",
      "goodWithDogs",
      "goodWithCats",
      "activityLevel",
      "barkingLevel",
      "sheddingLevel",
      "vocalLevel",
      "city",
      "region",
      "country",
      "image",
      "breederId",
      "featured",
    ];
    const numberKeys = new Set([
      "ageWeeks",
      "originalPriceUsd",
      "priceUsd",
      "reserveAmount",
      "trainabilityRating",
      "friendlinessRating",
      "energyRating",
    ]);

    for (const key of scalarKeys) {
      let value = form[key];
      if (value === "" || value === undefined || value === null) continue;
      if (numberKeys.has(key)) value = Number(value);
      payload[key] = value;
    }

    // gallery (already an array in state)
    if (Array.isArray(form.gallery)) payload.gallery = form.gallery;

    // Array fields from comma-separated text.
    for (const { key } of ARRAY_FIELDS) {
      const raw = form[`__arr_${String(key)}`] as string | undefined;
      if (raw === undefined) continue;
      const arr = raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      payload[String(key)] = arr;
    }

    // JSON object fields.
    for (const { key, label } of JSON_FIELDS) {
      const raw = (form[`__json_${String(key)}`] as string | undefined)?.trim();
      if (!raw) continue;
      try {
        payload[String(key)] = JSON.parse(raw);
      } catch {
        errs[String(key)] = `Invalid JSON in "${label}".`;
      }
    }

    if (Object.keys(errs).length) {
      setJsonErrors(errs);
      setError("Fix the highlighted JSON fields before saving.");
      return null;
    }
    setJsonErrors({});
    return payload;
  };

  const save = async () => {
    setError(null);
    setSuccess(null);
    const payload = buildPayload();
    if (!payload) return;
    setSaving(true);
    try {
      await api.patch(`/pets/${id}`, payload);
      setSuccess("Pet saved successfully.");
    } catch (err: unknown) {
      console.error(err);
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Failed to save pet.";
      setError(Array.isArray(message) ? message.join(", ") : message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this pet permanently? This cannot be undone.")) return;
    try {
      await api.delete(`/pets/${id}`);
      router.replace("/admin/pets");
    } catch (err) {
      console.error(err);
      setError("Failed to delete pet.");
    }
  };

  if (loading) {
    return <p className="text-sm text-ink-soft">Loading pet…</p>;
  }
  if (!form) {
    return (
      <div>
        <p className="text-sm text-rose-600">{error || "Pet not found."}</p>
        <Link href="/admin/pets" className="mt-3 inline-block text-clay">
          ← Back to pets
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl pb-24">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link
            href="/admin/pets"
            className="inline-flex items-center gap-1 text-sm text-ink-soft hover:text-clay"
          >
            <MdArrowBack className="h-4 w-4" /> Back to pets
          </Link>
          <h1 className="mt-1 font-display text-2xl font-bold text-ink">
            {(form.name as string) || "Edit pet"}
          </h1>
        </div>
        <button
          onClick={handleDelete}
          className="inline-flex items-center gap-2 rounded-lg border border-rose-200 bg-white px-4 py-2 text-sm font-medium text-rose-600 hover:bg-rose-50"
        >
          <MdDelete className="h-5 w-5" /> Delete
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          {success}
        </div>
      )}

      {/* ---- Photo ---- */}
      <Section title="Photo">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
          <div className="h-40 w-40 shrink-0 overflow-hidden rounded-xl border border-sand-dark/40 bg-sand/40">
            {form.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={form.image as string}
                alt="Pet"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-ink-soft">
                No image
              </div>
            )}
          </div>
          <div className="flex-1">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleMainUpload(f);
                e.target.value = "";
              }}
            />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 rounded-lg bg-clay px-4 py-2.5 text-sm font-medium text-white hover:bg-clay-dark disabled:opacity-70"
            >
              <MdCloudUpload className="h-5 w-5" />
              {uploading ? "Uploading…" : "Upload new photo"}
            </button>
            <p className="mt-2 text-xs text-ink-soft">
              Uploads to Supabase Storage. You can also paste an image URL
              directly below.
            </p>
            <input
              className={`${inputCls} mt-3`}
              value={(form.image as string) || ""}
              onChange={(e) => set("image", e.target.value)}
              placeholder="https://…/image.jpg"
            />
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-ink">Gallery</span>
            <input
              ref={galleryRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.length) handleGalleryUpload(e.target.files);
                e.target.value = "";
              }}
            />
            <button
              onClick={() => galleryRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-1 text-sm font-medium text-clay hover:text-clay-dark disabled:opacity-70"
            >
              <MdAdd className="h-4 w-4" /> Add images
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {((form.gallery as string[]) || []).map((url) => (
              <div
                key={url}
                className="group relative h-20 w-20 overflow-hidden rounded-lg border border-sand-dark/40"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="h-full w-full object-cover" />
                <button
                  onClick={() => removeGalleryImage(url)}
                  className="absolute right-1 top-1 rounded-full bg-ink/70 p-1 text-white opacity-0 transition group-hover:opacity-100"
                  title="Remove"
                >
                  <MdDelete className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
            {((form.gallery as string[]) || []).length === 0 && (
              <p className="text-xs text-ink-soft">No gallery images.</p>
            )}
          </div>
        </div>
      </Section>

      {/* ---- Core ---- */}
      <Section title="Core details">
        <Grid>
          <Field label="Name">
            <input
              className={inputCls}
              value={(form.name as string) || ""}
              onChange={(e) => set("name", e.target.value)}
            />
          </Field>
          <SelectField
            label="Species"
            value={(form.species as string) || ""}
            onChange={(v) => set("species", v)}
            options={SPECIES}
          />
          <Field label="Breed">
            <input
              className={inputCls}
              value={(form.breed as string) || ""}
              onChange={(e) => set("breed", e.target.value)}
            />
          </Field>
          <Field label="Age label">
            <input
              className={inputCls}
              value={(form.ageLabel as string) || ""}
              onChange={(e) => set("ageLabel", e.target.value)}
            />
          </Field>
          <SelectField
            label="Gender"
            value={(form.gender as string) || ""}
            onChange={(v) => set("gender", v)}
            options={GENDERS}
          />
          <Field label="Age (weeks)">
            <input
              type="number"
              className={inputCls}
              value={(form.ageWeeks as number) ?? ""}
              onChange={(e) => set("ageWeeks", e.target.value)}
            />
          </Field>
        </Grid>
      </Section>

      {/* ---- Physical ---- */}
      <Section title="Physical attributes">
        <Grid>
          <Field label="Color">
            <input
              className={inputCls}
              value={(form.color as string) || ""}
              onChange={(e) => set("color", e.target.value)}
            />
          </Field>
          <SelectField
            label="Size"
            value={(form.size as string) || ""}
            onChange={(v) => set("size", v)}
            options={SIZES}
            allowEmpty
          />
          <Field label="Weight">
            <input
              className={inputCls}
              value={(form.weight as string) || ""}
              onChange={(e) => set("weight", e.target.value)}
            />
          </Field>
          <SelectField
            label="Coat type"
            value={(form.coatType as string) || ""}
            onChange={(v) => set("coatType", v)}
            options={COAT_TYPES}
            allowEmpty
          />
          <Field label="Expected adult weight">
            <input
              className={inputCls}
              value={(form.expectedAdultWeight as string) || ""}
              onChange={(e) => set("expectedAdultWeight", e.target.value)}
            />
          </Field>
          <Field label="Eye color">
            <input
              className={inputCls}
              value={(form.eyeColor as string) || ""}
              onChange={(e) => set("eyeColor", e.target.value)}
            />
          </Field>
        </Grid>
      </Section>

      {/* ---- Pricing & availability ---- */}
      <Section title="Availability & pricing">
        <Grid>
          <SelectField
            label="Availability"
            value={(form.availability as string) || ""}
            onChange={(v) => set("availability", v)}
            options={AVAILABILITY}
          />
          <SelectField
            label="Status"
            value={(form.status as string) || ""}
            onChange={(v) => set("status", v)}
            options={PET_STATUS}
            allowEmpty
          />
          <Field label="Original price (USD)">
            <input
              type="number"
              step="0.01"
              className={inputCls}
              value={(form.originalPriceUsd as number) ?? ""}
              onChange={(e) => set("originalPriceUsd", e.target.value)}
            />
          </Field>
          <Field label="Price (USD)">
            <input
              type="number"
              step="0.01"
              className={inputCls}
              value={(form.priceUsd as number) ?? ""}
              onChange={(e) => set("priceUsd", e.target.value)}
            />
          </Field>
          <Field label="Reserve amount (USD)">
            <input
              type="number"
              step="0.01"
              className={inputCls}
              value={(form.reserveAmount as number) ?? ""}
              onChange={(e) => set("reserveAmount", e.target.value)}
            />
          </Field>
          <CheckboxField
            label="Featured"
            checked={Boolean(form.featured)}
            onChange={(v) => set("featured", v)}
          />
        </Grid>
      </Section>

      {/* ---- Descriptions ---- */}
      <Section title="Descriptions">
        <div className="space-y-4">
          <Field label="Description" full>
            <textarea
              rows={4}
              className={inputCls}
              value={(form.description as string) || ""}
              onChange={(e) => set("description", e.target.value)}
            />
          </Field>
          <Grid>
            <Field label="Grooming needs">
              <textarea
                rows={2}
                className={inputCls}
                value={(form.groomingNeeds as string) || ""}
                onChange={(e) => set("groomingNeeds", e.target.value)}
              />
            </Field>
            <Field label="Exercise needs">
              <textarea
                rows={2}
                className={inputCls}
                value={(form.exerciseNeeds as string) || ""}
                onChange={(e) => set("exerciseNeeds", e.target.value)}
              />
            </Field>
            <Field label="Personality type">
              <input
                className={inputCls}
                value={(form.personalityType as string) || ""}
                onChange={(e) => set("personalityType", e.target.value)}
              />
            </Field>
            <Field label="Favorite toy">
              <input
                className={inputCls}
                value={(form.favoriteToy as string) || ""}
                onChange={(e) => set("favoriteToy", e.target.value)}
              />
            </Field>
          </Grid>
        </div>
      </Section>

      {/* ---- Behaviour & compatibility ---- */}
      <Section title="Behaviour & compatibility">
        <Grid>
          <SelectField
            label="Activity level"
            value={(form.activityLevel as string) || ""}
            onChange={(v) => set("activityLevel", v)}
            options={LEVELS}
            allowEmpty
          />
          <SelectField
            label="Barking level"
            value={(form.barkingLevel as string) || ""}
            onChange={(v) => set("barkingLevel", v)}
            options={LEVELS}
            allowEmpty
          />
          <SelectField
            label="Shedding level"
            value={(form.sheddingLevel as string) || ""}
            onChange={(v) => set("sheddingLevel", v)}
            options={LEVELS}
            allowEmpty
          />
          <SelectField
            label="Vocal level"
            value={(form.vocalLevel as string) || ""}
            onChange={(v) => set("vocalLevel", v)}
            options={LEVELS}
            allowEmpty
          />
          <Field label="Trainability (1-5)">
            <input
              type="number"
              min={1}
              max={5}
              className={inputCls}
              value={(form.trainabilityRating as number) ?? ""}
              onChange={(e) => set("trainabilityRating", e.target.value)}
            />
          </Field>
          <Field label="Friendliness (1-5)">
            <input
              type="number"
              min={1}
              max={5}
              className={inputCls}
              value={(form.friendlinessRating as number) ?? ""}
              onChange={(e) => set("friendlinessRating", e.target.value)}
            />
          </Field>
          <Field label="Energy (1-5)">
            <input
              type="number"
              min={1}
              max={5}
              className={inputCls}
              value={(form.energyRating as number) ?? ""}
              onChange={(e) => set("energyRating", e.target.value)}
            />
          </Field>
          <CheckboxField
            label="Good with kids"
            checked={Boolean(form.goodWithKids)}
            onChange={(v) => set("goodWithKids", v)}
          />
          <CheckboxField
            label="Good with dogs"
            checked={Boolean(form.goodWithDogs)}
            onChange={(v) => set("goodWithDogs", v)}
          />
          <CheckboxField
            label="Good with cats"
            checked={Boolean(form.goodWithCats)}
            onChange={(v) => set("goodWithCats", v)}
          />
        </Grid>
      </Section>

      {/* ---- Location & registration ---- */}
      <Section title="Location & registration">
        <Grid>
          <Field label="City">
            <input
              className={inputCls}
              value={(form.city as string) || ""}
              onChange={(e) => set("city", e.target.value)}
            />
          </Field>
          <Field label="Region / Province">
            <input
              className={inputCls}
              value={(form.region as string) || ""}
              onChange={(e) => set("region", e.target.value)}
            />
          </Field>
          <Field label="Country">
            <input
              className={inputCls}
              value={(form.country as string) || ""}
              onChange={(e) => set("country", e.target.value)}
            />
          </Field>
          <Field label="Breeder ID">
            <input
              className={inputCls}
              value={(form.breederId as string) || ""}
              onChange={(e) => set("breederId", e.target.value)}
            />
          </Field>
          <Field label="Registered organization">
            <input
              className={inputCls}
              value={(form.registeredOrganization as string) || ""}
              onChange={(e) => set("registeredOrganization", e.target.value)}
            />
          </Field>
          <Field label="Registration number">
            <input
              className={inputCls}
              value={(form.registrationNumber as string) || ""}
              onChange={(e) => set("registrationNumber", e.target.value)}
            />
          </Field>
        </Grid>
      </Section>

      {/* ---- Array fields ---- */}
      <Section title="Lists (comma-separated)">
        <div className="space-y-4">
          {ARRAY_FIELDS.map(({ key, label }) => (
            <Field key={String(key)} label={label} full>
              <input
                className={inputCls}
                value={(form[`__arr_${String(key)}`] as string) || ""}
                onChange={(e) => set(`__arr_${String(key)}`, e.target.value)}
                placeholder="value one, value two, value three"
              />
            </Field>
          ))}
        </div>
      </Section>

      {/* ---- JSON object fields ---- */}
      <Section title="Advanced (JSON)">
        <p className="mb-3 text-xs text-ink-soft">
          These are structured objects stored as JSON. Edit carefully — must be
          valid JSON.
        </p>
        <div className="space-y-4">
          {JSON_FIELDS.map(({ key, label }) => (
            <Field key={String(key)} label={label} full>
              <textarea
                rows={5}
                className={`${inputCls} font-mono text-xs ${
                  jsonErrors[String(key)] ? "border-rose-400" : ""
                }`}
                value={(form[`__json_${String(key)}`] as string) || ""}
                onChange={(e) => set(`__json_${String(key)}`, e.target.value)}
                placeholder="{ }"
              />
              {jsonErrors[String(key)] && (
                <span className="mt-1 block text-xs text-rose-600">
                  {jsonErrors[String(key)]}
                </span>
              )}
            </Field>
          ))}
        </div>
      </Section>

      {/* Sticky save bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-sand-dark/40 bg-white/95 px-4 py-3 backdrop-blur lg:pl-72">
        <div className="mx-auto flex max-w-4xl items-center justify-end gap-3">
          <Link
            href="/admin/pets"
            className="rounded-lg border border-sand-dark/60 bg-white px-5 py-2.5 text-sm font-medium text-ink hover:bg-sand/40"
          >
            Cancel
          </Link>
          <button
            onClick={save}
            disabled={saving || uploading}
            className="inline-flex items-center gap-2 rounded-lg bg-clay px-6 py-2.5 text-sm font-medium text-white hover:bg-clay-dark disabled:opacity-70"
          >
            <MdSave className="h-5 w-5" />
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Reusable bits ---------------- */

const inputCls =
  "w-full rounded-lg border border-sand-dark/60 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-clay";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-5 rounded-2xl border border-sand-dark/40 bg-white p-5">
      <h2 className="mb-4 font-display text-base font-bold text-ink">{title}</h2>
      {children}
    </section>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}

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

function SelectField({
  label,
  value,
  onChange,
  options,
  allowEmpty,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  allowEmpty?: boolean;
}) {
  return (
    <Field label={label}>
      <select
        className={inputCls}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {allowEmpty && <option value="">—</option>}
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Field>
  );
}

function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 self-end rounded-lg border border-sand-dark/60 bg-white px-3 py-2.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-clay"
      />
      <span className="text-sm text-ink">{label}</span>
    </label>
  );
}
