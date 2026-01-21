import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Movies from "./components/Movies";
import Footer from "./components/Footer";

export default function page() {
  return (
    <div>
      <Header />
      <Hero />
      <Movies />
      <Footer />
    </div>
  );
}
