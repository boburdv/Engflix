"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [showBlur, setShowBlur] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setShowBlur(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const linkClass = (path) => (pathname === path ? "text-[var(--lime)]" : "text-[var(--white)] hover:text-[var(--lime)] transition-colors duration-300");

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/movies", label: "Movies" },
    { href: "/about", label: "Order" },
  ];

  return (
    <header className="fixed top-0 left-0 z-50 w-full">
      <div className={`absolute inset-0 backdrop-blur-md bg-black/50 transition-opacity duration-700 pointer-events-none ${showBlur ? "opacity-100" : "opacity-0"}`} />

      <div className="relative max-w-7xl mx-auto flex items-center justify-between py-5 px-4 text-[15px]">
        <img src="/engflix-logo.png" alt="logo" className="w-32" />

        <nav className="hidden md:block">
          <ul className="flex gap-7 uppercase">
            <li>
              <Link href="/" className={linkClass("/")}>
                Home
              </Link>
            </li>
            <li className="text-[var(--second-dark)]">|</li>
            <li>
              <Link href="/movies" className={linkClass("/movies")}>
                Movies
              </Link>
            </li>
            <li className="text-[var(--second-dark)]">|</li>
            <li>
              <Link href="/about" className={linkClass("/about")}>
                Order
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <button className="btn py-1.5 px-5 hidden md:inline-flex whitespace-nowrap">SIGN IN</button>

          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg hover:bg-white/10 transition"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <span className="block w-6">
              <span className="block h-0.5 bg-white mb-1.5" />
              <span className="block h-0.5 bg-white mb-1.5" />
              <span className="block h-0.5 bg-white" />
            </span>
          </button>
        </div>
      </div>

      <div className={`fixed inset-0 z-[60] md:hidden transition ${menuOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!menuOpen}>
        <div onClick={() => setMenuOpen(false)} className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${menuOpen ? "opacity-100" : "opacity-0"}`} />

        <aside
          className={`absolute top-0 right-0 h-full w-[80%] max-w-xs bg-black/90 border-l border-white/10 transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
            <img src="/engflix-logo.png" alt="logo" className="w-28" />
            <button onClick={() => setMenuOpen(false)} className="w-10 h-10 inline-flex items-center justify-center rounded-lg hover:bg-white/10 transition" aria-label="Close menu">
              <span className="relative w-5 h-5 block">
                <span className="absolute inset-0 m-auto h-0.5 w-5 bg-white rotate-45" />
                <span className="absolute inset-0 m-auto h-0.5 w-5 bg-white -rotate-45" />
              </span>
            </button>
          </div>

          <nav className="px-4 py-4">
            <ul className="flex flex-col gap-3 uppercase">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`block py-3 px-3 rounded-lg hover:bg-white/10 transition ${linkClass(l.href)}`} onClick={() => setMenuOpen(false)}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button className="btn w-full mt-6 py-2 inline-flex items-center justify-center whitespace-nowrap leading-none" onClick={() => setMenuOpen(false)}>
              SIGN IN
            </button>
          </nav>
        </aside>
      </div>
    </header>
  );
}
