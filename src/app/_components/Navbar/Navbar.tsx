'use client'
import React, { useContext, useEffect, useState } from 'react'

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


export default function Navbar() {
   const session =  useSession()

  //  console.log(session);
   

  const { wishlist } = useWishlist();



  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const path = usePathname()
  useEffect(() => {
    // Use setTimeout to avoid synchronous setState in effect
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
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
        {session.status=="authenticated" && <li>
          <Link href="/cart" className={`text-green-600 ${path === '/cart' ? 'active' : ''}`}>Cart</Link>
        </li>}
        <li>
          <Link href="/product" className={`text-green-600 ${path === '/product' ? 'active' : ''}`}>Products</Link>
        </li>
        <li>
          <Link href="/categories" className={`text-green-600 ${path === '/categories' ? 'active' : ''}`}>Categories</Link>
        </li>
        <li>
          <Link href="/brands" className={`text-green-600 ${path === '/brands' ? 'active' : ''}`}>Brands</Link>
        </li>
       {session.status== "authenticated" &&  
        <li>
          <Link href="/wishlist" className={`text-green-600 ${path === '/wishlist' ? 'active' : ''}`}>Wishlist</Link>
        </li>}
      </ul>
      {/* Right section: Theme toggle and User Dropdown */}
      <div className="flex items-center space-x-4">
          {/* Wishlist Icon */}

          {session.status=='authenticated' && <Link href='/wishlist'>
         <div className="relative">
          <FaHeart className="w-6 h-6 text-green-500" />
          
          {/* Badge */}
          {wishlist && Array.isArray(wishlist) && wishlist.length > 0 && (
            <Badge className="absolute -top-3 -right-3 px-2 py-0.5 text-xs pointer-events-none border-green-500 bg-white dark:bg-card text-green-600 dark:text-green-400 shadow rounded-full flex items-center justify-center">
              {wishlist.length}
            </Badge>
          )}
        </div>
        
         </Link>}
        

       { session.status=='authenticated' &&  <div className="relative flex items-center">
          <Link href='/cart'>
            <FaCartShopping className="text-2xl text-green-600 dark:text-green-400" />
            <Badge
              className="absolute -top-3 -right-3 px-2 py-0.5 text-xs pointer-events-none border-green-500 bg-white dark:bg-card text-green-600 dark:text-green-400 shadow"
              variant="outline"
            >
              {isLoading ? '...' : cartData?.numOfCartItems || 0}
            </Badge>
          </Link>
        </div> }
        
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
            <DropdownMenuLabel>
             {session.status=='authenticated' && <h2>{session.data.user.name}</h2>}
              </DropdownMenuLabel>
            <DropdownMenuSeparator />


            {session.status=='authenticated'? <>
            
              <DropdownMenuItem onClick={()=>{
                signOut({
                  callbackUrl:'/'
                });
              }}  className="text-foreground hover:text-primary transition">Logout</DropdownMenuItem>
            </>:  
            <>
            <DropdownMenuItem>
              <Link href={'/register'}>Register</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/login'}>Login</Link>
            </DropdownMenuItem> 
            </> }
          
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
    </>
}
