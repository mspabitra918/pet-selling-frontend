import { Suspense } from "react";
import PetsPagesClient from "./browse-pets-client";
import BrowsePetsSkeleton from "@/src/components/ui/BrowsePetsSkeleton";

export const metadata = {
  title: "Browse Birds - Premium Pet Selling Platform",
  description: "Browse and filter birds available for purchase",
};

export default function BrowsePage() {
  return (
    <Suspense fallback={<BrowsePetsSkeleton />}>
      <PetsPagesClient />
    </Suspense>
  );
}
