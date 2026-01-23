'use client'
import React from 'react'
import Link from 'next/link'
import { FaInstagram, FaFacebook, FaTiktok, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { FaShoppingCart } from "react-icons/fa";
import { useTheme } from '@/context/ThemeContext';
import { TfiShine } from 'react-icons/tfi';
import { MdDarkMode } from 'react-icons/md';
export default function Navbar() {


  const { theme, toggleTheme } = useTheme();
  return <>
    <nav className="w-full bg-background dark:bg-card shadow flex items-center justify-between px-6 py-4 ">
      {/* Left section: Brand */}
      <div className="flex items-center space-x-4">
        <Link href='/' className="flex items-center font-bold text-xl text-green-600 dark:text-green-400"><FaShoppingCart />freshcart</Link>
        <div className="flex items-center gap-3">
          
          <button onClick={toggleTheme} className="text-foreground hover:text-primary transition">
            {theme === 'dark' ? <TfiShine /> : <MdDarkMode />}
          </button>
        </div>
        {/* Navigation links */}
        <ul className="flex items-center space-x-4 ml-8">
          <li>
            <Link href="/" className="text-foreground hover:text-green-600 dark:hover:text-green-400 transition">Home</Link>
          </li>
          <li>
            <Link href="/cart" className="text-foreground hover:text-green-600 dark:hover:text-green-400 transition">Cart</Link>
          </li>
          <li>
            <Link href="/product" className="text-foreground hover:text-green-600 dark:hover:text-green-400 transition">Products</Link>
          </li>
          <li>
            <Link href="/categories" className="text-foreground hover:text-green-600 dark:hover:text-green-400 transition">Categories</Link>
          </li>
          <li>
            <Link href="/brands" className="text-foreground hover:text-green-600 dark:hover:text-green-400 transition">Brands</Link>
          </li>
        </ul>
      </div>
      {/* Right section: Social Icons and Logout */}
      <div className="flex items-center space-x-4">
     
        <div className="flex items-center space-x-2 ml-4">
          <FaInstagram className="text-xl text-foreground hover:text-pink-500 dark:hover:text-pink-400 transition cursor-pointer" />
          <FaFacebook className="text-xl text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition cursor-pointer" />
          <FaTiktok className="text-xl text-foreground hover:text-black dark:hover:text-gray-300 transition cursor-pointer" />
          <FaTwitter className="text-xl text-foreground hover:text-blue-400 dark:hover:text-blue-300 transition cursor-pointer" />
          <FaLinkedin className="text-xl text-foreground hover:text-blue-700 dark:hover:text-blue-500 transition cursor-pointer" />
          <FaYoutube className="text-xl text-foreground hover:text-red-600 dark:hover:text-red-400 transition cursor-pointer" />
        </div>
        <button className="text-foreground hover:text-primary transition"><Link href={'/register'}>Logout</Link> </button>
      </div>
    </nav>
    </>
}
