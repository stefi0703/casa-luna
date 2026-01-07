"use client";

import React, { useState, useEffect } from "react"; // Adăugat useEffect
import FacilitiesDetailed from "../components/FacilitiesDetailed";
import { translations } from "../data/content";
import { Provider } from "../../components/ui/provider";

export default function FacilitiesPage() {
  const [language, setLanguage] = useState("ro");

  // Sincronizare limbă cu restul site-ului
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = translations[language];

  // Salvare preferință la schimbare
  const toggleLanguage = () => {
    const newLang = language === "en" ? "ro" : "en";
    setLanguage(newLang);
    localStorage.setItem("preferredLanguage", newLang);
  };

  return (
    <Provider>
      <FacilitiesDetailed 
        t={t} 
        language={language} 
        toggleLanguage={toggleLanguage} 
      />
    </Provider>
  );
}