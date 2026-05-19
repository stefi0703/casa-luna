// app/HomeClient.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { translations } from "./data/content";
import { Provider } from "../components/ui/provider";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import { Gallery } from "./components/Gallery";
import {
  Intro,
  Rooms,
  Amenities,
  Location,
  BookingTerms,
} from "./components/Details";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

export default function HomeClient() {
  const [language, setLanguage] = useState("ro");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        scrollToSection(hash);
      }, 500);
    }
  }, []);

  const t = translations[language];

  const {
    open: isGalleryOpen,
    onOpen: onOpenGallery,
    onClose: onCloseGallery,
  } = useDisclosure();

  const toggleLanguage = () => {
    const newLang = language === "en" ? "ro" : "en";
    setLanguage(newLang);
    localStorage.setItem("preferredLanguage", newLang);
  };

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
          onOpenGallery={onOpenGallery}
        />

        <Hero t={t} scrollToSection={scrollToSection} />
        <Intro t={t} />
        <Rooms t={t} />
        <Gallery t={t} isOpen={isGalleryOpen} onClose={onCloseGallery} />
        <Amenities t={t} />
        <Location t={t} />
        <BookingTerms t={t} />
        <Booking t={t} />
        <Footer t={t} />
      </div>
    </Provider>
  );
}