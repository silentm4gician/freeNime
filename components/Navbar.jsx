"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const [menuHeight, setMenuHeight] = useState(0);

  useEffect(() => {
    if (menuRef.current) {
      setMenuHeight(menuRef.current.scrollHeight);
    }
  }, [isOpen]);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 fixed w-full z-50 top-0">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Logo />
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/popular"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Popular
              </Link>
              <Link
                href="/airing"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Airing Schedule
              </Link>
            </div>
          </div>
          <div className="hidden md:block">
            <SearchBar />
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white transition-colors"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={menuRef}
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
        style={{ maxHeight: isOpen ? `${menuHeight}px` : "0px" }}
      >
        <div className="bg-gray-900 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/popular"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            >
              Popular
            </Link>
            <Link
              href="/airing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            >
              Airing Schedule
            </Link>
          </div>
          <div className="px-4 py-3">
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>
  );
}
