import React from "react";
import { Trees } from "lucide-react";

export default function Footer({ t }) {
  return (
    <footer className="bg-stone-900 text-stone-400 py-16 px-6 text-center">
      <div className="flex justify-center items-center gap-2 text-white text-2xl font-bold mb-4">
        <Trees /> HIGHLAND<span className="font-light">HAVEN</span>
      </div>
      <p className="mb-8">{t.footer.slogan}</p>
      <div className="border-t border-stone-800 pt-8 text-sm">
        &copy; {new Date().getFullYear()} Highland Haven. {t.footer.rights}
      </div>
    </footer>
  );
}
