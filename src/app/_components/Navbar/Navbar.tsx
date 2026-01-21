import React from 'react'
import Link from 'next/link'
import { FaInstagram, FaFacebook, FaTiktok, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa'

export default function Navbar() {
  return <>
    <nav className="w-full bg-white shadow flex items-center justify-between px-6 py-3">
      {/* Left section: Brand */}
      <div className="flex items-center space-x-4">
        <Link href='/' className="font-bold text-xl text-green-600">freshcart</Link>
        {/* Navigation links */}
        <ul className="flex items-center space-x-4 ml-8">
          <li>
            <Link href="/" className="text-gray-700 hover:text-green-600 transition">Home</Link>
          </li>
          <li>
            <Link href="/cart" className="text-gray-700 hover:text-green-600 transition">Cart</Link>
          </li>
          <li>
            <Link href="/product" className="text-gray-700 hover:text-green-600 transition">Products</Link>
          </li>
          <li>
            <Link href="/categories" className="text-gray-700 hover:text-green-600 transition">Categories</Link>
          </li>
          <li>
            <Link href="/brands" className="text-gray-700 hover:text-green-600 transition">Brands</Link>
          </li>
        </ul>
      </div>
      {/* Right section: Social Icons and Logout */}
      <div className="flex items-center space-x-4">
     
        <div className="flex items-center space-x-2 ml-4">
          <FaInstagram className="text-xl hover:text-pink-500 transition cursor-pointer" />
          <FaFacebook className="text-xl hover:text-blue-600 transition cursor-pointer" />
          <FaTiktok className="text-xl hover:text-black transition cursor-pointer" />
          <FaTwitter className="text-xl hover:text-blue-400 transition cursor-pointer" />
          <FaLinkedin className="text-xl hover:text-blue-700 transition cursor-pointer" />
          <FaYoutube className="text-xl hover:text-red-600 transition cursor-pointer" />
        </div>
        <button className=""><Link href={'/register'}>Logout</Link> </button>
      </div>
    </nav>
    </>
}
