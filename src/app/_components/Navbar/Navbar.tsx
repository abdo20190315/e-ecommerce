'use client'
import React, { useContext, useEffect, useState, useRef } from 'react'

import Link from 'next/link'
import { FaUserAlt } from 'react-icons/fa'
import { FaShoppingCart } from "react-icons/fa";
import { useTheme } from '@/context/ThemeContext';
import { TfiShine } from 'react-icons/tfi';
import { MdDarkMode } from 'react-icons/md';
import { usePathname } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaCartShopping } from 'react-icons/fa6';
import { Badge } from "@/components/ui/badge"
import { cartContext } from '@/context/CartContext';
import { useWishlist } from "@/context/WishlistContext";
import { FaHeart } from "react-icons/fa";
import { signOut, useSession } from 'next-auth/react';

import { IoMdMenu, IoMdClose } from "react-icons/io";

export default function Navbar() {
  const session =  useSession()
  const { wishlist } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);
  const lastFocusableRef = useRef<HTMLElement | null>(null);

  const path = usePathname()
  useEffect(() => {
    // Use setTimeout to avoid synchronous setState in effect
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);
  const {cartData , isLoading}= useContext(cartContext)

  // Used for auto-closing hamburger/mobile menu on link click
  const handleCloseMenu = () => {
    setMenuOpen(false);
    // Return focus to toggle button when menu closes
    setTimeout(() => {
      menuToggleRef.current?.focus();
    }, 0);
  };

  // Focus management: trap focus inside menu when open, remove focus when closed
  useEffect(() => {
    const menuElement = menuRef.current;
    if (!menuElement) return;

    if (menuOpen) {
      // Get all focusable elements inside the menu
      const focusableElements = menuElement.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (focusableElements.length > 0) {
        firstFocusableRef.current = focusableElements[0];
        lastFocusableRef.current = focusableElements[focusableElements.length - 1];

        // Focus first element when menu opens
        setTimeout(() => {
          firstFocusableRef.current?.focus();
        }, 100);
      }

      // Handle keyboard navigation for focus trapping
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          // Shift + Tab: if on first element, move to last
          if (document.activeElement === firstFocusableRef.current) {
            e.preventDefault();
            lastFocusableRef.current?.focus();
          }
        } else {
          // Tab: if on last element, move to first
          if (document.activeElement === lastFocusableRef.current) {
            e.preventDefault();
            firstFocusableRef.current?.focus();
          }
        }
      };

      menuElement.addEventListener('keydown', handleKeyDown);

      return () => {
        menuElement.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      // When menu is closed, remove focus from any element inside it
      const activeElement = document.activeElement as HTMLElement;
      if (activeElement && menuElement.contains(activeElement)) {
        activeElement.blur();
      }
    }
  }, [menuOpen]);

  // Handle Escape key to close menu
  useEffect(() => {
    if (!menuOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  // Main render
  return (
    <>
    <nav className="w-full bg-background dark:bg-card shadow flex items-center justify-between px-6 py-4 fixed top-0 left-0 z-50">
      {/* Brand on left */}
      <div className="flex items-center">
        <Link href='/' className="flex items-center font-bold text-xl text-green-600 dark:text-green-400">
          <FaShoppingCart className="mr-1" />freshcart
        </Link>
      </div>

      {/* Center nav: desktop only */}
      <ul className="hidden lg:flex items-center space-x-4 mx-auto">
        <li>
          <Link href="/" className={`text-green-600 ${path === '/' ? 'active' : ''}`}>Home</Link>
        </li>
        <li>
          <Link href="/product" className={`text-green-600 ${path === '/product' ? 'active' : ''}`}>Products</Link>
        </li>
        <li>
          <Link href="/categories" className={`text-green-600 ${path === '/categories' ? 'active' : ''}`}>Categories</Link>
        </li>
        <li>
          <Link href="/brands" className={`text-green-600 ${path === '/brands' ? 'active' : ''}`}>Brands</Link>
        </li>
      </ul>

      {/* Right grouped icons section */}
      <div className="flex items-center space-x-4">

        {/* Wishlist Icon - always visible if authenticated */}
        {session.status=='authenticated' && (
          <Link href='/wishlist' aria-label="Wishlist">
            <div className="relative">
              <FaHeart className="w-6 h-6 text-green-500" />
              {wishlist && Array.isArray(wishlist) && wishlist.length > 0 && (
                <Badge className="absolute -top-3 -right-3 px-2 py-0.5 text-xs pointer-events-none border-green-500 bg-white dark:bg-card text-green-600 dark:text-green-400 shadow rounded-full flex items-center justify-center">
                  {wishlist.length}
                </Badge>
              )}
            </div>
          </Link>
        )}

        {/* Cart Icon - always visible if authenticated */}
        {session.status=='authenticated' && (
          <div className="relative flex items-center">
            <Link href='/cart' aria-label="Cart">
              <FaCartShopping className="text-2xl text-green-600 dark:text-green-400" />
              <Badge
                className="absolute -top-3 -right-3 px-2 py-0.5 text-xs pointer-events-none border-green-500 bg-white dark:bg-card text-green-600 dark:text-green-400 shadow"
                variant="outline"
              >
                {isLoading ? '...' : cartData?.numOfCartItems || 0}
              </Badge>
            </Link>
          </div>
        )}

        {/* Theme Toggle - always visible */}
        <button
          onClick={toggleTheme}
          className="text-green-600 dark:text-green-400 transition"
          aria-label="Toggle Theme"
        >
          {mounted && theme === 'dark' ? <TfiShine /> : <MdDarkMode />}
        </button>

        {/* Desktop user dropdown */}
        <div className="hidden lg:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild className='text-green-500'>
              <button aria-label="Open user menu" className="text-foreground"><FaUserAlt /></button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {session.status=='authenticated' && <h2>{session.data.user.name}</h2>}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {session.status=='authenticated' ? (
                <>
                  <DropdownMenuItem onClick={()=>{
                    signOut({ callbackUrl:'/' });
                  }} className="text-foreground hover:text-primary transition">Logout</DropdownMenuItem>
                </>
                )
                : (
                <>
                  <DropdownMenuItem>
                    <Link href={'/register'}>Register</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={'/login'}>Login</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Hamburger for mobile only - on the far right */}
        <button
          ref={menuToggleRef}
          type="button"
          className="block lg:hidden focus:outline-none"
          aria-label={menuOpen ? "Close mobile menu" : "Open mobile menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <IoMdClose size={28} /> : <IoMdMenu size={28} />}
        </button>
      </div>

      {/* --- Mobile menu overlay --- */}
      {/* Show only on mobile (lg:hidden), overlay full width, slide vertically */}
      {/* By default, menuOpen false: hidden. menuOpen true: visible */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 w-full h-screen bg-white dark:bg-background z-50 transform transition-transform duration-200 ease-in-out
         ${menuOpen ? "translate-x-0" : "-translate-x-full"} lg:hidden`}
        style={{ transitionProperty: 'transform' }}
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? -1 : undefined}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-b-muted">
          <Link href="/" className="flex items-center font-bold text-xl text-green-600 dark:text-green-400" onClick={handleCloseMenu}>
            <FaShoppingCart className="mr-1" />freshcart
          </Link>
          <button
            type="button"
            className="text-green-600 dark:text-green-400"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <IoMdClose size={32} />
          </button>
        </div>
        <nav className="flex flex-col mt-2 px-6 space-y-1">
          <Link
            href="/"
            className={`py-2 px-2 rounded text-green-600 ${path === '/' ? 'bg-green-100 dark:bg-card/70 font-semibold' : ''}`}
            onClick={handleCloseMenu}
          >
            Home
          </Link>
          <Link
            href="/product"
            className={`py-2 px-2 rounded text-green-600 ${path === '/product' ? 'bg-green-100 dark:bg-card/70 font-semibold' : ''}`}
            onClick={handleCloseMenu}
          >
            Products
          </Link>
          <Link
            href="/categories"
            className={`py-2 px-2 rounded text-green-600 ${path === '/categories' ? 'bg-green-100 dark:bg-card/70 font-semibold' : ''}`}
            onClick={handleCloseMenu}
          >
            Categories
          </Link>
          <Link
            href="/brands"
            className={`py-2 px-2 rounded text-green-600 ${path === '/brands' ? 'bg-green-100 dark:bg-card/70 font-semibold' : ''}`}
            onClick={handleCloseMenu}
          >
            Brands
          </Link>

          <div className="border-t border-muted mt-3 pt-3" />

          {session.status === 'authenticated' && (
            <>
              <div className="mb-2 font-medium text-foreground flex items-center">
                <FaUserAlt className="mr-2" /> {session.data.user.name}
              </div>
              <button
                className="w-full text-left py-2 px-2 rounded text-foreground hover:text-primary transition"
                onClick={() => {
                  handleCloseMenu();
                  signOut({ callbackUrl:'/' });
                }}
              >
                Logout
              </button>
            </>
          )}
          {session.status !== 'authenticated' && (
            <>
              <Link
                href="/register"
                className="py-2 px-2 rounded text-foreground hover:text-primary transition"
                onClick={handleCloseMenu}
              >Register</Link>
              <Link
                href="/login"
                className="py-2 px-2 rounded text-foreground hover:text-primary transition"
                onClick={handleCloseMenu}
              >Login</Link>
            </>
          )}
        </nav>
      </div>
    </nav>
    </>
  );
}
