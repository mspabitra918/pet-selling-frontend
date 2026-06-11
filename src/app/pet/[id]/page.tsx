"use client";
import { useSearchParams } from "next/dist/client/components/navigation";
import { useEffect, useState } from "react";
import { IoCaretBackOutline, IoReturnDownBack } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { Pet } from "@/src/lib/data";
import { useApi } from "@/src/lib/api";

const Spec = ({ label, value }: { label: string; value?: string | number }) => {
  if (!value) return null;

  return (
    <div className="flex gap-2 border-b border-sand-dark/20">
      <span className=" font-medium text-ink">{label} : </span>
      <span className="text-ink-soft">{value}</span>
    </div>
  );
};

export default function PetDetailsPage() {
  const api = useApi();
  const [pet, setPet] = useState<Pet | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const params = useSearchParams();
  const id = params.get("id");

  useEffect(() => {
    if (!id) return;

    const fetchPet = async () => {
      const { data } = await api.get(`/pets/${id}`);
      setPet(data);
    };
    fetchPet();
  }, [api, id]);

  if (!pet) {
    return <div>Pet not found</div>;
  }

  const calculatePercentageOff = pet?.originalPriceUsd
    ? Math.round(
        ((pet.originalPriceUsd - pet.priceUsd) / pet.originalPriceUsd) * 100,
      )
    : null;

  return (
    <>
      <div className="max-w-5xl mx-auto py-6 px-5 lg:px-0">
        <button
          className="text-clay font-medium flex items-center gap-1 mb-4 cursor-pointer hover:text-clay-dark transition"
          onClick={() => window.history.back()}
        >
          <IoCaretBackOutline />
          All Pets
        </button>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div>
              <img
                className="h-[400px] w-[500px] md:h-[600px] md:w-[500px]"
                src={selectedImage || pet.image}
                alt={pet.name}
              />
            </div>
            {pet && pet?.gallery && (
              <div className="mt-4 flex items-center gap-3 justify-center">
                {pet.gallery.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${pet.name} gallery ${idx + 1}`}
                    onClick={() => setSelectedImage(img)}
                    className={`h-14 w-14 rounded-lg object-cover cursor-pointer border-2 transition-all duration-200 ${
                      selectedImage === img
                        ? "border-clay"
                        : "border-gray-200 hover:border-clay"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-ink">
              [ 1 Pair ${pet.priceUsd} ] {pet.name}
            </h1>
            <p className="flex items-baseline gap-2 mt-2 text-lg font-medium text-clay">
              <span className="line-through text-ink-soft">
                ${pet?.originalPriceUsd}{" "}
              </span>
              <span className="">${pet.priceUsd}</span>
            </p>
            <h3 className="text-sm text-gray-400 mt-1">
              You save ${pet.originalPriceUsd - pet.priceUsd} (
              {calculatePercentageOff}%)
            </h3>
            <div className="flex flex-col gap-2">
              <label className="mt-4 text-ink">Quantity </label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => {
                  setQuantity(Number(e.target.value));
                }}
                // defaultValue={1}
                className=" w-46 rounded border border-sand-dark/50 bg-sand px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-clay"
              />
            </div>
            <button
              onClick={() => {
                router.push(`/checkout?petId=${pet.id}&quantity=${quantity}`);
              }}
              className="mt-6 w-full bg-clay px-5 py-4 text-sm font-semibold uppercase tracking-[1px] text-cream transition hover:bg-clay-dark shadow-sm shadow-clay/50"
            >
              Buy Now
            </button>
            <div>
              <h2 className="text-lg font-semibold text-ink mt-8">
                Specifications :-
              </h2>

              <div className="space-y-4 text-sm mt-2">
                <div className="text-sm text-ink-soft">
                  {" "}
                  <h2 className="text-lg font-semibold text-ink">
                    Description
                  </h2>{" "}
                  <p className="text-sm text-ink-soft">
                    {pet.description}
                  </p>{" "}
                </div>
                <Spec
                  label={`${pet?.species?.charAt(0).toUpperCase() + pet?.species?.slice(1)} Name`}
                  value={`${pet.name} (${pet.breed})`}
                />
                <Spec label="Color" value={pet.color} />
                <Spec label="Age" value={pet.ageLabel} />
                <Spec label="Gender" value={pet.gender} />
                <Spec label="Size" value={pet.size} />
                <Spec label="Weight" value={pet.weight} />
                <Spec
                  label="Expected Adult Weight"
                  value={pet.expectedAdultWeight}
                />
                <Spec label="Coat Type" value={pet.coatType} />
                <Spec label="Eye Color" value={pet.eyeColor} />
                <Spec label="Activity Level" value={pet.activityLevel} />
                <Spec label="Barking Level" value={pet.barkingLevel} />
                <Spec label="Shedding Level" value={pet.sheddingLevel} />
                <Spec label="Vocal Level" value={pet.vocalLevel} />
                <Spec label="Exercise Needs" value={pet.exerciseNeeds} />
                <Spec label="Grooming Needs" value={pet.groomingNeeds} />
                <Spec
                  label="Location"
                  value={`${pet.city}, ${pet.region}, ${pet.country}`}
                />
                {/* <Spec label="Availability" value={pet.availability} /> */}
                {/* <Spec label="Reserve Amount" value={`$${pet.reserveAmount}`} /> */}
                {/* <Spec label="Registration" value={pet.registeredOrganization} /> */}
                {/* <Spec
                  label="Registration Number"
                  value={pet.registrationNumber}
                /> */}
              </div>

              {/* {pet.temperament?.length ? (
                <div className="mt-6">
                  <h3 className="font-semibold text-ink mb-2">Temperament</h3>
                  <div className="flex flex-wrap gap-2">
                    {pet.temperament.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-sand px-3 py-1 text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null} */}

              {/* {pet.included?.length ? (
                <div className="mt-6">
                  <h3 className="font-semibold text-ink mb-2">Included</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {pet.included.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
