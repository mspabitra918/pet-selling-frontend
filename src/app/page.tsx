import Hero from "@/src/components/home/Hero";
import Categories from "@/src/components/home/Categories";
import FeaturedPets from "@/src/components/home/FeaturedPets";
import HowItWorks from "@/src/components/home/HowItWorks";
import WhyChooseUs from "@/src/components/home/WhyChooseUs";
import FeaturedBreeders from "@/src/components/home/FeaturedBreeders";
import Testimonials from "@/src/components/home/Testimonials";
import CtaBand from "@/src/components/home/CtaBand";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedPets />
      <HowItWorks />
      <WhyChooseUs />
      <FeaturedBreeders />
      <Testimonials />
      <CtaBand />
    </>
  );
}
