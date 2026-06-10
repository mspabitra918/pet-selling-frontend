// Shared types & constants for the admin panel.

export const PURCHASE_STATUSES = [
  "PENDING",
  "PAID",
  "SHIPPED",
  "DELIVERED",
  "COMPLETED",
  "CANCELLED",
] as const;

export type PurchaseStatus = (typeof PURCHASE_STATUSES)[number];

export const PET_STATUSES = ["AVAILABLE", "NOT_AVAILABLE"] as const;
export type PetStatus = (typeof PET_STATUSES)[number];

export const AVAILABILITY = ["Available", "Pending", "Sold"] as const;

export type PetSummary = {
  id: string;
  name: string;
  image: string;
  breed: string;
  species: string;
  priceUsd: number;
};

export type PetPurchase = {
  id: string;
  petId: string;
  fullName?: string;
  address?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  country?: string;
  email?: string;
  phoneNumber?: string;
  quantity: number;
  purchasePriceUsd: number;
  status: PurchaseStatus;
  createdAt?: string;
  updatedAt?: string;
  pet?: PetSummary;
};

// Tailwind classes for each status pill, keyed by status.
export const STATUS_STYLES: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800 border-amber-200",
  PAID: "bg-blue-100 text-blue-800 border-blue-200",
  SHIPPED: "bg-indigo-100 text-indigo-800 border-indigo-200",
  DELIVERED: "bg-teal-100 text-teal-800 border-teal-200",
  COMPLETED: "bg-green-100 text-green-800 border-green-200",
  CANCELLED: "bg-rose-100 text-rose-700 border-rose-200",
  AVAILABLE: "bg-green-100 text-green-800 border-green-200",
  NOT_AVAILABLE: "bg-rose-100 text-rose-700 border-rose-200",
};
