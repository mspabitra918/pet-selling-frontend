type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: Props) {
  const isCenter = align === "center";
  return (
    <div className={isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[3px] text-clay ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-6 bg-clay/50" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl md:text-[2.6rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-ink-soft">{subtitle}</p>
      )}
    </div>
  );
}
