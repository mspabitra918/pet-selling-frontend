import { Suspense } from "react";
import DogPagesClient from "./dog-client";
import BrowsePetsSkeleton from "@/src/components/ui/BrowsePetsSkeleton";

export const metadata = {
  title: "Browse Birds - Premium Pet Selling Platform",
  description: "Browse and filter birds available for purchase",
};

export default function CatsPage() {
  return (
    <Suspense fallback={<BrowsePetsSkeleton />}>
      <DogPagesClient />
    </Suspense>
  );
}
