"use client";
import React, { useState } from "react";
import { Mail, Phone, CheckCircle } from "lucide-react";

export default function Booking({ t }) {
  const [tab, setTab] = useState("phone");

  return (
    <section id="pricing" className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-6xl grid lg:grid-cols-2 gap-16">
        {/* Pricing Column */}
        <div>
          <h2 className="text-4xl font-bold mb-6">{t.pricing.title}</h2>
          <p className="text-stone-600 mb-8">{t.pricing.subtitle}</p>
          <div className="space-y-6">
            {t.pricing.tiers.map((tier, i) => (
              <div
                key={i}
                className={`p-6 rounded-xl border ${
                  i === 1
                    ? "border-amber-500 bg-amber-50/50"
                    : "border-stone-200"
                }`}
              >
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold text-lg">{tier.title}</h3>
                  {i === 1 && (
                    <span className="text-xs bg-amber-600 text-white px-2 py-1 rounded uppercase">
                      Popular
                    </span>
                  )}
                </div>
                <div className="text-3xl font-bold text-amber-600 mb-4">
                  {tier.price}{" "}
                  <span className="text-sm text-stone-500 font-normal">
                    {i === 2 ? t.pricing.week : t.pricing.night}
                  </span>
                </div>
                <ul className="space-y-2">
                  {tier.features.map((f, idx) => (
                    <li key={idx} className="flex gap-2 text-sm">
                      <CheckCircle size={16} className="text-amber-500" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact/Form Column */}
        <div
          id="contact"
          className="bg-stone-50 p-8 rounded-2xl border border-stone-100 h-fit sticky top-24"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Mail className="text-amber-600" /> {t.contact.title}
          </h3>

          <div className="flex border-b mb-6">
            {["phone", "email"].map((mode) => (
              <button
                key={mode}
                onClick={() => setTab(mode)}
                className={`flex-1 pb-3 font-semibold capitalize ${
                  tab === mode
                    ? "text-amber-600 border-b-2 border-amber-600"
                    : "text-stone-400"
                }`}
              >
                {t.contact.tabs[mode]}
              </button>
            ))}
          </div>

          {tab === "phone" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone size={32} />
              </div>
              <h4 className="font-bold text-xl mb-2">
                {t.contact.phone_info.title}
              </h4>
              <a
                href="tel:+15551234567"
                className="block w-full py-3 bg-amber-600 text-white font-bold rounded-lg my-6 hover:bg-amber-700"
              >
                {t.contact.phone_info.button}
              </a>
              <p className="text-sm text-stone-500">
                {t.contact.phone_info.avail}
              </p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <input type="date" className="p-3 rounded border w-full" />
                <input type="date" className="p-3 rounded border w-full" />
              </div>
              <input
                type="email"
                placeholder={t.contact.email_form.email}
                className="p-3 rounded border w-full"
              />
              <textarea
                placeholder={t.contact.email_form.msg}
                rows="3"
                className="p-3 rounded border w-full"
              ></textarea>
              <button className="w-full py-3 bg-stone-900 text-white font-bold rounded-lg">
                {t.contact.email_form.send}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
