'use client';
import React, { useState, useEffect } from "react";
import {
  MapPin,
  Wifi,
  Flame,
  Coffee,
  Trees,
  Star,
  Menu,
  X,
  Calendar,
  Users,
  Mail,
  ArrowRight,
  CheckCircle,
  Wind,
  Mountain,
  Globe,
  Phone,
} from "lucide-react";

/* --- NEXT.JS INTEGRATION NOTE ---
  If using Next.js App Router (app/page.js):
  1. Add 'use client'; at the very top of the file.
  2. You can replace the <img> tags with <Image /> from 'next/image' for optimization.
*/

const translations = {
  en: {
    nav: {
      cabin: "The Cabin",
      rooms: "Rooms",
      amenities: "Amenities",
      location: "Location",
      pricing: "Pricing",
      contact: "Contact",
      book: "Book Now",
    },
    hero: {
      title_start: "Escape to the",
      title_end: "Wilderness",
      subtitle:
        "A modern rustic retreat nestled in the heart of the mountains. Experience silence, starlight, and soul-restoring comfort.",
      check_avail: "Check Availability",
      explore: "Explore the Cabin",
      img_dusk: "Exterior at Dusk",
      img_living: "Cozy Living Room",
      img_winter: "Winter View",
    },
    intro: {
      welcome: "Welcome Home",
      title: "Not just a stay, but an experience.",
      text: "Built from locally sourced timber and stone, Highland Haven was designed to blur the lines between indoors and outdoors. Whether you're curling up by the soapstone fireplace with a book, or watching the sunrise from the wrap-around deck, you'll feel completely disconnected from the rush of daily life.",
      bedrooms: "Bedrooms",
      baths: "Baths",
      forest: "Private Forest",
      testimonial:
        "The most peaceful weekend of my life. The details in this cabin are unmatched.",
      guest_name: "Sarah Jenkins, Oct 2023",
    },
    rooms: {
      title: "Space to Breathe",
      subtitle:
        "Thoughtfully designed spaces that balance rustic charm with modern luxury.",
      master: {
        title: "The Master Loft",
        desc: "King bed, en-suite soaking tub, and panoramic forest views.",
        feats: ["King Bed", "En-suite Bath", "Private Balcony"],
      },
      kitchen: {
        title: "Chef's Kitchen",
        desc: "Fully stocked with cast iron cookware, spice library, and coffee bar.",
        feats: ["Espresso Machine", "Gas Range", "Island Seating"],
      },
      greatroom: {
        title: "The Great Room",
        desc: "Vaulted ceilings, floor-to-ceiling stone fireplace, and smart entertainment.",
        feats: ["Fireplace", "Smart TV", "Board Games"],
      },
      guest: {
        title: "Guest Suite",
        desc: "Queen bed with cozy textiles and direct deck access.",
        feats: ["Queen Bed", "Work Desk", "Forest View"],
      },
      bath: {
        title: "Spa Bathroom",
        desc: "Rainfall shower, heated floors, and organic toiletries.",
        feats: ["Heated Floors", "Soaking Tub", "Towels Provided"],
      },
      outdoor: {
        title: "Outdoor Living",
        desc: "Wrap-around deck with hot tub, fire pit, and BBQ grill.",
        feats: ["Hot Tub", "Fire Pit", "Gas Grill"],
      },
    },
    amenities: {
      title: "Amenities",
      subtitle: "Everything you need for a perfect stay.",
      view_guide: "View full guide",
      wifi: { title: "Starlink Wifi", desc: "Fast reliable internet" },
      fire: { title: "Wood Fireplace", desc: "Firewood provided" },
      ac: { title: "Central AC/Heat", desc: "Climate controlled" },
      coffee: { title: "Coffee Bar", desc: "Bean grinder & pour-over" },
      ev: { title: "EV Charger", desc: "Level 2 Universal" },
      family: { title: "Family Friendly", desc: "Crib & high chair" },
      hike: { title: "Hiking Trails", desc: "Direct trail access" },
      checkin: { title: "Self Check-in", desc: "Smart lock entry" },
    },
    location: {
      label: "Location",
      title: "Lost in the Right Direction",
      desc: "Located just 15 minutes from the charming town of Stowe, yet completely secluded at the end of a private road.",
      dining: "Main St. Dining",
      ski: "Ski Resort Base",
      lake: "Lake Access",
      airport: "Airport",
      directions: "Get Directions",
      min_drive: "min drive",
    },
    pricing: {
      title: "Simple Pricing",
      subtitle: "No hidden resort fees. What you see is what you pay.",
      night: "/ night",
      week: "/ week",
      tiers: [
        {
          title: "Weeknight Escape",
          features: [
            "Sun - Thu Check-in",
            "2 Night Minimum",
            "Full Amenities Access",
          ],
        },
        {
          title: "Weekend Retreat",
          features: [
            "Fri - Sat Check-in",
            "2 Night Minimum",
            "Late Sunday Checkout",
          ],
        },
        {
          title: "Weekly Stay",
          features: [
            "7 Nights (15% off)",
            "Complimentary Welcome Basket",
            "Mid-stay Cleaning",
          ],
        },
      ],
    },
    contact: {
      title: "Request Booking",
      tabs: { phone: "Call Us", email: "Email Form" },
      phone_info: {
        title: "Speak to a Host",
        subtitle:
          "For the fastest response and best rates, give us a call directly.",
        available: "Available daily 9AM - 8PM",
        button: "Call +1 (555) 123-4567",
      },
      checkin: "Check-in",
      checkout: "Check-out",
      guests: "Guests",
      guests_opts: ["2 Guests", "4 Guests", "6 Guests", "8 Guests (Max)"],
      email: "Email Address",
      message: "Message (Optional)",
      message_ph: "Tell us about your trip...",
      send: "Send Request",
      no_charge: "You won't be charged yet.",
    },
    footer: {
      nav_title: "Navigation",
      contact_title: "Contact",
      slogan:
        "Disconnect from the world and reconnect with yourself. The mountains are calling.",
      rights: "All rights reserved.",
    },
  },
  ro: {
    nav: {
      cabin: "Cabana",
      rooms: "Camere",
      amenities: "Facilități",
      location: "Locație",
      pricing: "Prețuri",
      contact: "Contact",
      book: "Rezervă Acum",
    },
    hero: {
      title_start: "Evadează în",
      title_end: "Sălbăticie",
      subtitle:
        "Un refugiu rustic modern în inima munților. Experimentează liniștea, lumina stelelor și confortul care îți vindecă sufletul.",
      check_avail: "Verifică Disponibilitate",
      explore: "Explorează Cabana",
      img_dusk: "Exterior la Apus",
      img_living: "Living Primitor",
      img_winter: "Peisaj de Iarnă",
    },
    intro: {
      welcome: "Bine ați Venit",
      title: "Nu doar o cazare, ci o experiență.",
      text: "Construită din lemn și piatră locală, Highland Haven a fost creată pentru a estompa granițele dintre interior și exterior. Fie că te relaxezi lângă șemineul de piatră cu o carte, fie că privești răsăritul de pe terasă, te vei simți complet deconectat de agitația zilnică.",
      bedrooms: "Dormitoare",
      baths: "Băi",
      forest: "Pădure Privată",
      testimonial:
        "Cel mai liniștit weekend din viața mea. Detaliile din această cabană sunt de neegalat.",
      guest_name: "Sarah Jenkins, Oct 2023",
    },
    rooms: {
      title: "Spațiu de Respirat",
      subtitle:
        "Spații gândite cu grijă care echilibrează farmecul rustic cu luxul modern.",
      master: {
        title: "Loft Principal",
        desc: "Pat King, cadă în cameră și vedere panoramică la pădure.",
        feats: ["Pat King", "Baie En-suite", "Balcon Privat"],
      },
      kitchen: {
        title: "Bucătărie de Chef",
        desc: "Complet echipată cu vase de fontă, bibliotecă de condimente și bar de cafea.",
        feats: ["Espressor", "Aragaz Gaz", "Insulă"],
      },
      greatroom: {
        title: "Living Room",
        desc: "Tavane înalte, șemineu monumental din piatră și divertisment smart.",
        feats: ["Șemineu", "Smart TV", "Jocuri de Societate"],
      },
      guest: {
        title: "Suită Oaspeți",
        desc: "Pat Queen cu textile confortabile și acces direct la terasă.",
        feats: ["Pat Queen", "Birou", "Vedere Pădure"],
      },
      bath: {
        title: "Baie Spa",
        desc: "Duș tip ploaie, încălzire în pardoseală și cosmetice organice.",
        feats: ["Încălzire Pardoseală", "Cadă", "Prosoape Incluse"],
      },
      outdoor: {
        title: "Spațiu Exterior",
        desc: "Terasă panoramică cu jacuzzi, vatră de foc și grătar.",
        feats: ["Jacuzzi", "Vatră Foc", "Grătar Gaz"],
      },
    },
    amenities: {
      title: "Facilități",
      subtitle: "Tot ce ai nevoie pentru un sejur perfect.",
      view_guide: "Vezi ghidul complet",
      wifi: { title: "Wifi Starlink", desc: "Internet rapid și fiabil" },
      fire: { title: "Șemineu Lemne", desc: "Lemne incluse" },
      ac: { title: "AC/Încălzire", desc: "Climatizare controlată" },
      coffee: { title: "Bar de Cafea", desc: "Râșniță & pour-over" },
      ev: { title: "Încărcător EV", desc: "Level 2 Universal" },
      family: { title: "Family Friendly", desc: "Pătuț & scaun masă" },
      hike: { title: "Trasee Drumeție", desc: "Acces direct la trasee" },
      checkin: { title: "Self Check-in", desc: "Intrare cu cod smart" },
    },
    location: {
      label: "Locație",
      title: "Pierdut în Direcția Bună",
      desc: "Situat la doar 15 minute de fermecătorul oraș Stowe, dar complet izolat la capătul unui drum privat.",
      dining: "Restaurante Centru",
      ski: "Baza Pârtiei Ski",
      lake: "Acces Lac",
      airport: "Aeroport",
      directions: "Obține Indicații",
      min_drive: "min condus",
    },
    pricing: {
      title: "Prețuri Simple",
      subtitle: "Fără taxe ascunse. Prețul afișat este prețul final.",
      night: "/ noapte",
      week: "/ săptămână",
      tiers: [
        {
          title: "Evadare în Timpul Săptămânii",
          features: [
            "Check-in Dum - Joi",
            "Minim 2 Nopți",
            "Acces Complet Facilități",
          ],
        },
        {
          title: "Refugiu de Weekend",
          features: [
            "Check-in Vin - Sâm",
            "Minim 2 Nopți",
            "Checkout Târziu Duminică",
          ],
        },
        {
          title: "Sejur Săptămânal",
          features: [
            "7 Nopți (15% reducere)",
            "Coș Bun Venit Gratuit",
            "Curățenie la Mijlocul Sejurului",
          ],
        },
      ],
    },
    contact: {
      title: "Solicită Rezervare",
      tabs: { phone: "Sună-ne", email: "Formular Email" },
      phone_info: {
        title: "Vorbește cu o Gazdă",
        subtitle:
          "Pentru cel mai rapid răspuns și cele mai bune tarife, sună-ne direct.",
        available: "Disponibil zilnic 09:00 - 20:00",
        button: "Sună +1 (555) 123-4567",
      },
      checkin: "Check-in",
      checkout: "Check-out",
      guests: "Oaspeți",
      guests_opts: ["2 Oaspeți", "4 Oaspeți", "6 Oaspeți", "8 Oaspeți (Max)"],
      email: "Adresă Email",
      message: "Mesaj (Opțional)",
      message_ph: "Spune-ne despre călătoria ta...",
      send: "Trimite Solicitarea",
      no_charge: "Nu vei fi taxat încă.",
    },
    footer: {
      nav_title: "Navigare",
      contact_title: "Contact",
      slogan:
        "Deconectează-te de lume și reconectează-te cu tine însuți. Munții te cheamă.",
      rights: "Toate drepturile rezervate.",
    },
  },
};

