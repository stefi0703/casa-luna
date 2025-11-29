import "./globals.css";

export const metadata = {
  title: "Cabana Luna",
  description: "A modern rustic retreat.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
