"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-gray-900 border-b border-purple-900/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity">
            <Image
              src="/dmgicon.png"
              alt="FreeNime Logo"
              width={50}
              height={50}
              className="h-10 w-10 mr-2 border-2 border-purple-500 rounded-full"
            />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 text-transparent bg-clip-text">
              FreeNime
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/schedule"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              Schedule
            </Link>
            {/* <Link
              href="/movies"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              Movies
            </Link> */}
            {/* <Link
              href="/genres"
              className="text-gray-300 hover:text-purple-400 transition-colors"
            >
              Genres
            </Link> */}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search anime..."
                className="bg-gray-800 text-white rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-2.5 text-gray-400 hover:text-purple-500"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-purple-400"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/"
              className="block text-gray-300 hover:text-purple-400 transition-colors py-2"
            >
              Home
            </Link>
            <Link
              href="/schedule"
              className="block text-gray-300 hover:text-purple-400 transition-colors py-2"
            >
              Schedule
            </Link>
            {/* <Link
              href="/movies"
              className="block text-gray-300 hover:text-purple-400 transition-colors py-2"
            >
              Movies
            </Link> */}
            {/* <Link
              href="/genres"
              className="block text-gray-300 hover:text-purple-400 transition-colors py-2"
            >
              Genres
            </Link> */}

            <form onSubmit={handleSearch} className="relative mt-4">
              <input
                type="text"
                placeholder="Search anime..."
                className="bg-gray-800 text-white rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-2.5 text-gray-400 hover:text-purple-500"
              >
                <Search size={18} />
              </button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
}
