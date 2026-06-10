"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlinePets } from "react-icons/md";
import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";

const columns = [
  {
    title: "Browse",
    links: [
      { label: "Dogs", href: "/dogs" },
      { label: "Cats", href: "/cats" },
      { label: "Birds", href: "/birds" },
      { label: "All pets", href: "/browse-pets" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Breeders", href: "/breeders" },
      { label: "Adoption", href: "/adoption" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "/help" },
      { label: "Health guarantee", href: "/guarantee" },
      { label: "Shipping & delivery", href: "/shipping" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const socials = [
  { Icon: FiInstagram, href: "#", label: "Instagram" },
  { Icon: FiFacebook, href: "#", label: "Facebook" },
  { Icon: FiTwitter, href: "#", label: "Twitter" },
];

export default function Footer() {
  const pathname = usePathname();

  // Hide the public footer inside the admin panel and on the login screen.
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/auth")) {
    return null;
  }

  return (
    <footer className="border-t border-sand-dark/60 bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand + newsletter */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-clay text-cream">
                <MdOutlinePets size={20} />
              </span>
              <span className="font-display text-2xl font-semibold text-ink">
                PawVerse
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-soft">
              The premium marketplace for healthy, ethically raised pets —
              connecting loving homes with vetted breeders across the Canada.
            </p>

            {/* <form className="mt-6 flex max-w-sm overflow-hidden rounded-full border border-sand-dark bg-white">
              <span className="flex items-center pl-4 text-ink-soft">
                <FiMail size={17} />
              </span>
              <input
                type="email"
                placeholder="Get new listings in your inbox"
                className="w-full bg-transparent px-3 py-3 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-clay px-5 text-sm font-semibold uppercase tracking-[1px] text-cream transition hover:bg-clay-dark"
              >
                Join
              </button>
            </form> */}
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[2px] text-ink">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink-soft transition hover:text-clay"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-sand-dark/60 pt-6 sm:flex-row">
          <p className="text-xs text-ink-soft">
            © {2026} PawVerse. All rights reserved. · Serving 🇨🇦 Canada & 🇺🇸
            United States
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-sand-dark text-ink-soft transition hover:border-clay hover:text-clay"
              >
                <Icon size={16} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
