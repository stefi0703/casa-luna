"use client";
import React, { useState } from "react";
import { translations } from "./data/content";
import { Provider } from "../components/ui/provider";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Intro, Rooms, Amenities, Location } from "./components/Details";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

export default function Home() {
  const [language, setLanguage] = useState("ro"); // Default language
  const t = translations[language];

  const toggleLanguage = () =>
    setLanguage((prev) => (prev === "en" ? "ro" : "en"));

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Provider>
      <div className="min-h-screen bg-stone-50 font-sans text-stone-900">
        <Navbar
          t={t}
          language={language}
          toggleLanguage={toggleLanguage}
          scrollToSection={scrollToSection}
        />
        <Hero t={t} scrollToSection={scrollToSection} />
        <Intro t={t} />
        <Rooms t={t} />
        <Amenities t={t} />
        <Location t={t} />
        <Booking t={t} />
        <Footer t={t} />
      </div>
    </Provider>
  );
}
