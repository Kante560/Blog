import React from "react";
import { Nav } from "./Nav";
import { Link } from "react-router-dom";
import { Marketing } from "./Marketing";
import { About } from "./About";
import { Footer } from "../pages/Footer";
import { motion } from "framer-motion";
const Home = () => {
  return (
    <>
      <Nav />

      {/* Animated gradient background */}
      <motion.div
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          background: "linear-gradient(120deg, #d1fae5 0%, #fff 50%, #d1fae5 100%)",
          backgroundSize: "200% 200%",
          width: "100%",
          minHeight: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
    
        className="w-full min-h-screen mt-4 py-20 relative"
      >
        <div className="absolute hidden md:flex rounded-[50%] h-20 w-20 bg-green-100 left-[840px] top-[420px] "></div>
        <div className="absolute hidden md:flex rounded-[50%] h-24 w-24 bg-green-100 left-[1330px] top-[200px] "></div>
        <div className="max-w-7xl mx-auto px-6 lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Transform Your
              <span className="text-green-600">Marketing Thoughts</span> Into
              Reality
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              At SayNaira, we turn innovative marketing ideas into powerful
              strategies that drive growth. Your success is our mission, and
              every naira invested works harder for your business.
            </p>

            <div className="mt-8 flex gap-4 items-center">
              <Link
              to="/marketing"
              >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md"
              >
                Start Your Journey
              </motion.button>
              </Link>  
              <Link
              to="/marketing"
              >
              <a
                href="#"
                className="border border-green-600 text-green-600 px-6 py-3 rounded-md text-sm font-semibold hover:bg-green-50"
              >
                View Our Work
              </a>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-green-600">200+</p>
                <p className="text-sm text-gray-500">Happy Clients</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">500%</p>
                <p className="text-sm text-gray-500">Avg ROI Increase</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">5+</p>
                <p className="text-sm text-gray-500">Years Experience</p>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 lg:w-5/12 relative">
            <div className="space-y-6 bg-white rounded-2xl shadow-2xl p-9 px-13 transform rotate-10 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 text-green-600 p-2 rounded-md">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Growth Strategy</p>
                  <p className="text-sm text-gray-500">
                    Data-driven marketing solutions
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 text-green-600 p-2 rounded-md">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="3" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Targeted Campaigns</p>
                  <p className="text-sm text-gray-500">Reach the right audience</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 text-green-600 p-2 rounded-md">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Creative Ideas</p>
                  <p className="text-sm text-gray-500">
                    Innovative marketing thoughts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
      <motion.div
       initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >

      <Marketing />
      <About />
      <Footer />
      </motion.div>
    </>
  );
};

export default Home;
