import { Suspense } from "react";
import { BirdsClient } from "./birds-client";
import BrowsePetsSkeleton from "@/src/components/ui/BrowsePetsSkeleton";

export const metadata = {
  title: "Browse Birds - Premium Pet Selling Platform",
  description: "Browse and filter birds available for purchase",
};

export default function BirdsPage() {
  return (
    <Suspense fallback={<BrowsePetsSkeleton />}>
      <BirdsClient />
    </Suspense>
  );
}
