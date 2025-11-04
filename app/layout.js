import Footer from "../components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Freenime - Anime gratis en español",
  description: "Anime gratis en español",
  icons: {
    icon: "/dmgicon.png",
  },
  openGraph: {
    title: "Freenime - Anime gratis en español",
    description: "Anime gratis en español",
    type: "website",
    locale: "es_ES",
    siteName: "Freenime",
    images: [
      {
        url: "https://free-nime.vercel.app/dmgicon.png",
        width: 1200,
        height: 630,
        alt: "Freenime - Anime gratis en español",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className=" antialiased">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
