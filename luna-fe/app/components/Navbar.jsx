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
        scrolled
          ? "bg-white/90 backdrop-blur shadow py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div
          className="text-2xl font-bold flex items-center gap-2 cursor-pointer"
          onClick={() => handleNav("hero")}
        >
          <Trees className={scrolled ? "text-amber-700" : "text-white"} />
          <span className={scrolled ? "text-stone-900" : "text-white"}>
            HIGHLAND<span className="font-light">HAVEN</span>
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

        {/* Action Button */}
        <button
          onClick={() => handleNav("contact")}
          className={`hidden md:block px-6 py-2 rounded-full font-semibold transition-all ${
            scrolled ? "bg-amber-700 text-white" : "bg-white text-stone-900"
          }`}
        >
          {t.nav.book}
        </button>

        {/* Mobile Toggle */}
        <div className="md:hidden flex gap-4 z-50">
          <button
            onClick={toggleLanguage}
            className={`font-bold ${
              scrolled ? "text-stone-900" : "text-white"
            }`}
          >
            {language.toUpperCase()}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={scrolled ? "text-stone-900" : "text-white"}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-8 text-xl z-40">
          {navLinks.map((item) => (
            <button key={item.id} onClick={() => handleNav(item.id)}>
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleNav("contact")}
            className="text-amber-600 font-bold"
          >
            {t.nav.book}
          </button>
        </div>
      )}
    </nav>
  );
}
