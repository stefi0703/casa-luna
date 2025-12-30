"use client";
import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react"; // Import useDisclosure
import { translations } from "./data/content";
import { Provider } from "../components/ui/provider";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Gallery } from "./components/Gallery"; // Ensure this matches your file path
import { Intro, Rooms, Amenities, Location } from "./components/Details";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

export default function Home() {
  const [language, setLanguage] = useState("ro");
  const t = translations[language];

  // 1. Manage Gallery Modal State here
  const {
    open: isGalleryOpen,
    onOpen: onOpenGallery,
    onClose: onCloseGallery,
  } = useDisclosure();

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
          onOpenGallery={onOpenGallery} // 2. Pass the trigger to Navbar
        />

        <Hero t={t} scrollToSection={scrollToSection} />
        <Intro t={t} />
        <Rooms t={t} />

        {/* 3. Render Gallery as a hidden Modal controlled by props */}
        <Gallery t={t} isOpen={isGalleryOpen} onClose={onCloseGallery} />

        <Amenities t={t} />
        <Location t={t} />
        <Booking t={t} />
        <Footer t={t} />
      </div>
    </Provider>
  );
}
