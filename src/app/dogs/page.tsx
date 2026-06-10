import { Suspense } from "react";
import DogPagesClient from "./dog-client";

export const metadata = {
  title: "Browse Birds - Premium Pet Selling Platform",
  description: "Browse and filter birds available for purchase",
};

export default function CatsPage() {
  return (
    <Suspense
      fallback={<div className="container mx-auto px-4 py-12">Loading...</div>}
    >
      <DogPagesClient />
    </Suspense>
  );
}
