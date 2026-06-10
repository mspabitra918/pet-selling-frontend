// Pet photo uploads.
//
// Uploads are CONTROLLED BY THE BACKEND: the browser sends the raw file to the
// NestJS API (POST /uploads/pet-image), the backend stores it in Supabase
// Storage using its service key, and returns the public URL. We then save that
// URL onto the pet record (pet.image / pet.gallery) via PATCH /pets/:id.
//
// The Supabase credentials live in the BACKEND .env (SUPABASE_URL,
// SUPABASE_SERVICE_KEY, SUPABASE_BUCKET) — nothing secret is exposed here.

import { api } from "./api";

/**
 * Upload a single image file through the backend and return its public URL.
 * Throws (with a readable message) if the upload fails.
 */
export async function uploadPetImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const { data } = await api.post<{ url: string }>(
      "/uploads/pet-image",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    if (!data?.url) {
      throw new Error("Upload succeeded but no URL was returned.");
    }
    return data.url;
  } catch (err: unknown) {
    const message =
      (err as { response?: { data?: { message?: string } } })?.response?.data
        ?.message || "Image upload failed.";
    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }
}
