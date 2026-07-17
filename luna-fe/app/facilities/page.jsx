// app/facilities/page.jsx
import FacilitiesClient from "./FacilitiesClient";

export const metadata = {
  title: 'Facilități Casa Luna Rucăr | Cazare cu Foișor Încălzit - Culoarul Rucăr-Bran',
  description: 'Descoperă facilitățile premium de la Casa Luna Rucăr: 6 dormitoare cochete cu baie privată, living de basm, bucătărie complet utilată și foișor interior încălzit cu grătar și plită. Cazare completă lângă Câmpulung Muscel.',
  keywords: 'facilitati casa luna, pensiune cu foisor incalzit rucar, cazare cu parcare mare campulung, pensiune gratar foisor rucar bran, dotari pensiune munte, cazare culoarul rucar bran',
  
  openGraph: {
    title: 'Facilități Premium - Casa Luna Rucăr',
    description: '6 dormitoare matrimoniale, living room de poveste, bucătărie utilată și foișor interior încălzit cu grătar profesional pe culoarul Rucăr-Bran.',
    url: 'https://www.casalunarucar.ro/facilities',
    type: 'website',
    images: [
      {
        url: 'https://res.cloudinary.com/dnnpsia65/image/upload/c_fill,g_auto,w_1200,h_630,f_auto,q_auto/intro',
        width: 1200,
        height: 630,
        alt: 'Facilități Pensiunea Casa Luna Rucăr',
      },
    ],
  },
};

export default function Page() {
  return <FacilitiesClient />;
}