import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Casa Luna",
  description: "A modern rustic retreat.",
  icons: {
    icon: "logo.png", 
    shortcut: "logo.png",
    apple: "logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="deploy-check" content="2026-08-13T14:48:29Z" />
        {/* Google tag (gtag.js) */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18326160055"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18326160055');
            `,
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}