// app/page.js
import HomeClient from "./HomeClient";

export const metadata = {
  title: 'Pensiune Casa Luna Rucăr | Cazare Culoarul Rucăr-Bran',
  description: 'Cauți cazare pe culoarul Rucăr-Bran sau o pensiune modernă lângă Câmpulung Muscel? Casa Luna Rucăr oferă închiriere integrală pentru grupuri, 6 dormitoare moderne, living de poveste și foișor încălzit cu grătar profesional.',
  keywords: 'cazare culoarul rucar bran, cazare campulung, pensiune rucar bran campulung, casa luna rucar, inchiriere integrala rucar, cazare arges, cazare munte grupuri, pensiuni rucar',
  
  openGraph: {
    title: 'Pensiune Casa Luna Rucăr | Cazare Culoarul Rucăr-Bran',
    description: 'Pensiune inedită de închiriat integral la munte, ideală pentru familii și grupuri pe culoarul Rucăr-Bran.',
    url: 'https://www.casalunarucar.ro', 
    siteName: 'Casa Luna Rucăr',
    locale: 'ro_RO',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dnnpsia65/image/upload/c_fill,g_auto,w_1200,h_630,f_auto,q_auto/intro',
        width: 1200,
        height: 630,
        alt: 'Pensiunea Casa Luna Rucăr - Culoarul Rucăr Bran',
      },
    ],
  },
};

export default function Page() {
  // Datele structurate pe care Google le adoră
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VacationHome",
    "name": "Pensiunea Casa Luna Rucăr",
    "image": "https://res.cloudinary.com/dnnpsia65/image/upload/c_fill,g_auto,w_1000,h_700,f_auto,q_auto/intro",
    "description": "Pensiune modernă de poveste pe culoarul Rucăr-Bran, aproape de Câmpulung Muscel. Închiriere integrală pentru grupuri, 6 dormitoare, living de basm și foișor închis.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "S.da Poarta Câmpului",
      "addressLocality": "Rucăr",
      "addressRegion": "Argeș",
      "postalCode": "117630",
      "addressCountry": "RO"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "45.396030", // Sfat: Poți pune coordonatele tale exacte din Maps ulterior
      "longitude": "25.178094"
    },
    "telephone": "+40750849137",
    "priceRange": "1600 RON - 1800 RON",
    "numberOfRooms": "6"
  };

  return (
    <>
      {/* Scriptul injectat în mod nativ și securizat */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}