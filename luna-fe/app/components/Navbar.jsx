"use client";
import React, { useState, useEffect } from "react";
import { Trees, Globe, Menu, X } from "lucide-react";

export default function Navbar({
  t,
  language,
  toggleLanguage,
  scrollToSection,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNav = (id) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  const navLinks = [
    { id: "rooms", label: t.nav.rooms },
    { id: "amenities", label: t.nav.amenities },
    { id: "location", label: t.nav.location },
    { id: "pricing", label: t.nav.pricing },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || isMenuOpen
          ? "bg-white/95 backdrop-blur-md shadow-sm py-3 md:py-4"
          : "bg-transparent py-4 md:py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center relative z-[70]">
        {/* Logo */}
        <div
          className="text-xl md:text-2xl font-bold flex items-center gap-2 cursor-pointer"
          onClick={() => handleNav("hero")}
        >
          <Trees
            className={scrolled || isMenuOpen ? "text-amber-700" : "text-white"}
          />
          <span
            className={scrolled || isMenuOpen ? "text-stone-900" : "text-white"}
          >
            CASA<span className="font-light">LUNA</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div
          className={`hidden md:flex items-center gap-8 font-medium ${
            scrolled ? "text-stone-600" : "text-stone-200"
          }`}
        >
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="hover:text-amber-600 transition-colors"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 font-bold hover:text-amber-500"
          >
            <Globe size={18} /> {language.toUpperCase()}
          </button>
        </div>

        {/* Action Button (Desktop) */}
        <button
          onClick={() => handleNav("contact")}
          className={`hidden md:block px-6 py-2 rounded-full font-semibold transition-all ${
            scrolled ? "bg-amber-700 text-white" : "bg-white text-stone-900"
          }`}
        >
          {t.nav.book}
        </button>

        {/* Mobile Toggle Buttons */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className={`font-bold flex items-center gap-1 ${
              scrolled || isMenuOpen ? "text-stone-900" : "text-white"
            }`}
          >
            <Globe size={18} /> {language.toUpperCase()}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={scrolled || isMenuOpen ? "text-stone-900" : "text-white"}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay - FIXED Styles */}
      <div
        className={`fixed inset-0 h-screen w-screen bg-white z-[60] flex flex-col items-center justify-start pt-32 gap-8 text-2xl transition-transform duration-300 overscroll-none ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navLinks.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNav(item.id)}
            className="text-stone-800 font-medium hover:text-amber-600 w-full py-2 border-b border-stone-100"
          >
            {item.label}
          </button>
        ))}

        {/* Mobile "Book Now" Button */}
        <button
          onClick={() => handleNav("contact")}
          className="bg-amber-600 text-white px-10 py-4 rounded-full font-bold mt-4 shadow-xl active:scale-95 transition-transform"
        >
          {t.nav.book}
        </button>
      </div>
    </nav>
  );
}
