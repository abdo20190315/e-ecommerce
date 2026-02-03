'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { FaInstagram, FaFacebook, FaTiktok, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa'
import { FaShoppingCart } from "react-icons/fa";
import { useTheme } from '@/context/ThemeContext';
import { TfiShine } from 'react-icons/tfi';
import { MdDarkMode } from 'react-icons/md';
import { usePathname } from 'next/navigation';
export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const path = usePathname()
  useEffect(() => {
    setMounted(true);
   
  }, []);

  return <>
    <nav className="w-full  bg-background dark:bg-card shadow flex items-center  justify-between px-6 py-4 fixed top-0 left-0 z-50 ">
      {/* Left section: Brand */}
      <div className="flex items-center space-x-4">
        <Link href='/' className="flex items-center font-bold text-xl text-green-600 dark:text-green-400"><FaShoppingCart />freshcart</Link>
        <div className="flex items-center gap-3">
          
          <button onClick={toggleTheme} className=" text-green-600 dark:text-green-400    transition">
            {mounted && theme === 'dark' ? <TfiShine /> : <MdDarkMode />}
          </button>
        </div>
        {/* Navigation links */}
        <ul className="flex items-center space-x-4 ml-8">
          <li>
            <Link href="/" className={`text-green-600 ${path === '/' ? 'active' : ''}`}>Home</Link>
          </li>
          <li>
            <Link href="/cart" className={`text-green-600 ${path === '/cart' ? 'active' : ''}`}>Cart</Link>
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
      </div>
      {/* Right section: Social Icons and Logout */}
      <div className="flex items-center space-x-4">
     
        <div className="flex items-center space-x-2 ml-4">
         
        <button className="text-foreground hover:text-primary transition"><Link href={'/register'}>Logout</Link> </button>
        <Link href={'/register'}>Register</Link>
        <Link href={'/login'}>Login</Link>
        </div>
      </div>
      
    </nav>
    </>
}
