"use client";

import React, { useState } from "react";
import FacilitiesDetailed from "../components/FacilitiesDetailed";
import { translations } from "../data/content";
import { Provider } from "../../components/ui/provider";

export default function FacilitiesPage() {
  const [language] = useState("ro");
  const t = translations[language];

  return (
    <Provider>
      <FacilitiesDetailed t={t} />
    </Provider>
  );
}
