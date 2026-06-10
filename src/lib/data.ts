// Mock data for the PawVerse premium pet marketplace (US + Canada).
// Replace with a real API / database later.

export type Country = "CA" | "US";

export type Pet = {
  coatType?:
    | "Short Smooth Coat"
    | "Long Silky Coat"
    | "Double Coat"
    | "Curly Coat"
    | "Wirehaired"
    | "Hairless"
    | "Long Dense Coat";
  id: string;
  name: string;
  image: string;
  species: "Dog" | "Cat" | "Bird";
  breed: string;
  ageLabel: string;
  gender: "Male" | "Female";
  ageWeeks: number;
  color?: string;
  size?: "Small" | "Medium" | "Large";
  weight?: string;
  availability?: "Available" | "Pending" | "Sold";
  description?: string;
  groomingNeeds?: string;
  originalPriceUsd: number;
  health?: {
    vaccinated?: boolean;
    dewormed?: boolean;
    microchipped?: boolean;
    vetChecked?: boolean;
    healthCertificate?: boolean;
    healthGuaranteeMonths?: number;
  };
  parents?: {
    sire: {
      name: string;
      breed: string;
      weight?: string;
      registered: boolean;
      color?: string;
      eyeColor?: string;
    };
    dam: {
      name: string;
      breed: string;
      weight?: string;
      registered: boolean;
      color?: string;
      eyeColor?: string;
    };
  };
  traits?: string[];
  included?: string[]; // e.g. starter food, toys, etc.
  registeredOrganization?: string; // e.g. AKC, CFA, TICA
  registrationNumber?: string;
  personalityType?: string; // e.g. "Companion Dog", "Working Dog", etc.
  trainabilityRating?: number; // 1-5
  friendlinessRating?: number; // 1-5
  energyRating?: number; // 1-5
  deliveryOptions?: {
    localPickup: boolean;
    airportDelivery: boolean;
    nationwideShipping: boolean;
  };
  gallery?: string[];
  priceUsd: number;
  city: string;
  region: string; // state or province
  country: Country;
  breederId: string;
  badges: string[];
  featured?: boolean;
  breeder?: {
    name: string;
    experienceYears: number;
    rating: number;
    reviewCount: number;
    responseTime: string;
  };
  createdAt: string; // ISO date string
  expectedAdultWeight?: string;
  eyeColor?: string;
  temperament?: string[];
  feedingSchedule?: {
    mealsPerDay: number;
    foodType: string;
  };
  training?: {
    crateTrained?: boolean;
    pottyTrainingStarted?: boolean;
    leashTrainingStarted?: boolean;
    litterTrained?: boolean;
    scratchingPostTrained?: boolean;
    socialized?: boolean;
  };
  goodWithKids?: boolean;
  goodWithDogs?: boolean;
  goodWithCats?: boolean;
  activityLevel?: "Low" | "Moderate" | "High";
  barkingLevel?: "Low" | "Moderate" | "High";
  sheddingLevel?: "Low" | "Moderate" | "High";
  vocalLevel?: "Low" | "Moderate" | "High";
  exerciseNeeds?: string;
  favoriteToy?: string;
  adoptionRequirements?: string[];
  reserveAmount?: number;
};

export type Category = {
  slug: string;
  label: string;
  blurb: string;
  count: number;
  image: string;
};

export type Breeder = {
  id: string;
  name: string;
  kennel: string;
  city: string;
  region: string;
  country: Country;
  specialty: string;
  rating: number;
  reviews: number;
  yearsActive: number;
  avatar: string;
  verified: boolean;
};

