"use client";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
  MdOutlinePets,
} from "react-icons/md";
import { HiOutlineX } from "react-icons/hi";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Breeders", href: "/breeders" },
  { label: "Adoption", href: "/adoption" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const petLinks = [
  { label: "Pets", href: "/browse-pets" },
  { label: "Dogs", href: "/dogs" },
  { label: "Cats", href: "/cats" },
  { label: "Birds", href: "/birds" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [listOfPet, setListOfPet] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  // useEffect(() => {
  //   const response = pets.filter((pet) => {
  //     const query = searchQuery.trim().toLowerCase();

  //     return (
  //       pet.name.toLowerCase().includes(query) ||
  //       pet.breed.toLowerCase().includes(query)
  //     );
  //   });

  //   console.log("Search results:", response);
  // }, [searchQuery]);

  // const handleSearch = () => {
  //   router.push(`/browse-pets?search=${encodeURIComponent(searchQuery)}`);
  //   setOpenSearch(false);
  // };

  // The public site chrome shouldn't render inside the admin panel or on the
  // login screen.
  if (
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/auth") ||
    pathname?.startsWith("/checkout")
  ) {
    return null;
  }

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-sand-dark/60 bg-cream/85 backdrop-blur-md w-full">
        <div className="mx-auto w-full max-w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-clay text-cream">
                <MdOutlinePets size={20} />
              </span>
              <span className="font-display text-2xl font-semibold tracking-tight text-ink">
                PawVerse
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden items-center gap-6 lg:gap-9 lg:flex flex-nowrap">
              <Link
                href="/"
                className="text-[13px] font-medium uppercase tracking-[1.5px] text-ink transition hover:text-clay whitespace-nowrap"
              >
                Home
              </Link>

              <div
                className="relative"
                onMouseEnter={() => setListOfPet(true)}
                onMouseLeave={() => setListOfPet(false)}
              >
                <button
                  className="flex cursor-pointer items-center gap-1 text-[13px] font-medium uppercase tracking-[1.5px] text-ink transition hover:text-clay whitespace-nowrap"
                  onClick={() => setListOfPet((v) => !v)}
                >
                  Browse Pets
                  {listOfPet ? (
                    <MdOutlineKeyboardArrowUp />
                  ) : (
                    <MdOutlineKeyboardArrowDown />
                  )}
                </button>
                {listOfPet && (
                  <div className="absolute left-0 top-full w-48 overflow-hidden rounded-xl border border-sand-dark/60 bg-cream pt-2 shadow-xl shadow-ink/5">
                    {petLinks.map((pet) => (
                      <Link
                        key={pet.href}
                        href={pet.href}
                        onClick={() => setListOfPet(false)}
                        className="block px-5 py-2.5 text-[13px] font-medium uppercase tracking-[1.5px] text-ink transition hover:bg-sand hover:text-clay"
                      >
                        {pet.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {navLinks
                .filter((l) => l.label !== "Home")
                .map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[13px] font-medium uppercase tracking-[1.5px] text-ink transition hover:text-clay whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                ))}
            </div>

            {/* Right Side */}
            {/* <div className="hidden items-center gap-4 lg:flex relative"> */}
            {/* <button
              onClick={() => {
                setOpenSearch(!openSearch);
              }}
              // aria-label="Search"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-dark/70 text-ink transition hover:border-clay hover:text-clay"
            >
              <FiSearch size={17} />
            </button>
            <Link
              href="/list-pet"
              className="rounded-full bg-clay px-6 py-2.5 text-[13px] font-semibold uppercase tracking-[1.5px] text-cream transition hover:bg-clay-dark"
            >
              List a Pet
            </Link> */}
            {/* {openSearch && (
              <div className="absolute right-0 top-full mt-2 w-[300px] rounded-xl border border-sand-dark/60 bg-cream p-4 shadow-xl shadow-ink/5">
                <div className="flex items-center gap-3">
                  <FiSearch size={18} className="text-ink-soft" />
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSearch();
                    }}
                    className="flex-1"
                  >
                    <input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      type="text"
                      placeholder="Search pets..."
                      className="w-full bg-transparent text-sm text-ink placeholder:text-ink-soft focus:outline-none"
                    />
                  </form>
                  <button
                    onClick={() => setOpenSearch(false)}
                    aria-label="Close search"
                    className="text-ink-soft transition hover:text-clay"
                  >
                    <HiOutlineX size={20} />
                  </button>
                </div>
              </div>
            )} */}
            {/* </div> */}

            {/* Mobile Menu Button */}
            <button
              className="text-ink lg:hidden"
              aria-label="Open menu"
              onClick={() => setOpenMenu(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M4 7h16M4 12h16M4 17h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer — rendered outside <nav> so backdrop-blur/overflow on the
          nav don't trap or clip this fixed element */}
      <div
        onClick={() => setOpenMenu(false)}
        className={`fixed inset-0 z-[60] h-screen w-screen transition-all duration-500 lg:hidden ${
          openMenu ? "visible bg-ink/40 opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed right-0 top-0 z-[61] h-screen w-[82%] max-w-sm transform bg-cream shadow-2xl transition-transform duration-500 ease-in-out ${
            openMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-sand-dark/60 px-6 py-5">
            <span className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
              <MdOutlinePets className="text-clay" /> PawVerse
            </span>
            <button onClick={() => setOpenMenu(false)} aria-label="Close menu">
              <HiOutlineX size={26} className="text-ink" />
            </button>
          </div>

          <div className="flex flex-col px-6 py-6">
            <ul className="flex flex-col gap-2 text-ink">
              {navLinks.map((link) =>
                link.label === "Home" ? (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpenMenu(false)}
                      className="block py-2.5 text-sm font-medium uppercase tracking-[2px] transition hover:text-clay"
                    >
                      {link.label}
                    </Link>
                  </li>
                ) : null,
              )}

              <li>
                <button
                  onClick={() => setListOfPet((v) => !v)}
                  className="flex w-full items-center justify-between py-2.5 text-sm font-medium uppercase tracking-[2px] transition hover:text-clay"
                >
                  Browse Pets
                  {listOfPet ? (
                    <MdOutlineKeyboardArrowUp />
                  ) : (
                    <MdOutlineKeyboardArrowDown />
                  )}
                </button>
                {listOfPet && (
                  <ul className="mb-1 ml-3 flex flex-col gap-1 border-l border-sand-dark/60 pl-4">
                    {petLinks.map((pet) => (
                      <li key={pet.href}>
                        <Link
                          href={pet.href}
                          onClick={() => {
                            setOpenMenu(false);
                            setListOfPet(false);
                          }}
                          className="block py-2 text-sm tracking-[1px] text-ink-soft transition hover:text-clay"
                        >
                          {pet.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>

              {navLinks
                .filter((l) => l.label !== "Home")
                .map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpenMenu(false)}
                      className="block py-2.5 text-sm font-medium uppercase tracking-[2px] transition hover:text-clay"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>

            {/* <Link
              href="/list-pet"
              onClick={() => setOpenMenu(false)}
              className="mt-6 rounded-full bg-clay py-3 text-center text-sm font-semibold uppercase tracking-[2px] text-cream transition hover:bg-clay-dark"
            >
              List a Pet
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
}
