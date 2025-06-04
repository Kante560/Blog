import React from 'react'
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from 'lucide-react';

export const Footer = () => {
  return (
    <div  className="bg-gray-900 text-white px-6 md:px-16 py-12">
      
         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1: Logo + Mission */}
        <div>
          <div className="flex items-center space-x-2 mb-4 px-4">
            <div className="flex item-center space-x-2 text-[13.5px] font-bold p-1.5 px-2.5 rounded-lg bg-green-600 text-white">
              ₦
            </div>
            <span>
              <h1 className="font-bold text-2xl text-green-">SayNaira</h1>
            </span>
          </div>
          <p className="text-gray-400 mb-6">
            Transforming marketing thoughts into profitable realities. We help businesses grow by making every naira count in their marketing investments.
          </p>
          {/* Social Icons */}
          <div className="flex gap-4 text-gray-200">
            <div className='p-2 rounded-md hover:bg-green-600 bg-gray-600'><Facebook className="  cursor-pointer " /></div>
            <div className='p-2 rounded-md hover:bg-green-600 bg-gray-600'><Twitter className=" cursor-pointer" /></div>
            <div className='p-2 rounded-md hover:bg-green-600 bg-gray-600'><Linkedin className="  cursor-pointer" /></div>
            <div className='p-2 rounded-md hover:bg-green-600 bg-gray-600'><Instagram className=" cursor-pointer" /></div>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/services" className="hover:text-white">Services</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/blog" className="hover:text-white">Blog</a></li>
            <li><a href="/case-studies" className="hover:text-white">Case Studies</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Info</h3>
          <ul className="space-y-4 text-gray-400">
            <li className="flex items-start gap-2">
              <Mail className="text-green-500 mt-1" size={18} />
              <div>
                <p>hello@saynaira.com</p>
                <p>support@saynaira.com</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="text-green-500 mt-1" size={18} />
              <div>
                <p>+234 (0) 123 456 7890</p>
                <p>+234 (0) 098 765 4321</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="text-green-500 mt-1" size={18} />
              <div>
                <p>123 Business District</p>
                <p>Lagos, Nigeria</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

   
      <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>&copy; 2025 SayNaira. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Cookie Policy</a>
        </div>
      </div>
    </div>
  )
}