export type Testimonial = {
  id: string;
  quote: string;
  author: string;
  location: string;
  pet: string;
  avatar: string;
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

export const categories: Category[] = [
  {
    slug: "dogs",
    label: "Dogs",
    blurb: "Loyal companions from health-tested lines",
    count: 1840,
    image: img("photo-1543466835-00a7907e9de1"),
  },
  {
    slug: "cats",
    label: "Cats",
    blurb: "Pedigree kittens raised underfoot",
    count: 920,
    image: img("photo-1514888286974-6c03e2ca1dba"),
  },
  {
    slug: "birds",
    label: "Birds",
    blurb: "Hand-raised, well-socialised companions",
    count: 410,
    image: img("photo-1452570053594-1b985d6ea890"),
  },
];

// export const canadaRegions = [
//   { code: "AB", name: "Alberta" },
//   { code: "BC", name: "British Columbia" },
//   { code: "MB", name: "Manitoba" },
//   { code: "NB", name: "New Brunswick" },
//   { code: "NL", name: "Newfoundland and Labrador" },
//   { code: "NS", name: "Nova Scotia" },
//   { code: "ON", name: "Ontario" },
//   { code: "PE", name: "Prince Edward Island" },
//   { code: "QC", name: "Quebec" },
//   { code: "SK", name: "Saskatchewan" },

//   // Territories
//   { code: "NT", name: "Northwest Territories" },
//   { code: "NU", name: "Nunavut" },
//   { code: "YT", name: "Yukon" },
// ];

export const pets: Pet[] = [
  {
    id: "8a1e742e-a0b4-4b3f-8df8-c525b8de3b5e",
    name: "Luna",
    species: "Dog",
    breed: "Golden Retriever",
    ageLabel: "9 weeks",
    ageWeeks: 9,
    gender: "Female",
    color: "Golden",
    coatType: "Short Smooth Coat",
    size: "Large",
    weight: "6.8 lbs",
    priceUsd: 2200,
    originalPriceUsd: 2500,

    city: "Toronto",
    region: "ON",
    country: "CA",

    image: img("photo-1633722715463-d30f4f325e24"),

    breederId: "b-sunrise",

    featured: true,
    availability: "Available",

    badges: [
      "Health Guarantee",
      "Vaccinated",
      "Microchipped",
      "AKC Registered",
    ],

    description:
      "Luna is a beautiful Golden Retriever puppy with a friendly temperament and playful personality. She has been raised in a family environment, socialized with children, and receives daily care and enrichment activities.",

    health: {
      vaccinated: true,
      dewormed: true,
      microchipped: true,
      vetChecked: true,
      healthCertificate: true,
      healthGuaranteeMonths: 12,
    },

    parents: {
      sire: {
        name: "Max",
        breed: "Golden Retriever",
        weight: "75 lbs",
        registered: true,
      },
      dam: {
        name: "Bella",
        breed: "Golden Retriever",
        weight: "65 lbs",
        registered: true,
      },
    },

    traits: [
      "Friendly",
      "Intelligent",
      "Playful",
      "Family Friendly",
      "Good with Children",
      "Easy to Train",
    ],

    included: [
      "Starter Food Pack",
      "Health Records",
      "Vaccination Record",
      "Microchip Registration",
      "Puppy Care Guide",
    ],

    deliveryOptions: {
      localPickup: true,
      airportDelivery: true,
      nationwideShipping: true,
    },

    gallery: [
      img("photo-1633722715463-d30f4f325e24"),
      img("photo-1587300003388-59208cc962cb"),
      img("photo-1518717758536-85ae29035b6d"),
      img("photo-1558788353-f76d92427f16"),
    ],

    breeder: {
      name: "Sunrise Golden Retrievers",
      experienceYears: 12,
      rating: 4.9,
      reviewCount: 127,
      responseTime: "Within 1 hour",
    },

    createdAt: "2026-05-20",
  },
  {
    id: "7065f3ca-3ef2-480d-b79e-df7120281f20",
    name: "Milo",
    species: "Dog",
    breed: "French Bulldog",
    ageLabel: "11 weeks",
    ageWeeks: 11,
    gender: "Male",

    color: "Cream",
    coatType: "Short Smooth Coat",
    size: "Small",
    weight: "5.2 lbs",
    expectedAdultWeight: "22-28 lbs",

    priceUsd: 3800,
    originalPriceUsd: 4200,
    city: "Toronto",
    region: "ON",
    country: "CA",

    image: img("photo-1620189507195-68309c04c4d0"),

    gallery: [
      img("photo-1620189507195-68309c04c4d0"),
      img("photo-1583511655857-d19b40a7a54e"),
      img("photo-1548199973-03cce0bbc87b"),
      img("photo-1517849845537-4d257902454a"),
    ],

    breederId: "b-maple",

    badges: [
      "Health Guarantee",
      "Vet Checked",
      "Microchipped",
      "Family Raised",
    ],

    featured: true,
    availability: "Available",

    description:
      "Milo is an adorable French Bulldog puppy with a playful personality and affectionate nature. Raised in a loving family environment, he is well-socialized with children and other pets. Milo enjoys cuddles, short walks, and interactive play sessions.",

    temperament: [
      "Affectionate",
      "Friendly",
      "Playful",
      "Loyal",
      "Calm",
      "Adaptable",
    ],

    traits: [
      "Great Companion",
      "Apartment Friendly",
      "Easy Going",
      "Socialized",
      "Family Friendly",
    ],

    health: {
      vaccinated: true,
      dewormed: true,
      microchipped: true,
      vetChecked: true,
      healthCertificate: true,
      healthGuaranteeMonths: 12,
    },

    parents: {
      sire: {
        name: "Bruno",
        breed: "French Bulldog",
        color: "Blue Fawn",
        weight: "26 lbs",
        registered: true,
      },
      dam: {
        name: "Daisy",
        breed: "French Bulldog",
        color: "Cream",
        weight: "24 lbs",
        registered: true,
      },
    },

    included: [
      "Vaccination Records",
      "Health Certificate",
      "Starter Food Pack",
      "Puppy Care Guide",
      "Microchip Registration",
      "Blanket with Mother's Scent",
    ],

    feedingSchedule: {
      mealsPerDay: 4,
      foodType: "Premium Puppy Kibble",
    },

    training: {
      crateTrained: false,
      pottyTrainingStarted: true,
      leashTrainingStarted: true,
    },

    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: true,

    activityLevel: "Moderate",
    barkingLevel: "Low",

    deliveryOptions: {
      localPickup: true,
      airportDelivery: true,
      nationwideShipping: true,
    },

    breeder: {
      name: "Maple French Bulldogs",
      experienceYears: 10,
      rating: 4.9,
      reviewCount: 143,
      responseTime: "Within 1 hour",
    },

    favoriteToy: "Plush Squeaky Bone",

    adoptionRequirements: [
      "Secure home environment",
      "Commitment to regular vet care",
      "Responsible pet ownership",
    ],

    reserveAmount: 500,

    createdAt: "2026-05-15",
  },
  {
    id: "1f380e9e-aa0b-46f5-9668-cac2d74ae083",
    name: "Willow",
    species: "Cat",
    breed: "Ragdoll",
    ageLabel: "12 weeks",
    ageWeeks: 12,
    gender: "Female",

    color: "Seal Point",
    coatType: "Long Silky Coat",
    eyeColor: "Blue",
    size: "Medium",
    weight: "3.8 lbs",
    expectedAdultWeight: "10-15 lbs",

    priceUsd: 1500,
    originalPriceUsd: 2500,

    city: "Seattle",
    region: "WA",
    country: "CA",

    image: img("photo-1574158622682-e40e69881006"),

    gallery: [
      img("photo-1574158622682-e40e69881006"),
      img("photo-1519052537078-e6302a4968d4"),
      img("photo-1511044568932-338cba0ad803"),
      img("photo-1495360010541-f48722b34f7d"),
    ],

    breederId: "b-cascade",

    badges: ["TICA Registered", "Vaccinated", "Microchipped", "Vet Checked"],

    featured: true,
    availability: "Available",

    description:
      "Willow is a beautiful Ragdoll kitten with striking blue eyes and an exceptionally gentle temperament. She has been raised indoors in a loving environment and is well-socialized with people and other pets.",

    temperament: [
      "Gentle",
      "Affectionate",
      "Calm",
      "Friendly",
      "Social",
      "Intelligent",
    ],

    traits: [
      "Indoor Raised",
      "Family Friendly",
      "Litter Trained",
      "Loves Cuddles",
      "Low Aggression",
    ],

    health: {
      vaccinated: true,
      dewormed: true,
      microchipped: true,
      vetChecked: true,
      healthCertificate: true,
      healthGuaranteeMonths: 12,
    },

    parents: {
      sire: {
        name: "Oliver",
        breed: "Ragdoll",
        color: "Blue Point",
        weight: "16 lbs",
        registered: true,
      },
      dam: {
        name: "Lily",
        breed: "Ragdoll",
        color: "Seal Point",
        weight: "12 lbs",
        registered: true,
      },
    },

    included: [
      "Vaccination Records",
      "Health Certificate",
      "TICA Registration Papers",
      "Starter Food Pack",
      "Kitten Care Guide",
      "Favorite Toy",
      "Blanket with Familiar Scent",
    ],

    feedingSchedule: {
      mealsPerDay: 3,
      foodType: "Premium Kitten Food",
    },

    training: {
      litterTrained: true,
      scratchingPostTrained: true,
      socialized: true,
    },

    goodWithKids: true,
    goodWithCats: true,
    goodWithDogs: true,

    activityLevel: "Moderate",
    vocalLevel: "Low",

    deliveryOptions: {
      localPickup: true,
      airportDelivery: true,
      nationwideShipping: true,
    },

    breeder: {
      name: "Cascade Ragdolls",
      experienceYears: 8,
      rating: 4.9,
      reviewCount: 98,
      responseTime: "Within 2 hours",
    },

    favoriteToy: "Feather Wand",

    adoptionRequirements: [
      "Indoor home preferred",
      "Regular veterinary care",
      "Safe and loving environment",
    ],

    reserveAmount: 300,

    createdAt: "2026-05-18",
  },
  {
    id: "768cc8b4-c78d-45aa-9a54-855ac8d00028",
    name: "Koda",
    species: "Dog",
    breed: "Siberian Husky",
    ageLabel: "10 weeks",
    ageWeeks: 10,
    gender: "Male",

    color: "Black & White",
    coatType: "Double Coat",
    eyeColor: "Ice Blue",
    size: "Medium",
    weight: "7.4 lbs",
    expectedAdultWeight: "45-60 lbs",

    priceUsd: 1900,
    originalPriceUsd: 2500,
    city: "Calgary",
    region: "AB",
    country: "CA",

    image: img("photo-1605568427561-40dd23c2acea"),

    gallery: [
      img("photo-1605568427561-40dd23c2acea"),
      img("photo-1517849845537-4d257902454a"),
      img("photo-1507146426996-ef05306b995a"),
      img("photo-1548199973-03cce0bbc87b"),
    ],

    breederId: "b-maple",

    badges: ["Health Guarantee", "Microchipped", "Vaccinated", "Vet Checked"],

    featured: true,
    availability: "Available",

    description:
      "Koda is a stunning Siberian Husky puppy with beautiful blue eyes and a playful personality. He is highly intelligent, energetic, and enjoys exploring new environments. Raised in a family setting and well-socialized with people and other pets.",

    temperament: [
      "Energetic",
      "Intelligent",
      "Friendly",
      "Outgoing",
      "Playful",
      "Adventurous",
    ],

    traits: [
      "Blue Eyes",
      "Family Friendly",
      "Highly Intelligent",
      "Socialized",
      "Outdoor Lover",
    ],

    health: {
      vaccinated: true,
      dewormed: true,
      microchipped: true,
      vetChecked: true,
      healthCertificate: true,
      healthGuaranteeMonths: 12,
    },

    parents: {
      sire: {
        name: "Thor",
        breed: "Siberian Husky",
        color: "Black & White",
        eyeColor: "Blue",
        weight: "58 lbs",
        registered: true,
      },
      dam: {
        name: "Aurora",
        breed: "Siberian Husky",
        color: "Gray & White",
        eyeColor: "Brown",
        weight: "50 lbs",
        registered: true,
      },
    },

    included: [
      "Vaccination Records",
      "Health Certificate",
      "Microchip Registration",
      "Starter Food Pack",
      "Puppy Care Guide",
      "Leash & Collar",
      "Favorite Toy",
    ],

    feedingSchedule: {
      mealsPerDay: 4,
      foodType: "Premium Large Breed Puppy Food",
    },

    training: {
      crateTrained: false,
      pottyTrainingStarted: true,
      leashTrainingStarted: true,
      socialized: true,
    },

    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: false,

    activityLevel: "High",
    barkingLevel: "Moderate",
    sheddingLevel: "High",

    exerciseNeeds: "60-90 minutes daily",

    deliveryOptions: {
      localPickup: true,
      airportDelivery: true,
      nationwideShipping: true,
    },

    breeder: {
      name: "Maple Huskies",
      experienceYears: 11,
      rating: 4.8,
      reviewCount: 124,
      responseTime: "Within 1 hour",
    },

    favoriteToy: "Rope Tug Toy",

    adoptionRequirements: [
      "Active household preferred",
      "Secure fenced yard recommended",
      "Experience with energetic breeds is a plus",
      "Commitment to regular exercise",
    ],

    reserveAmount: 400,

    createdAt: "2026-05-22",
  },
  {
    id: "9e17f6c4-9450-42a8-95f4-a0dfcb6a6cbd",
    name: "Atlas",
    species: "Cat",
    breed: "Maine Coon",
    ageLabel: "14 weeks",
    ageWeeks: 14,
    gender: "Male",

    color: "Brown Tabby",
    coatType: "Long Dense Coat",
    eyeColor: "Golden Green",
    size: "Large",
    weight: "5.6 lbs",
    expectedAdultWeight: "15-22 lbs",

    priceUsd: 2100,
    originalPriceUsd: 2500,
    city: "Denver",
    region: "CO",
    country: "CA",

    image: img("photo-1606214174585-fe31582dc6ee"),

    gallery: [
      img("photo-1606214174585-fe31582dc6ee"),
      img("photo-1511044568932-338cba0ad803"),
      img("photo-1519052537078-e6302a4968d4"),
      img("photo-1495360010541-f48722b34f7d"),
    ],

    breederId: "b-cascade",

    badges: [
      "CFA Registered",
      "Vet Checked",
      "Vaccinated",
      "Microchipped",
      "Health Guarantee",
    ],

    featured: true,
    availability: "Available",

    description:
      "Atlas is a handsome Maine Coon kitten with a majestic appearance, large paws, and a luxurious coat. He is affectionate, playful, and enjoys spending time with people. Raised indoors and well-socialized from an early age.",

    temperament: [
      "Gentle",
      "Friendly",
      "Intelligent",
      "Playful",
      "Affectionate",
      "Confident",
    ],

    traits: [
      "Large Breed",
      "Indoor Raised",
      "Family Friendly",
      "Litter Trained",
      "Highly Social",
      "Loves Attention",
    ],

    health: {
      vaccinated: true,
      dewormed: true,
      microchipped: true,
      vetChecked: true,
      healthCertificate: true,
      healthGuaranteeMonths: 12,
    },

    parents: {
      sire: {
        name: "Leo",
        breed: "Maine Coon",
        color: "Silver Tabby",
        weight: "21 lbs",
        registered: true,
      },
      dam: {
        name: "Nala",
        breed: "Maine Coon",
        color: "Brown Tabby",
        weight: "15 lbs",
        registered: true,
      },
    },

    included: [
      "CFA Registration Papers",
      "Vaccination Records",
      "Health Certificate",
      "Microchip Registration",
      "Starter Food Pack",
      "Kitten Care Guide",
      "Favorite Toy",
      "Blanket with Familiar Scent",
    ],

    feedingSchedule: {
      mealsPerDay: 3,
      foodType: "Premium Kitten Food",
    },

    training: {
      litterTrained: true,
      scratchingPostTrained: true,
      socialized: true,
    },

    goodWithKids: true,
    goodWithCats: true,
    goodWithDogs: true,

    activityLevel: "Moderate",
    vocalLevel: "Moderate",

    groomingNeeds: "Brushing 2-3 times per week",
    sheddingLevel: "Moderate",

    deliveryOptions: {
      localPickup: true,
      airportDelivery: true,
      nationwideShipping: true,
    },

    breeder: {
      name: "Cascade Maine Coons",
      experienceYears: 12,
      rating: 4.9,
      reviewCount: 167,
      responseTime: "Within 1 hour",
    },

    favoriteToy: "Interactive Feather Wand",

    adoptionRequirements: [
      "Indoor home preferred",
      "Regular grooming commitment",
      "Routine veterinary care",
      "Safe and loving environment",
    ],

    reserveAmount: 400,

    createdAt: "2026-05-20",
  },
  {
    id: "78debbb8-f8e3-4b13-b522-29e71bec3b31",
    name: "Bella",
    species: "Dog",
    breed: "Pomeranian",
    ageLabel: "8 weeks",
    ageWeeks: 8,
    gender: "Female",

    color: "Orange Sable",
    coatType: "Double Coat",
    eyeColor: "Dark Brown",
    size: "Small",
    weight: "2.4 lbs",
    expectedAdultWeight: "4-7 lbs",

    priceUsd: 2600,
    originalPriceUsd: 3000,
    city: "Vancouver",
    region: "BC",
    country: "CA",

    image: img("photo-1517423440428-a5a00ad493e8"),

    gallery: [
      img("photo-1517423440428-a5a00ad493e8"),
      img("photo-1583511655857-d19b40a7a54e"),
      img("photo-1548199973-03cce0bbc87b"),
      img("photo-1517849845537-4d257902454a"),
    ],

    breederId: "b-maple",

    badges: [
      "Health Guarantee",
      "Vaccinated",
      "Microchipped",
      "Family Raised",
      "Vet Checked",
      "Socialized",
    ],

    featured: true,
    availability: "Available",

    description:
      "Bella is a beautiful Orange Sable Pomeranian puppy with a luxurious fluffy coat and an outgoing personality. Raised in a loving family environment, she enjoys cuddles, playtime, and meeting new people. Bella has been socialized from an early age and is developing into a confident and affectionate companion.",

    temperament: [
      "Playful",
      "Outgoing",
      "Affectionate",
      "Alert",
      "Smart",
      "Friendly",
      "Confident",
    ],

    traits: [
      "Family Friendly",
      "Apartment Friendly",
      "Highly Social",
      "Quick Learner",
      "Loves Attention",
      "Excellent Companion",
    ],

    health: {
      vaccinated: true,
      dewormed: true,
      microchipped: true,
      vetChecked: true,
      healthCertificate: true,
      healthGuaranteeMonths: 12,
    },

    parents: {
      sire: {
        name: "Teddy",
        breed: "Pomeranian",
        color: "Orange",
        weight: "5 lbs",
        registered: true,
      },
      dam: {
        name: "Daisy",
        breed: "Pomeranian",
        color: "Cream Sable",
        weight: "6 lbs",
        registered: true,
      },
    },

    feedingSchedule: {
      mealsPerDay: 4,
      foodType: "Premium Small Breed Puppy Food",
    },

    training: {
      crateTrained: false,
      pottyTrainingStarted: true,
      leashTrainingStarted: true,
      socialized: true,
    },

    included: [
      "Vaccination Records",
      "Health Certificate",
      "Microchip Registration",
      "Starter Food Pack",
      "Puppy Care Guide",
      "Blanket with Familiar Scent",
      "Favorite Toy",
      "Collar",
    ],

    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: true,

    activityLevel: "Moderate",
    barkingLevel: "Moderate",
    sheddingLevel: "Moderate",

    groomingNeeds: "Daily Brushing",
    exerciseNeeds: "20-30 minutes daily",

    deliveryOptions: {
      localPickup: true,
      airportDelivery: true,
      nationwideShipping: true,
    },

    breeder: {
      name: "Maple Pomeranians",
      experienceYears: 9,
      rating: 4.9,
      reviewCount: 113,
      responseTime: "Within 1 hour",
    },

    favoriteToy: "Mini Plush Teddy Bear",

    adoptionRequirements: [
      "Safe indoor environment",
      "Regular grooming commitment",
      "Routine veterinary care",
      "Responsible pet ownership",
    ],

    reserveAmount: 500,

    registeredOrganization: "CKC",
    registrationNumber: "CKC-POM-2026-4587",

    personalityType: "Companion Dog",
    trainabilityRating: 4,
    friendlinessRating: 5,
    energyRating: 4,

    createdAt: "2026-05-25",
  },
  {
    id: "a37de47d-95a6-42a5-a632-6212d1cce205",
    name: "Rio",
    species: "Bird",
    breed: "Blue & Gold Macaw",
    ageLabel: "6 months",
    ageWeeks: 24, // ✅ required
    gender: "Male",

    color: "Blue & Gold",
    size: "Large",
    weight: "2.6 lbs",

    priceUsd: 2400,
    originalPriceUsd: 3000,
    city: "Miami",
    region: "FL",
    country: "CA",

    image: img("photo-1552728089-57bdde30beb3"),

    gallery: [
      img("photo-1552728089-57bdde30beb3"),
      img("photo-1668891471433-5ebea38523f7"),
      img("photo-1757899491116-ef52ffc406b9"),
      img("photo-1778361324446-93203320980e"),
    ],

    breederId: "b-sunrise",

    badges: ["Hand-Raised", "Vet Checked", "DNA Tested", "Socialized"],

    featured: true,
    availability: "Available",

    description:
      "Rio is a beautiful Blue & Gold Macaw with vibrant colors and a friendly personality. He has been hand-raised and enjoys interacting with people.",

    temperament: ["Intelligent", "Social", "Curious", "Playful", "Friendly"],

    health: {
      vaccinated: true,
      vetChecked: true,
      healthCertificate: true,
      healthGuaranteeMonths: 12,
    },

    breeder: {
      name: "Sunrise Exotic Birds",
      experienceYears: 15,
      rating: 4.9,
      reviewCount: 87,
      responseTime: "Within 1 hour",
    },

    reserveAmount: 600,
    createdAt: "2026-05-25", // ✅ required
  },
  {
    id: "a4180b54-da0d-430d-8d91-c0d7dabe3f8d",
    name: "Pip",
    species: "Dog",
    breed: "Pembroke Welsh Corgi",
    ageLabel: "9 weeks",
    ageWeeks: 9,
    gender: "Female",

    color: "Red & White",
    coatType: "Double Coat",
    size: "Medium",
    weight: "5.8 lbs",
    expectedAdultWeight: "24-30 lbs",

    priceUsd: 2750,
    originalPriceUsd: 3250,
    city: "Portland",
    region: "OR",
    country: "CA",

    image: img("photo-1612536057832-2ff7ead58194"),

    gallery: [
      img("photo-1612536057832-2ff7ead58194"),
      img("photo-1517849845537-4d257902454a"),
      img("photo-1520975910677-39850f1b4d38"),
      img("photo-1517423440428-a5a00ad493e8"),
    ],

    breederId: "b-cascade",

    badges: ["Health Guarantee", "Microchipped", "Vaccinated", "Vet Checked"],

    featured: true,
    availability: "Available",

    description:
      "Pip is a cheerful Pembroke Welsh Corgi puppy with a loving personality and endless curiosity. She is well-socialized and enjoys playtime with children and other pets.",

    temperament: ["Friendly", "Loyal", "Intelligent", "Playful", "Energetic"],

    health: {
      vaccinated: true,
      dewormed: true,
      microchipped: true,
      vetChecked: true,
      healthCertificate: true,
      healthGuaranteeMonths: 12,
    },

    parents: {
      sire: {
        name: "Cooper",
        breed: "Pembroke Welsh Corgi",
        weight: "29 lbs",
        registered: true,
      },
      dam: {
        name: "Ruby",
        breed: "Pembroke Welsh Corgi",
        weight: "26 lbs",
        registered: true,
      },
    },

    goodWithKids: true,
    goodWithDogs: true,
    goodWithCats: true,

    activityLevel: "High",
    trainabilityRating: 5,

    breeder: {
      name: "Cascade Corgis",
      experienceYears: 10,
      rating: 4.9,
      reviewCount: 142,
      responseTime: "Within 1 hour",
    },

    included: [
      "Vaccination Records",
      "Health Certificate",
      "Microchip Registration",
      "Starter Food Pack",
      "Puppy Care Guide",
    ],

    reserveAmount: 550,

    createdAt: "2026-05-28",
  },
];

export const breeders: Breeder[] = [
  {
    id: "b-sunrise",
    name: "Hannah Reyes",
    kennel: "Sunrise Companions",
    city: "Austin",
    region: "TX",
    country: "US",
    specialty: "Golden Retrievers & Macaws",
    rating: 4.9,
    reviews: 213,
    yearsActive: 12,
    avatar: img("photo-1544005313-94ddf0286df2"),
    verified: true,
  },
  {
    id: "b-maple",
    name: "Daniel Tremblay",
    kennel: "Maple Ridge Kennels",
    city: "Toronto",
    region: "ON",
    country: "CA",
    specialty: "French Bulldogs & Huskies",
    rating: 4.8,
    reviews: 187,
    yearsActive: 9,
    avatar: img("photo-1500648767791-00dcc994a43e"),
    verified: true,
  },
  {
    id: "b-cascade",
    name: "Mei Lin",
    kennel: "Cascade Cattery",
    city: "Seattle",
    region: "WA",
    country: "US",
    specialty: "Ragdolls & Maine Coons",
    rating: 5.0,
    reviews: 256,
    yearsActive: 15,
    avatar: img("photo-1438761681033-6461ffad8d80"),
    verified: true,
  },
  // {
  //   id: "b-pines",
  //   name: "Avery Cole",
  //   kennel: "Pinecrest Paws",
  //   city: "Denver",
  //   region: "CO",
  //   country: "US",
  //   specialty: "Labradors & Cockatiels",
  //   rating: 4.8,
  //   reviews: 198,
  //   yearsActive: 8,
  //   avatar: img("photo-1524504388940-b1c1722653e1"),
  //   verified: true,
  // },
];

export const testimonials: Testimonial[] = [
  {
    id: "t-1",
    quote:
      "The whole process felt genuinely premium. Our breeder shared vet records, video calls, and Luna arrived healthy and happy. Worth every penny.",
    author: "Marcus & Aria",
    location: "Chicago, IL",
    pet: "Golden Retriever",
    avatar: img("photo-1507003211169-0a1dd7228f2d"),
  },
  {
    id: "t-2",
    quote:
      "I was nervous buying online, but PawVerse's verification gave me real confidence. Milo is the best decision we've made as a family.",
    author: "Priya S.",
    location: "Toronto, ON",
    pet: "French Bulldog",
    avatar: img("photo-1494790108377-be9c29b29330"),
  },
  {
    id: "t-3",
    quote:
      "Transparent pricing, no surprises, and a breeder who actually cared. Willow settled in within a day. Highly recommend.",
    author: "Jordan T.",
    location: "Seattle, WA",
    pet: "Ragdoll Kitten",
    avatar: img("photo-1531123897727-8f129e1688ce"),
  },
  // {
  //   id: "t-4",
  //   quote:
  //     "Buying across the border was seamless. My breeder in Denver handled all the paperwork, and Cooper arrived healthy and happy.",
  //   author: "Nina R.",
  //   location: "Denver, CO",
  //   pet: "Labrador Retriever",
  //   avatar: img("photo-1524504366984-8e8e9f7f9873"),
  // },
];

export const stats = [
  { value: "12,000+", label: "Happy homes matched" },
  { value: "850+", label: "Verified breeders" },
  { value: "98%", label: "Health-guarantee rate" },
  { value: "4.9/5", label: "Average buyer rating" },
];

export const howItWorks = [
  {
    step: "01",
    title: "Browse with confidence",
    body: "Explore listings from breeders who pass our identity, health, and ethics checks. Every profile is transparent.",
  },
  {
    step: "02",
    title: "Connect & verify",
    body: "Chat, request vet records, and schedule video meet-and-greets — all inside PawVerse before you commit.",
  },
  {
    step: "03",
    title: "Secure checkout",
    body: "Pay safely with funds held in escrow until your pet is confirmed delivered, healthy and on time.",
  },
  {
    step: "04",
    title: "Welcome home",
    body: "Insured transport across the US & Canada, plus a 14-day health guarantee and onboarding support.",
  },
];

export const trustPillars = [
  {
    title: "Vetted breeders only",
    body: "Multi-point screening covers licensing, health testing, and facility standards before anyone can list.",
    icon: "shield",
  },
  {
    title: "Health guarantee",
    body: "Every pet ships vet-checked and vaccinated, backed by a 14-day written health guarantee.",
    icon: "heart",
  },
  {
    title: "Secure escrow payments",
    body: "Your payment is protected and only released once your pet arrives safe and sound.",
    icon: "lock",
  },
  {
    title: "Insured nationwide delivery",
    body: "Climate-controlled, USDA-compliant transport to any address across the US and Canada.",
    icon: "truck",
  },
];

export const formatPrice = (usd: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usd);

export const getBreeder = (id: string) => breeders.find((b) => b.id === id);

export const canadaRegions = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland and Labrador" },
  { code: "NS", name: "Nova Scotia" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },

  // Territories
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "YT", name: "Yukon" },
];

