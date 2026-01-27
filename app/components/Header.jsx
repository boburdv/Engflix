"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [ShowBlur, setShowBlur] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setShowBlur(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClass = (path) => (pathname === path ? "text-[var(--lime)]" : "text-[var(--white)] hover:text-[var(--lime)] transition-colors duration-300");

  return (
    <div className="fixed top-0 left-0 z-50 w-full">
      <div className={`absolute top-0 left-0 w-full h-full backdrop-blur-md bg-black/50 transition-opacity duration-800 pointer-events-none ${ShowBlur ? "opacity-100" : "opacity-0"}`} />

      <div className="relative max-w-7xl mx-auto flex items-center justify-between py-5 px-4 text-[15px]">
        <img src="/engflix-logo.png" alt="logo" className="w-32" />

        <nav>
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

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <img src="/lang-icon.png" className="w-5" />
            <select className="bg-transparent text-[var(--white)] outline-none cursor-pointer">
              <option>EN</option>
              <option>UZ</option>
            </select>
          </div>

          <button className="btn py-1.5 px-5">SIGN IN</button>
        </div>
      </div>
    </div>
  );
}
