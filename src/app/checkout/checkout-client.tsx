"use client";

import { useApi } from "@/src/lib/api";
import { canadaRegions, Pet, usStates, formatPrice } from "@/src/lib/data";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function CheckoutClient() {
  const route = useRouter();
  const param = useSearchParams();
  const petId = param.get("petId");
  const quantity = param.get("quantity");
  const api = useApi();
  const [pet, setPet] = useState<Pet | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("CA");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [isSubmitLoading, setSubmitLoading] = useState(false);
  const [isSubmitSuccess, setSubmitSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPet = async () => {
      if (!petId) return;

      try {
        const { data } = await api.get<Pet>(`/pets/${petId}`);
        setPet(data);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Failed to fetch pet", error);
        }
      }
    };

    fetchPet();
    return () => controller.abort();
  }, [api, petId]);

  const subTotal = (pet?.priceUsd ?? 0) * Number(quantity ?? 0);

  // Shipping options with USD costs
  const shippingOptions = [
    {
      id: "road",
      title: "By Road 3 Days Home Delivery",
      note: "[ 100% Live Guarantee COD Not Available ]",
      costInUsd: 13,
    },
    {
      id: "rail",
      title:
        "By Railway Min Order 12,000 Or More [ For CAGE Pets 100% Live Guarantee COD Not Available ]",
      note: "",
      costInUsd: 13,
    },
    {
      id: "flight",
      title: "By Flight Max 2 Days Home Delivery",
      note: "[ 100% Live Guarantee COD Not Available ]",
      costInUsd: 18,
    },
  ];

  const [shippingOption, setShippingOption] = useState<string | null>(
    shippingOptions[0].id,
  );
  const [shippingCost, setShippingCost] = useState<number>(
    Math.round(shippingOptions[0].costInUsd),
  );

  const handleSelectShipping = (id: string) => {
    const opt = shippingOptions.find((s) => s.id === id);
    const costUsd = opt ? Math.round(opt.costInUsd) : 0;
    setShippingOption(id);
    setShippingCost(costUsd);
  };

  const handelSubmit = async () => {
    if (!firstName) {
      alert("First name is required");
      return;
    }

    if (!lastName) {
      alert("Last name is required");
      return;
    }

    if (!address) {
      alert("Address is required");
      return;
    }

    if (!zipCode) {
      alert("Zip code is required");
      return;
    }

    if (!city) {
      alert("City is required");
      return;
    }

    if (!state) {
      alert("State is required");
      return;
    }

    if (!country) {
      alert("Country is required");
      return;
    }

    if (!email) {
      alert("Email is required");
      return;
    }

    if (!phoneNumber) {
      alert("Phone number is required");
      return;
    }
    const payload = {
      fullName: `${firstName} ${lastName}`,
      address,
      zipCode,
      city,
      state,
      country,
      email,
      phoneNumber,
      quantity: Number(quantity),
      purchasePriceUsd: (subTotal ?? 0) + (shippingCost ?? 0),
      // shippingMethod: shippingOption,
      // shippingCostUsd: shippingCost,
      petId,
    };
    setSubmitLoading(true);
    try {
      const { data } = await api.post<{ id: string }>(
        `/pet-purchases`,
        payload,
      );
      setOrderId(data.id);
      setSubmitSuccess(true);
      // setTimeout(() => {
      //   route.push("/browse-pets");
      // }, 4000);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-clay py-4 md:py-8 text-center">
        <Link href={"/"} className="text-2xl md:text-4xl font-bold text-white">
          PawVerse
        </Link>
      </div>

      {isSubmitSuccess && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-8 w-8 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-3xl font-bold text-clay">
            Order Submitted!
          </h2>
          <p className="mb-2 text-lg text-ink-soft">
            Thank you for your purchase.
          </p>
          <p className="mb-6 text-base text-ink-soft">
            We&apos;ve received your order and will contact you shortly with
            shipping details.
          </p>
          <p className="text-sm text-gray-500">
            Order ID:{" "}
            <span className="font-mono font-semibold text-ink">
              {orderId ?? petId ?? "N/A"}
            </span>
          </p>
        </div>
      )}

      <div className="grid lg:grid-cols-[2fr_1fr] gap-8 lg:gap-0">
        {/* Right Order Summary (shows first on mobile) */}
        {!isSubmitSuccess && (
          <div className="lg:hidden bg-gray-50 px-4 py-6 md:px-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl md:text-2xl font-light text-clay uppercase">
                Order Summary
              </h2>
            </div>

            {/* Product */}
            <div className="flex gap-3 mb-6">
              <div className="relative h-20 w-20 shrink-0">
                {pet?.image && (
                  <Image
                    src={pet.image}
                    alt={pet.name || "Pet"}
                    fill
                    className="object-cover rounded"
                  />
                )}
              </div>

              <div className="flex-1 text-sm md:text-base">
                <h3 className="font-semibold text-clay line-clamp-2">
                  {pet?.name ?? "Pet"}
                </h3>
                <p className="text-base md:text-lg font-medium">
                  {formatPrice(pet?.priceUsd ?? 0)}
                </p>
              </div>
            </div>

            <hr className="mb-4" />

            <div className="space-y-3 mb-4 text-sm md:text-base">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subTotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost ? formatPrice(shippingCost) : "—"}</span>
              </div>
            </div>

            <hr className="mb-4" />

            <div className="flex justify-between text-lg md:text-xl font-semibold">
              <span>Order Total</span>
              <span>{formatPrice((subTotal ?? 0) + (shippingCost ?? 0))}</span>
            </div>
          </div>
        )}

        {/* Left Section */}
        <div className="px-4 py-6 md:px-8 md:py-12 lg:px-12">
          {!isSubmitSuccess && (
            <>
              <div className="mb-8 md:mb-10">
                <h2 className="text-xl md:text-3xl font-light text-clay uppercase mb-4 md:mb-6 mt-0 md:mt-7">
                  Customer Information
                </h2>

                <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-clay"
                  />
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Phone"
                    className="rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-clay"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-xl md:text-3xl font-light text-clay uppercase mb-4 md:mb-6">
                  Shipping Address
                </h2>

                <div className="grid md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-clay"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-clay"
                  />
                </div>

                <select
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    setState("");
                  }}
                  className="w-full rounded-md px-3 md:px-4 py-2 md:py-3 mb-3 md:mb-4 text-sm md:text-base border border-clay"
                >
                  <option value="CA">Canada</option>
                  <option value="US">United States</option>
                </select>

                <div className="grid md:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street Address"
                    className="rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-clay"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="Postal / Zip"
                    className="rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-clay"
                  />

                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="City"
                    className="rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-clay"
                  />

                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="col-span-2 md:col-span-1 rounded-md px-3 md:px-4 py-2 md:py-3 text-sm md:text-base border border-clay"
                  >
                    <option value="">
                      {country === "US"
                        ? "Select State"
                        : "Select Province / Territory"}
                    </option>

                    {(country === "US" ? usStates : canadaRegions).map(
                      (region) => (
                        <option key={region.code} value={region.code}>
                          {region.name}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                <button
                  onClick={handelSubmit}
                  disabled={isSubmitLoading}
                  className="w-full bg-clay hover:bg-clay-dark py-3 md:py-4 rounded-md font-medium cursor-pointer text-white text-sm md:text-base disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Loading...
                    </span>
                  ) : isSubmitSuccess ? (
                    "✓ Order Submitted!"
                  ) : (
                    "CONTINUE"
                  )}
                </button>
              </div>

              {/* Shipping Options */}
              <div className="mt-10 md:mt-16">
                <h2 className="text-xl md:text-3xl font-light text-clay uppercase mb-4 md:mb-6">
                  Shipping Options
                </h2>

                <div className="space-y-3">
                  {shippingOptions.map((opt) => {
                    return (
                      <label
                        key={opt.id}
                        className={`flex items-start md:items-center justify-between border p-3 md:p-4 rounded-md cursor-pointer gap-3 ${shippingOption === opt.id ? "border-clay  bg-opacity-5" : "border-gray-200"}`}
                      >
                        <div className="text-left flex-1 min-w-0">
                          <div className="font-medium text-clay text-sm md:text-base line-clamp-2">
                            {opt.title}
                          </div>
                          {opt.note && (
                            <div className="text-xs md:text-sm text-gray-500">
                              {opt.note}
                            </div>
                          )}
                          <div className="text-xs md:text-sm text-gray-500">
                            {formatPrice(opt.costInUsd)}
                          </div>
                        </div>

                        <input
                          type="radio"
                          name="shipping"
                          checked={shippingOption === opt.id}
                          onChange={() => handleSelectShipping(opt.id)}
                          value={opt.id}
                          className="mt-1 shrink-0"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Order Summary (Desktop only) */}
        {!isSubmitSuccess && (
          <div className="hidden lg:block bg-gray-50 p-8 lg:p-12 sticky top-0 h-fit">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-light text-clay uppercase">
                Your Order
              </h2>

              <button
                onClick={() => route.back()}
                className="text-gray-600 uppercase text-sm cursor-pointer"
              >
                Edit Cart
              </button>
            </div>

            {/* Product */}
            <div className="flex gap-4 mb-8">
              <div className="relative h-28 w-28 shrink-0">
                {pet?.image && (
                  <Image
                    src={pet.image}
                    alt={pet.name || "Pet"}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              <div>
                <h3 className="font-semibold text-clay">
                  {pet?.name ?? "Pet"}
                </h3>

                <p className="text-lg font-medium">
                  {formatPrice(pet?.priceUsd ?? 0)}
                </p>
                <p className="text-gray-500 text-sm">Backordered</p>
              </div>
            </div>

            <hr className="mb-6" />

            <div className="space-y-4 mb-8">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subTotal)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingCost ? formatPrice(shippingCost) : "—"}</span>
              </div>
            </div>

            {/* <hr className="mb-6" /> */}

            {/* <div className="flex gap-3 mb-8">
              <input
                type="text"
                placeholder="Coupon code"
                className="flex-1 rounded-md px-4 py-3"
              />

              <button className="text-clay font-medium">APPLY</button>
            </div> */}

            <hr className="mb-6" />

            <div className="flex justify-between text-xl font-semibold">
              <span>Order Total</span>
              <span>{formatPrice((subTotal ?? 0) + (shippingCost ?? 0))}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
