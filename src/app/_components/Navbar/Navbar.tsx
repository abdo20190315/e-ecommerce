'use client'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { FaInstagram, FaFacebook, FaTiktok, FaTwitter, FaLinkedin, FaYoutube, FaUserAlt } from 'react-icons/fa'
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
import CartContextProvider, { cartContext } from '@/context/CartContext';
import { Loader } from 'lucide-react';
import Loading from '@/app/loading';


export default function Navbar() {


  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const path = usePathname()
  useEffect(() => {
    setMounted(true);
   
  }, []);
 const {cartData , isLoading}= useContext(cartContext)

  return <>
    <nav className="w-full bg-background dark:bg-card shadow flex items-center justify-between px-6 py-4 fixed top-0 left-0 z-50">
      {/* Brand on left */}
      <div className="flex items-center">
        <Link href='/' className="flex items-center font-bold text-xl text-green-600 dark:text-green-400">
          <FaShoppingCart className="mr-1" />freshcart
        </Link>
      </div>
      {/* Navigation links centered */}
      <ul className="flex items-center space-x-4 mx-auto">
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
      {/* Right section: Theme toggle and User Dropdown */}
      <div className="flex items-center space-x-4">

        <div className="relative flex items-center">
          <Link href='/cart'>
            <FaCartShopping className="text-2xl text-green-600 dark:text-green-400" />
            <Badge
              className="absolute -top-3 -right-3 px-2 py-0.5 text-xs pointer-events-none border-green-500 bg-white dark:bg-card text-green-600 dark:text-green-400 shadow"
              variant="outline"
            >
              {isLoading ? <Loading className="w-4 h-4 animate-spin" /> : cartData?.numOfCartItems}
            </Badge>
          </Link>
        </div>
        <button
          onClick={toggleTheme}
          className="text-green-600 dark:text-green-400 transition"
          aria-label="Toggle Theme"
        >
          {mounted && theme === 'dark' ? <TfiShine /> : <MdDarkMode />}
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='text-green-500'>
            <button  aria-label="Open user menu" className="text-foreground"><FaUserAlt /></button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={'/logout'} className="text-foreground hover:text-primary transition">Logout</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/register'}>Register</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/login'}>Login</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
    </>
}