const CabinShowcase = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [language, setLanguage] = useState("ro");
  const [contactTab, setContactTab] = useState("phone");

  const t = translations[language];

  // Scroll handler for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ro" : "en"));
  };

  const galleryImages = [
    {
      url: "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?q=80&w=2067&auto=format&fit=crop",
      title: t.hero.img_dusk,
    },
    {
      url: "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?q=80&w=2070&auto=format&fit=crop",
      title: t.hero.img_living,
    },
    {
      url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2072&auto=format&fit=crop",
      title: t.hero.img_winter,
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-amber-200">
      {/* --- Navigation --- */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
            <Trees className={scrolled ? "text-amber-700" : "text-white"} />
            <span className={scrolled ? "text-stone-900" : "text-white"}>
              HIGHLAND<span className="font-light">HAVEN</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div
            className={`hidden md:flex items-center gap-8 font-medium ${
              scrolled ? "text-stone-600" : "text-stone-200"
            }`}
          >
            {[
              { id: "the-cabin", label: t.nav.cabin },
              { id: "rooms", label: t.nav.rooms },
              { id: "amenities", label: t.nav.amenities },
              { id: "location", label: t.nav.location },
              { id: "pricing", label: t.nav.pricing },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="hover:text-amber-600 transition-colors"
              >
                {item.label}
              </button>
            ))}

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1 font-bold transition-colors ${
                scrolled
                  ? "text-stone-800 hover:text-amber-600"
                  : "text-white hover:text-amber-300"
              }`}
            >
              <Globe size={18} />
              <span>{language.toUpperCase()}</span>
            </button>
          </div>

          <button
            onClick={() => scrollToSection("contact")}
            className={`hidden md:block px-6 py-2 rounded-full font-semibold transition-all ${
              scrolled
                ? "bg-amber-700 text-white hover:bg-amber-800"
                : "bg-white text-stone-900 hover:bg-amber-100"
            }`}
          >
            {t.nav.book}
          </button>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Mobile Language Switcher */}
            <button
              onClick={toggleLanguage}
              className={`flex items-center gap-1 font-bold z-50 ${
                scrolled ? "text-stone-900" : "text-white"
              }`}
            >
              <Globe size={18} />
              <span>{language.toUpperCase()}</span>
            </button>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="z-50">
              {isMenuOpen ? (
                <X className="text-stone-900" />
              ) : (
                <Menu className={scrolled ? "text-stone-900" : "text-white"} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-8 text-xl z-40">
            {[
              { id: "the-cabin", label: t.nav.cabin },
              { id: "rooms", label: t.nav.rooms },
              { id: "amenities", label: t.nav.amenities },
              { id: "location", label: t.nav.location },
              { id: "pricing", label: t.nav.pricing },
              { id: "contact", label: t.nav.contact },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-stone-800 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* --- Hero Section --- */}
      <header
        id="the-cabin"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image Slider Effect */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={galleryImages[activeImage].url}
            alt="Cabin Hero"
            className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          />
        </div>

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-16">
          <div className="mb-4 flex justify-center gap-2">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  activeImage === idx ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
                aria-label={`View image ${idx + 1}`}
              />
            ))}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            {t.hero.title_start} <br />{" "}
            <span className="text-amber-200">{t.hero.title_end}</span>
          </h1>
          <p className="text-lg md:text-2xl text-stone-200 mb-10 font-light max-w-2xl mx-auto">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("pricing")}
              className="px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold text-lg transition-all flex items-center justify-center gap-2"
            >
              {t.hero.check_avail} <Calendar size={20} />
            </button>
            <button
              onClick={() => scrollToSection("rooms")}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white rounded-lg font-semibold text-lg transition-all"
            >
              {t.hero.explore}
            </button>
          </div>
        </div>
      </header>

      {/* --- Intro / About --- */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 space-y-6">
              <span className="text-amber-600 font-bold tracking-widest uppercase text-sm">
                {t.intro.welcome}
              </span>
              <h2 className="text-4xl font-bold text-stone-900">
                {t.intro.title}
              </h2>
              <p className="text-stone-600 text-lg leading-relaxed">
                {t.intro.text}
              </p>
              <div className="flex gap-8 pt-4">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-stone-900">4</span>
                  <span className="text-stone-500">{t.intro.bedrooms}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-stone-900">3.5</span>
                  <span className="text-stone-500">{t.intro.baths}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-stone-900">6ac</span>
                  <span className="text-stone-500">{t.intro.forest}</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-100 rounded-full -z-10" />
              <img
                src="https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=2070&auto=format&fit=crop"
                alt="Cabin Interior Detail"
                className="rounded-2xl shadow-xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg max-w-xs hidden md:block">
                <div className="flex gap-1 text-amber-500 mb-2">
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                  <Star fill="currentColor" size={16} />
                </div>
                <p className="text-stone-700 italic text-sm">
                  "{t.intro.testimonial}"
                </p>
                <p className="text-stone-400 text-xs mt-2 font-bold uppercase">
                  - {t.intro.guest_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Rooms Showcase --- */}
      <section id="rooms" className="py-24 px-6 bg-stone-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.rooms.title}
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              {t.rooms.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <RoomCard
              title={t.rooms.master.title}
              desc={t.rooms.master.desc}
              img="https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?q=80&w=2150&auto=format&fit=crop"
              features={t.rooms.master.feats}
            />
            <RoomCard
              title={t.rooms.kitchen.title}
              desc={t.rooms.kitchen.desc}
              img="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop"
              features={t.rooms.kitchen.feats}
            />
            <RoomCard
              title={t.rooms.greatroom.title}
              desc={t.rooms.greatroom.desc}
              img="https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=2070&auto=format&fit=crop"
              features={t.rooms.greatroom.feats}
            />
            <RoomCard
              title={t.rooms.guest.title}
              desc={t.rooms.guest.desc}
              img="https://images.unsplash.com/photo-1560185007-cde436f6a4d0?q=80&w=2070&auto=format&fit=crop"
              features={t.rooms.guest.feats}
            />
            <RoomCard
              title={t.rooms.bath.title}
              desc={t.rooms.bath.desc}
              img="https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=2069&auto=format&fit=crop"
              features={t.rooms.bath.feats}
            />
            <RoomCard
              title={t.rooms.outdoor.title}
              desc={t.rooms.outdoor.desc}
              img="https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=2125&auto=format&fit=crop"
              features={t.rooms.outdoor.feats}
            />
          </div>
        </div>
      </section>

      {/* --- Amenities Grid --- */}
      <section
        id="amenities"
        className="py-24 px-6 bg-stone-900 text-stone-300"
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-stone-800 pb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {t.amenities.title}
              </h2>
              <p>{t.amenities.subtitle}</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors mt-4 md:mt-0">
              {t.amenities.view_guide} <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
            <Amenity
              icon={<Wifi size={32} />}
              title={t.amenities.wifi.title}
              desc={t.amenities.wifi.desc}
            />
            <Amenity
              icon={<Flame size={32} />}
              title={t.amenities.fire.title}
              desc={t.amenities.fire.desc}
            />
            <Amenity
              icon={<Wind size={32} />}
              title={t.amenities.ac.title}
              desc={t.amenities.ac.desc}
            />
            <Amenity
              icon={<Coffee size={32} />}
              title={t.amenities.coffee.title}
              desc={t.amenities.coffee.desc}
            />
            <Amenity
              icon={<MapPin size={32} />}
              title={t.amenities.ev.title}
              desc={t.amenities.ev.desc}
            />
            <Amenity
              icon={<Users size={32} />}
              title={t.amenities.family.title}
              desc={t.amenities.family.desc}
            />
            <Amenity
              icon={<Mountain size={32} />}
              title={t.amenities.hike.title}
              desc={t.amenities.hike.desc}
            />
            <Amenity
              icon={<CheckCircle size={32} />}
              title={t.amenities.checkin.title}
              desc={t.amenities.checkin.desc}
            />
          </div>
        </div>
      </section>

      {/* --- Location --- */}
      <section
        id="location"
        className="py-0 relative h-[600px] bg-stone-200 flex items-center justify-center"
      >
        {/* Placeholder for Map - In production use Google Maps or Mapbox */}
        <div className="absolute inset-0 bg-stone-300">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop"
            className="w-full h-full object-cover opacity-50 grayscale"
            alt="Map Background"
          />
        </div>

        <div className="relative z-10 bg-white p-8 md:p-12 shadow-2xl rounded-xl max-w-lg mx-4">
          <div className="flex items-center gap-2 text-amber-600 mb-4 font-bold uppercase text-sm tracking-wider">
            <MapPin size={16} /> {t.location.label}
          </div>
          <h3 className="text-3xl font-bold mb-4 text-stone-900">
            {t.location.title}
          </h3>
          <p className="text-stone-600 mb-6">{t.location.desc}</p>
          <ul className="space-y-3 text-stone-700 mb-8">
            <li className="flex justify-between border-b border-stone-100 pb-2">
              <span>{t.location.dining}</span>{" "}
              <span>15 {t.location.min_drive}</span>
            </li>
            <li className="flex justify-between border-b border-stone-100 pb-2">
              <span>{t.location.ski}</span>{" "}
              <span>20 {t.location.min_drive}</span>
            </li>
            <li className="flex justify-between border-b border-stone-100 pb-2">
              <span>{t.location.lake}</span>{" "}
              <span>10 {t.location.min_drive}</span>
            </li>
            <li className="flex justify-between border-b border-stone-100 pb-2">
              <span>{t.location.airport}</span>{" "}
              <span>45 {t.location.min_drive}</span>
            </li>
          </ul>
          <button className="w-full py-3 border-2 border-stone-900 text-stone-900 font-bold hover:bg-stone-900 hover:text-white transition-colors rounded">
            {t.location.directions}
          </button>
        </div>
      </section>

      {/* --- Pricing & Contact --- */}
      <section id="pricing" className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Pricing Card */}
            <div>
              <h2 className="text-4xl font-bold mb-6">{t.pricing.title}</h2>
              <p className="text-stone-600 mb-8">{t.pricing.subtitle}</p>

              <div className="space-y-6">
                <PricingTier
                  title={t.pricing.tiers[0].title}
                  price="$250"
                  unit={t.pricing.night}
                  features={t.pricing.tiers[0].features}
                  active={false}
                />
                <PricingTier
                  title={t.pricing.tiers[1].title}
                  price="$350"
                  unit={t.pricing.night}
                  features={t.pricing.tiers[1].features}
                  active={true}
                />
                <PricingTier
                  title={t.pricing.tiers[2].title}
                  price="$1,500"
                  unit={t.pricing.week}
                  features={t.pricing.tiers[2].features}
                  active={false}
                />
              </div>
            </div>

            {/* Contact Form with Tabs */}
            <div
              id="contact"
              className="bg-stone-50 p-8 md:p-10 rounded-2xl border border-stone-100 h-fit sticky top-24 shadow-sm"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Mail className="text-amber-600" /> {t.contact.title}
              </h3>

              {/* Tab Switcher */}
              <div className="flex border-b border-stone-200 mb-8">
                <button
                  onClick={() => setContactTab("phone")}
                  className={`flex-1 pb-4 font-semibold text-center transition-all ${
                    contactTab === "phone"
                      ? "text-amber-600 border-b-2 border-amber-600"
                      : "text-stone-400 hover:text-stone-600"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Phone size={18} /> {t.contact.tabs.phone}
                  </span>
                </button>
                <button
                  onClick={() => setContactTab("email")}
                  className={`flex-1 pb-4 font-semibold text-center transition-all ${
                    contactTab === "email"
                      ? "text-amber-600 border-b-2 border-amber-600"
                      : "text-stone-400 hover:text-stone-600"
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Mail size={18} /> {t.contact.tabs.email}
                  </span>
                </button>
              </div>

              {/* Phone Content */}
              {contactTab === "phone" && (
                <div className="text-center py-6 animate-fadeIn">
                  <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Phone size={36} />
                  </div>
                  <h4 className="text-xl font-bold text-stone-900 mb-2">
                    {t.contact.phone_info.title}
                  </h4>
                  <p className="text-stone-600 mb-8 max-w-sm mx-auto">
                    {t.contact.phone_info.subtitle}
                  </p>

                  <a
                    href="tel:+15551234567"
                    className="block w-full py-4 bg-amber-600 text-white font-bold rounded-lg hover:bg-amber-700 transition-all shadow-lg shadow-amber-600/20 mb-4"
                  >
                    {t.contact.phone_info.button}
                  </a>

                  <div className="flex items-center justify-center gap-2 text-sm text-stone-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    {t.contact.phone_info.available}
                  </div>
                </div>
              )}

              {/* Email Form Content */}
              {contactTab === "email" && (
                <form
                  className="space-y-4 animate-fadeIn"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-stone-700">
                        {t.contact.checkin}
                      </label>
                      <input
                        type="date"
                        className="w-full p-3 rounded-lg border border-stone-200 bg-white focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-stone-700">
                        {t.contact.checkout}
                      </label>
                      <input
                        type="date"
                        className="w-full p-3 rounded-lg border border-stone-200 bg-white focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-stone-700">
                      {t.contact.guests}
                    </label>
                    <select className="w-full p-3 rounded-lg border border-stone-200 bg-white focus:ring-2 focus:ring-amber-500 outline-none">
                      {t.contact.guests_opts.map((opt, i) => (
                        <option key={i}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-stone-700">
                      {t.contact.email}
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="w-full p-3 rounded-lg border border-stone-200 bg-white focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-stone-700">
                      {t.contact.message}
                    </label>
                    <textarea
                      rows="3"
                      placeholder={t.contact.message_ph}
                      className="w-full p-3 rounded-lg border border-stone-200 bg-white focus:ring-2 focus:ring-amber-500 outline-none"
                    ></textarea>
                  </div>

                  <button className="w-full py-4 bg-stone-900 text-white font-bold rounded-lg hover:bg-stone-800 transition-all shadow-lg mt-4">
                    {t.contact.send}
                  </button>
                  <p className="text-center text-xs text-stone-400 mt-4">
                    {t.contact.no_charge}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-stone-900 text-stone-400 py-16 px-6">
        <div className="container mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold tracking-tighter flex items-center gap-2 text-white mb-4">
              <Trees />
              <span>
                HIGHLAND<span className="font-light">HAVEN</span>
              </span>
            </div>
            <p className="max-w-xs mb-6">{t.footer.slogan}</p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors cursor-pointer">
                IG
              </div>
              <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors cursor-pointer">
                FB
              </div>
              <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-amber-600 hover:text-white transition-colors cursor-pointer">
                TW
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">{t.footer.nav_title}</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection("the-cabin")}
                  className="hover:text-amber-500 transition-colors"
                >
                  {t.nav.cabin}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("rooms")}
                  className="hover:text-amber-500 transition-colors"
                >
                  {t.nav.rooms}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("amenities")}
                  className="hover:text-amber-500 transition-colors"
                >
                  {t.nav.amenities}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="hover:text-amber-500 transition-colors"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">
              {t.footer.contact_title}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3 items-center">
                <MapPin size={16} /> 123 Forest Line, Stowe VT
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={16} /> stay@highlandhaven.com
              </li>
              <li className="flex gap-3 items-center">
                <Users size={16} /> +1 (555) 123-4567
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto border-t border-stone-800 mt-12 pt-8 text-sm text-center">
          &copy; {new Date().getFullYear()} Highland Haven Cabin.{" "}
          {t.footer.rights} Built with Next.js & Tailwind.
        </div>
      </footer>
    </div>
  );
};

// --- Sub-components ---

const RoomCard = ({ title, desc, img, features }) => (
  <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
    <div className="relative h-64 overflow-hidden">
      <img
        src={img}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <span className="text-white font-semibold">View Details</span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-stone-900 mb-2">{title}</h3>
      <p className="text-stone-600 mb-4 text-sm leading-relaxed">{desc}</p>
      <div className="flex flex-wrap gap-2">
        {features.map((feat, idx) => (
          <span
            key={idx}
            className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded border border-stone-200"
          >
            {feat}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const Amenity = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center space-y-3 group cursor-default">
    <div className="p-4 bg-stone-800 rounded-full text-amber-500 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 transform group-hover:-translate-y-1">
      {icon}
    </div>
    <div>
      <h4 className="font-bold text-white">{title}</h4>
      <p className="text-sm text-stone-500 group-hover:text-stone-400">
        {desc}
      </p>
    </div>
  </div>
);

const PricingTier = ({ title, price, unit, features, active }) => (
  <div
    className={`p-6 rounded-xl border transition-all duration-300 ${
      active
        ? "border-amber-500 bg-amber-50/50 shadow-md ring-1 ring-amber-500"
        : "border-stone-200 bg-white hover:border-amber-200"
    }`}
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="font-bold text-lg text-stone-900">{title}</h3>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-3xl font-bold text-amber-600">{price}</span>
          <span className="text-stone-500 text-sm font-medium">{unit}</span>
        </div>
      </div>
      {active && (
        <span className="bg-amber-600 text-white text-xs px-2 py-1 rounded font-bold uppercase tracking-wider">
          Popular
        </span>
      )}
    </div>
    <ul className="space-y-3">
      {features.map((feature, i) => (
        <li key={i} className="flex gap-3 text-sm text-stone-700">
          <CheckCircle size={18} className="text-amber-500 flex-shrink-0" />
          {feature}
        </li>
      ))}
    </ul>
  </div>
);

export default CabinShowcase;
