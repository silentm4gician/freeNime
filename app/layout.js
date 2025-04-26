import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FreeNime - Watch Anime Online",
  description: "Watch your favorite anime shows",
  icons: {
    icon: "/dmgicon.png",
  },
  keywords: [
    "anime",
    "streaming",
    "watch anime",
    "anime shows",
    "anime movies",
  ],
  authors: [
    {
      name: "silentM4gician",
      url: "https://github.com/silentm4gician",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-950 text-white min-h-screen`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
