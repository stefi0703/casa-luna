"use client";
import React, { useState, useEffect } from "react"; // 1. Import useEffect
import { Calendar } from "lucide-react";
import { galleryImages } from "../data/content";

export default function Hero({ t, scrollToSection }) {
  const [activeImage, setActiveImage] = useState(0);

  // 2. Add the Auto-Scroll Logic
  useEffect(() => {
    // Set the timer (e.g., 5000ms = 5 seconds)
    const interval = setInterval(() => {
      setActiveImage((prevIndex) =>
        prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    // Cleanup: clears the timer if the component unmounts (prevents memory leaks)
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src={galleryImages[activeImage].url}
          alt="Hero"
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-16">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          {t.hero.title_start} <br />{" "}
          <span className="text-amber-200">{t.hero.title_end}</span>
        </h1>
        <p className="text-xl text-stone-200 mb-10 font-light">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => scrollToSection("pricing")}
            className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2"
          >
            {t.hero.check_avail} <Calendar size={20} />
          </button>
          <button
            onClick={() => scrollToSection("rooms")}
            className="px-8 py-4 bg-white/10 backdrop-blur border border-white/30 hover:bg-white/20 text-white rounded-lg font-semibold"
          >
            {t.hero.explore}
          </button>
        </div>

        {/* Dots */}
        <div className="mt-12 flex justify-center gap-2">
          {galleryImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(idx)} // Clicking a dot will manually override the image
              className={`h-1 rounded-full transition-all ${
                activeImage === idx ? "w-8 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
