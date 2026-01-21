import React from "react";

export default function Footer() {
  return (
    <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center mt-16 mb-5 gap-6">
      <nav>
        <ul className="flex gap-7">
          <li>
            <a href="/" className="text-[var(--white)] hover:text-[var(--lime)] transition-colors duration-300">
              Home
            </a>
          </li>
          <li className="text-[var(--second-dark)]">|</li>
          <li>
            <a href="/movies" className="text-[var(--white)] hover:text-[var(--lime)] transition-colors duration-300">
              Movies
            </a>
          </li>
          <li className="text-[var(--second-dark)]">|</li>
          <li>
            <a href="/about" className="text-[var(--white)] hover:text-[var(--lime)] transition-colors duration-300">
              About us
            </a>
          </li>
          <li className="text-[var(--second-dark)]">|</li>
          <li>
            <a href="/contact" className="text-[var(--white)] hover:text-[var(--lime)] transition-colors duration-300">
              Contact
            </a>
          </li>
        </ul>
      </nav>
      <p className="max-w-3xl text-[var(--second-dark)]">
        All films are posted for display purposes only and the copyrights belong to their respective owners. At the request of the rights holders, this content will be removed from the site.
      </p>

      <p className="text-sm text-[var(--second-dark)] text-center">&copy; {new Date().getFullYear()} All rights reserved.</p>
    </div>
  );
}
