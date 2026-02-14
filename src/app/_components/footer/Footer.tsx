import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#17181A] py-12 px-6 md:px-16 border-t border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-300 transition-colors duration-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* قسم شعار المتجر والمعلومات */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-black dark:bg-white text-white dark:text-black p-1.5 font-bold text-xl flex items-center justify-center w-10 h-10 transition-colors duration-300">
              S
            </div>
            <span className="text-2xl font-bold text-black dark:text-white transition-colors duration-300">ShopMart</span>
          </div>
          <p className="text-sm leading-relaxed mb-6">
            Your one-stop destination for the latest technology, fashion, and lifestyle products. 
            Quality guaranteed with fast shipping and excellent customer service.
          </p>
          
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-gray-500 dark:text-gray-400 transition-colors duration-300" />
              <span>123 Shop Street, Octoper City, DC 12345</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} className="shrink-0 text-gray-500 dark:text-gray-400 transition-colors duration-300" />
              <span>(+20) 01093333333</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="shrink-0 text-gray-500 dark:text-gray-400 transition-colors duration-300" />
              <span>support@shopmart.com</span>
            </div>
          </div>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="font-bold text-black dark:text-white mb-6 text-sm uppercase tracking-wider transition-colors duration-300">SHOP</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Electronics</a>
            </li>
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Fashion</a>
            </li>
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Home & Garden</a>
            </li>
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Sports</a>
            </li>
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Deals</a>
            </li>
          </ul>
        </div>

        {/* CUSTOMER SERVICE */}
        <div>
          <h3 className="font-bold text-black dark:text-white mb-6 text-sm uppercase tracking-wider transition-colors duration-300">CUSTOMER SERVICE</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Contact Us</a>
            </li>
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Help Center</a>
            </li>
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Track Your Order</a>
            </li>
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Returns & Exchanges</a>
            </li>
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Size Guide</a>
            </li>
          </ul>
        </div>

        {/* ABOUT */}
        <div>
          <h3 className="font-bold text-black dark:text-white mb-6 text-sm uppercase tracking-wider transition-colors duration-300">ABOUT</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">About shopmart</a>
            </li>
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Careers</a>
            </li>
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Press</a>
            </li>
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Investor Relations</a>
            </li>
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Sustainability</a>
            </li>
          </ul>
        </div>

        {/* POLICIES */}
        <div>
          <h3 className="font-bold text-black dark:text-white mb-6 text-sm uppercase tracking-wider transition-colors duration-300">POLICIES</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Terms of Service</a>
            </li>
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Cookie Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Shipping Policy</a>
            </li>
            <li>
              <a href="#" className="hover:text-black dark:hover:text-white transition-colors">Refund Policy</a>
            </li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;