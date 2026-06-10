import { Suspense } from "react";
import { CheckoutClient } from "./checkout-client";

export const metadata = {
  title: "Checkout - PawVerse",
  description: "Complete your pet purchase",
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white" />}>
      <CheckoutClient />
    </Suspense>
  );
}
