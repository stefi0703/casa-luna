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
      <body className="antialiased">{children}</body>
    </html>
  );
}