export const usStates = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "DC", name: "District of Columbia" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

export const shippingRates = {
  // Canada
  AB: 50,
  BC: 60,
  MB: 55,
  NB: 65,
  NL: 70,
  NS: 65,
  ON: 45,
  PE: 70,
  QC: 50,
  SK: 55,
  NT: 100,
  NU: 120,
  YT: 100,

  // USA
  AL: 40,
  AK: 90,
  AZ: 45,
  AR: 40,
  CA: 55,
  CO: 45,
  CT: 50,
  DE: 45,
  DC: 45,
  FL: 50,
  GA: 45,
  HI: 100,
  ID: 50,
  IL: 45,
  IN: 45,
  IA: 45,
  KS: 45,
  KY: 45,
  LA: 45,
  ME: 55,
  MD: 45,
  MA: 50,
  MI: 45,
  MN: 45,
  MS: 40,
  MO: 45,
  MT: 50,
  NE: 45,
  NV: 50,
  NH: 50,
  NJ: 50,
  NM: 50,
  NY: 55,
  NC: 45,
  ND: 50,
  OH: 45,
  OK: 45,
  OR: 55,
  PA: 50,
  RI: 50,
  SC: 45,
  SD: 50,
  TN: 45,
  TX: 50,
  UT: 50,
  VT: 55,
  VA: 45,
  WA: 55,
  WV: 45,
  WI: 45,
  WY: 50,
};
