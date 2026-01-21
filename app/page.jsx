import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Movies from "./components/Movies";

export default function page() {
  return (
    <div>
      <Header />
      <Hero />
      <Movies />
    </div>
  );
}
