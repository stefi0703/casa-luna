"use client";
import React from "react";
import {
  Star,
  Wifi,
  Flame,
  Wind,
  Coffee,
  Zap,
  Baby,
  Mountain,
  Key,
  ArrowRight,
  MapPin,
} from "lucide-react";

// Helper for Icons
const icons = [Wifi, Flame, Wind, Coffee, Zap, Baby, Mountain, Key];

export const Intro = ({ t }) => (
  <section className="py-24 px-6 bg-white">
    <div className="container mx-auto max-w-5xl flex flex-col md:flex-row gap-12 items-center">
      <div className="md:w-1/2 space-y-6">
        <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">
          {t.intro.welcome}
        </span>
        <h2 className="text-4xl font-bold text-stone-900">{t.intro.title}</h2>
        <p className="text-stone-600 text-lg">{t.intro.text}</p>
        <div className="flex gap-8 pt-4">
          {[
            { val: "6", lbl: t.intro.bedrooms },
            { val: "5", lbl: t.intro.baths },
            { val: "6ac", lbl: t.intro.forest },
          ].map((stat, i) => (
            <div key={i}>
              <span className="text-3xl font-bold block">{stat.val}</span>
              <span className="text-stone-500">{stat.lbl}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-1/2 relative">
        <img
          src="/details/wide.jpg"
          className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
          alt="Intro"
        />
      </div>
    </div>
  </section>
);

export const Rooms = ({ t }) => (
  <section id="rooms" className="py-24 px-6 bg-stone-100">
    <div className="container mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">{t.rooms.title}</h2>
        <p className="text-stone-600">{t.rooms.subtitle}</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {t.rooms.items.map((room, i) => (
          <div
            key={i}
            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={room.img}
                alt={room.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-semibold">View Details</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{room.title}</h3>
              <p className="text-sm text-stone-600 mb-4">{room.desc}</p>
              <div className="flex flex-wrap gap-2">
                {room.feats.map((f, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-stone-100 px-2 py-1 rounded border border-stone-200"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const Amenities = ({ t }) => (
  <section id="amenities" className="py-24 px-6 bg-stone-900 text-stone-300">
    <div className="container mx-auto">
      <div className="flex justify-between items-end mb-12 border-b border-stone-800 pb-8">
        <div>
          <h2 className="text-4xl font-bold text-white mb-2">
            {t.amenities.title}
          </h2>
          <p>{t.amenities.subtitle}</p>
        </div>
        <button className="hidden md:flex items-center gap-2 text-amber-500">
          {t.amenities.view_guide} <ArrowRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
        {t.amenities.items.map((item, i) => {
          const Icon = icons[i] || Star;
          return (
            <div
              key={i}
              className="flex flex-col items-center text-center space-y-3 group cursor-default"
            >
              <div className="p-4 bg-stone-800 rounded-full text-amber-500 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-1">
                <Icon size={32} />
              </div>
              <div>
                <h4 className="font-bold text-white">{item.title}</h4>
                <p className="text-sm text-stone-500 group-hover:text-stone-400">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export const Location = ({ t }) => (
  <section
    id="location"
    className="relative h-[500px] flex items-center justify-center bg-stone-200"
  >
    <div className="absolute inset-0 grayscale opacity-50">
      <img
        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070"
        className="w-full h-full object-cover"
        alt="Map"
      />
    </div>
    <div className="relative z-10 bg-white p-8 rounded-xl shadow-2xl max-w-lg mx-4">
      <div className="flex items-center gap-2 text-amber-600 font-bold uppercase text-sm tracking-wider mb-4">
        <MapPin size={16} /> {t.location.label}
      </div>
      <h3 className="text-3xl font-bold mb-4">{t.location.title}</h3>
      <p className="text-stone-600 mb-6">{t.location.desc}</p>
      <ul className="space-y-2 mb-6">
        {t.location.points.map((p, i) => (
          <li key={i} className="flex justify-between border-b pb-1 text-sm">
            <span>{p.name}</span> <span className="font-bold">{p.time}</span>
          </li>
        ))}
      </ul>
      <button className="w-full py-3 bg-stone-900 text-white font-bold rounded hover:bg-stone-800">
        {t.location.directions}
      </button>
    </div>
  </section>
);
