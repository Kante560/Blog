import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <>
      <div className="bg-white border-b-gray-200 border-b-[2px] w-full z-50 fixed top-0 left-0">
        <div className="font-inter max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 px-4">
            <div className="flex item-center space-x-2 text-[13.5px] font-bold p-1.5 px-2.5 rounded-lg bg-green-600 text-white">
              ₦
            </div>
            <span>
              <h1 className="font-bold text-2xl text-green-">SayNaira</h1>
            </span>
          </div>

          <div className="hidden md:flex space-x-6 items-center text-gray-600 font-lg font-inter px-6">
            <Link className="hover:text-green-600" to="/">
              Home
            </Link>
            <Link
              to="/marketing"
              className="hover:text-green-600"
            >
              Service
            </Link>
            <Link to="/about" className="hover:text-green-600">
              About
            </Link>
            <Link to="/blog" className="hover:text-green-600">
              Blog
            </Link>

            <Link
              to="/signup"
              className="py-2 px-4.5 bg-green-600 text-white rounded-lg "
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
