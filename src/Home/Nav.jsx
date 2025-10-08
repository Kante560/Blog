import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { Menu, X, MessageCircle, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationBell } from "../_component_/NotificationBell";

export const Nav = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // <-- add this line
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? "dark" : "light";
  });

  // Auto-close on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Apply theme to html element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <div className="bg-white dark:bg-gray-900 border-b-gray-200 dark:border-gray-700 border-b-[2px] w-full z-50 fixed top-0 left-0">
        <div className="font-inter max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link
          to="/"

          >
          <div className="flex items-center cursor:pointer space-x-2 px-4">
            <div className="flex item-center space-x-2 text-[13.5px] font-bold p-1.5 px-2.5 rounded-lg bg-green-600 text-white">
              ₦
            </div>
            <span>
              <h1 className="font-bold text-2xl text-green-600">SayNaira</h1>
            </span>
          </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center text-gray-600 dark:text-gray-300 font-lg px-6">
            <Link className="hover:text-green-600 dark:hover:text-green-400" to="/">
              Home
            </Link>
           
            <Link to="/blog" className="hover:text-green-600 dark:hover:text-green-400">
              Live Market
            </Link>
            {user && (
              <>
                <Link
                  to="/messages"
                  className="relative hover:text-green-600 dark:hover:text-green-400 flex items-center gap-1"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Messages</span>
                </Link>
                <NotificationBell />
              </>
            )}
            {!user && (
              <>
              <Link to="/marketing" className="hover:text-green-600 dark:hover:text-green-400">
              Service
            </Link>
            <Link to="/about" className="hover:text-green-600 dark:hover:text-green-400">
              About
            </Link>
              <Link
                to="/signup"
                className="py-2 px-4 bg-green-600 text-white rounded-lg"
              >
                Get Started
              </Link>
              </>
            )}
            {/* Theme Toggle */}

            {user && (
              <>  <button
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              className="p-2 rounded-md border border-transparent hover:border-gray-300 dark:hover:border-gray-600"
              title={theme === "dark" ? "Switch to light" : "Switch to dark"}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
              </>
            )}
          
            {user && (
              <motion.button
                onClick={async () => {
                  await logout();
                  toast.success('You have been logged out. Please log in again.');
                  navigate('/login');
                }}
                whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-red-600 cursor:pointer rounded-lg font-semibold hover:underline"
              >
                Logout
              </motion.button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-gray-700 dark:text-gray-200"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden bg-white dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-700"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="flex flex-col space-y-4 text-gray-700 dark:text-gray-200 font-medium overflow-hidden">
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/"
                  className="hover:text-green-600 dark:hover:text-green-400"
                >
                  Home
                </Link>
                
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/blog"
                  className="hover:text-green-600 dark:hover:text-green-400"
                >
                  Live Market
                </Link>
                {user && (
                  <Link
                    onClick={() => setIsOpen(false)}
                    to="/messages"
                    className="hover:text-green-600 dark:hover:text-green-400 flex items-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Messages
                  </Link>
                )}
                {!user && (
                  <>
                  <Link
                  onClick={() => setIsOpen(false)}
                  to="/marketing"
                  className="hover:text-green-600 dark:hover:text-green-400"
                >
                  Service
                </Link>
                <Link
                  onClick={() => setIsOpen(false)}
                  to="/about"
                  className="hover:text-green-600 dark:hover:text-green-400"
                >
                  About
                </Link>
                  <Link
                    onClick={() => setIsOpen(false)}
                    to="/signup"
                    className="py-2 px-4 bg-green-600 text-white rounded-lg text-center w-full"
                  >
                    Get Started
                  </Link>
                  </>
                )}
                {user && (
                  <motion.button
                    onClick={async () => {
                      setIsOpen(false);
                      await logout();
                      toast.success('You have been logged out. Please log in again.');
                      navigate('/login');
                    }}
                    whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-red-600 text-white cursor:pointer px-2 py-2 rounded-lg font-semibold shadow-md"
                  >
                    Logout
                  </motion.button>
                )}
                {/* Mobile Theme Toggle */}
                {user && (
              <>  <button
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              className="p-2 rounded-md border border-transparent hover:border-gray-300 dark:hover:border-gray-600"
              title={theme === "dark" ? "Switch to light" : "Switch to dark"}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
              </>
            )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};
