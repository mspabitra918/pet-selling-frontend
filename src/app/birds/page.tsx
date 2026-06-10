import { Suspense } from "react";
import { BirdsClient } from "./birds-client";

export const metadata = {
  title: "Browse Birds - Premium Pet Selling Platform",
  description: "Browse and filter birds available for purchase",
};

export default function BirdsPage() {
  return (
    <Suspense
      fallback={<div className="container mx-auto px-4 py-12">Loading...</div>}
    >
      <BirdsClient />
    </Suspense>
  );
}
