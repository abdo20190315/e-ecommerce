"use client";

import React from "react";

import amazonPay from "../../../../public/screens/Amazon_Pay_logo.png";
import masterCard from "../../../../public/screens/MasterCard-Logo.png";
import payPal from "../../../../public/screens/PayPal.png";
import googlePlay from "../../../../public/screens/get-it-on-google-play-badge.png";
import appleStore from "../../../../public/screens/get-it-on-apple-store.png";

export default function Footer() {
  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 py-6">
      <div className="container mx-auto px-4">
        <footer className="space-y-6">
          {/* App Info */}
          <div>
            <h5 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              Get the FreshCart app
            </h5>
            <h6 className="text-gray-600 dark:text-gray-300">
              We will send you a link, open it on your phone to download the app
            </h6>
          </div>

          {/* Email input + button */}
          <div className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-2 md:space-y-0">
            <input
              className="flex-1 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500"
              type="text"
              placeholder="Email .."
            />
            <button className="bg-green-600 dark:bg-green-500 text-white dark:text-gray-900 rounded-md px-4 py-2 hover:bg-green-700 dark:hover:bg-green-600 transition">
              Share App Link
            </button>
          </div>

          <hr className="border-t border-gray-300 dark:border-gray-700" />

          {/* Payment Partners + App Stores */}
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Payment Partners */}
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                Payment Partners
              </span>
              <img src={amazonPay.src} alt="Amazon Pay" className="w-10 h-10 object-contain" loading="lazy" />
              <img src={masterCard.src} alt="MasterCard" className="w-10 h-10 object-contain" loading="lazy" />
              <img src={payPal.src} alt="PayPal" className="w-10 h-10 object-contain" loading="lazy" />
            </div>

            {/* App Stores */}
            <div className="flex items-center space-x-4">
              <div className="text-gray-700 dark:text-gray-300 font-medium">
                Get deliveries with FreshCart
              </div>
              <img src={appleStore.src} alt="Download on Apple Store" className="w-[120px] h-10 object-contain" loading="lazy" />
              <img src={googlePlay.src} alt="Get it on Google Play" className="w-[120px] h-10 object-contain" loading="lazy" />
            </div>
          </div>

          <hr className="border-t border-gray-300 dark:border-gray-700" />
        </footer>
      </div>
    </div>
  );
}
