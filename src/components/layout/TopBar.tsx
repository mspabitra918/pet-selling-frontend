import { MdOutlinePets } from "react-icons/md";

export default function TopBar() {
  return (
    <div className="bg-ink py-2 text-center text-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 text-[11px] font-light uppercase tracking-[2.5px] sm:px-6 sm:text-xs lg:px-8">
        <MdOutlinePets size={15} className="text-gold" />
        <span>
          🇺🇸 🇨🇦 Free insured delivery across the US &amp; Canada
          <span className="mx-2 hidden text-gold sm:inline">•</span>
          <span className="hidden sm:inline">14-day health guarantee</span>
        </span>
        <MdOutlinePets size={15} className="text-gold" />
      </div>
    </div>
  );
}
