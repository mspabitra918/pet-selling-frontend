import { Suspense } from "react";
import PetDetailsPageClients from "./pet-clients";
import PetDetailsSkeleton from "@/src/components/ui/DetailsPageSkeleton";

export const metadata = {
  title: "Checkout - PawVerse",
  description: "Complete your pet purchase",
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<PetDetailsSkeleton />}>
      <PetDetailsPageClients />
    </Suspense>
  );
}
