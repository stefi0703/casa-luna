import "./globals.css";

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
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18326160055"></script>
        <script
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