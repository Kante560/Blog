import React from "react";
import { Megaphone, ArrowRight, BarChart2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Nav } from "./Nav";
import { Footer } from "../pages/Footer";
import { motion } from "framer-motion";

export const Marketing = () => {
  return (
    <>
      <Nav />
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex justify-center items-center  w-full  mt-15 bg-white">
          <div className="text-center max-w-[50rem] flex justify-center items-center flex-col mt-10 mb-6">
            <h1 className=" font-bold text-gray-800 mb-2">
              <span className="text-4xl font-bold text-gray-800 ">
                Our Marketing
              </span>
              <span className="text-4xl font-bold text-green-600">
                {" "}
                Services
              </span>
            </h1>
            <p className="text-gray-800 text-[20px]">
              {" "}
              We offer comprehensive marketing solutions designed to grow your
              business and maximize every naira invested.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 py-10">
          <div className="group hover:border-green-200 flex flex-col border-gray-200 border-[1px] p-8  bg-white hover:shadow-lg rounded-lg h-[458px] max-w-[397.5px] mx-auto mt-10 hover:scale-105 transition-transform duration-300 ease-in-out">
            <Megaphone className="w-14 h-14 text-green-600 stroke-green-600 transition-colors group-hover:stroke-white group-hover:bg-green-600 bg-green-100 p-2 rounded-md" />

            <p className="text-2xl font-bold text-black my-4">
              Digital Marketing Strategy
            </p>
            <p className="text-gray-800 mb-4 max-w-[300px] leading-relaxed">
              Comprehensive digital marketing plans tailored to your business
              goals and target audience.
            </p>
            <ul className=" space-y-2 text-gray-700 mb-4">
              <div class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                SEO Optimization
              </div>

              <div class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                Social Media Strategy
              </div>

              <div class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                Content Planning
              </div>
            </ul>

            <a
              href="#"
              className="group inline-flex items-center text-green-600 group-hover:underline"
            >
              Learn more
              <ArrowRight className="w-[25px] ml-1 transition-transform duration-200 group-hover:translate-x-1 h-[14px] stroke-[1.2]" />
            </a>
          </div>

          <div className="group  hover:border-green-200  flex flex-col border-gray-200 border-[1px] p-8  bg-white hover:shadow-lg rounded-lg h-[458px] max-w-[397.5px] mx-auto mt-10 hover:scale-105 transition-transform duration-300 ease-in-out">
            <BarChart2 className="w-14 h-14 text-green-600 stroke-green-600 transition-colors group-hover:stroke-white group-hover:bg-green-600 bg-green-100 p-2 rounded-md" />

            <p className="text-2xl font-bold text-black my-4">
              Digital Marketing Strategy
            </p>
            <p className="text-gray-800 mb-4 max-w-[300px] leading-relaxed">
              Comprehensive digital marketing plans tailored to your business
              goals and target audience.
            </p>
            <ul className=" space-y-2 text-gray-700 mb-4">
              <div class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                SEO Optimization
              </div>

              <div class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                Social Media Strategy
              </div>

              <div class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                Content Planning
              </div>
            </ul>

            <a
              href="#"
              className="group inline-flex items-center text-green-600 group-hover:underline"
            >
              Learn more{" "}
              <ArrowRight className="w-[25px] ml-1 transition-transform duration-200 group-hover:translate-x-1 h-[14px] stroke-[1.2]" />
            </a>
          </div>

          <div className="group  hover:border-green-200  flex flex-col border-gray-200 border-[1px] p-8  bg-white hover:shadow-lg rounded-lg h-[458px] max-w-[397.5px] mx-auto mt-10 hover:scale-105 transition-transform duration-300 ease-in-out">
            <Users className="w-14 h-14 text-green-600 stroke-green-600 transition-colors group-hover:stroke-white group-hover:bg-green-600 bg-green-100 p-2 rounded-md" />

            <p className="text-2xl font-bold text-black my-4">
              Digital Marketing Strategy
            </p>
            <p className="text-gray-800 mb-4 max-w-[300px] leading-relaxed">
              Comprehensive digital marketing plans tailored to your business
              goals and target audience.
            </p>
            <ul className=" space-y-2 text-gray-700 mb-4">
              <div class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                SEO Optimization
              </div>

              <div class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                Social Media Strategy
              </div>

              <div class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                Content Planning
              </div>
            </ul>

            <a
              href="#"
              className="group inline-flex items-center text-green-600 group-hover:underline"
            >
              Learn more{" "}
              <ArrowRight className="w-[25px] ml-1 transition-transform duration-200 group-hover:translate-x-1 h-[14px] stroke-[1.2]" />
            </a>
          </div>

          <div className="group  hover:border-green-200  flex flex-col border-gray-200 border-[1px] p-8  bg-white hover:shadow-lg rounded-lg h-[458px] max-w-[397.5px] mx-auto mt-10 hover:scale-105 transition-transform duration-300 ease-in-out">
            <Megaphone className="w-14 h-14 text-green-600 stroke-green-600 transition-colors group-hover:stroke-white group-hover:bg-green-600 bg-green-100 p-2 rounded-md" />

            <p className="text-2xl font-bold text-black my-4">
              Digital Marketing Strategy
            </p>
            <p className="text-gray-800 mb-4 max-w-[300px] leading-relaxed">
              Comprehensive digital marketing plans tailored to your business
              goals and target audience.
            </p>
            <ul className=" space-y-2 text-gray-700 mb-4">
              <div class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                SEO Optimization
              </div>

              <div class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                Social Media Strategy
              </div>

              <div class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                Content Planning
              </div>
            </ul>

            <a
              href="#"
              className="group inline-flex items-center text-green-600 group-hover:underline"
            >
              Learn more{" "}
              <ArrowRight className="w-[25px] ml-1 transition-transform duration-200 group-hover:translate-x-1 h-[14px] stroke-[1.2]" />
            </a>
          </div>

          <div className="group  hover:border-green-200  flex flex-col border-gray-200 border-[1px] p-8  bg-white hover:shadow-lg rounded-lg h-[458px] max-w-[397.5px] mx-auto mt-10 hover:scale-105 transition-transform duration-300 ease-in-out">
            <Megaphone className="w-14 h-14 text-green-600 stroke-green-600 transition-colors group-hover:stroke-white group-hover:bg-green-600 bg-green-100 p-2 rounded-md" />

            <p className="text-2xl font-bold text-black my-4">
              Digital Marketing Strategy
            </p>
            <p className="text-gray-800 mb-4 max-w-[300px] leading-relaxed">
              Comprehensive digital marketing plans tailored to your business
              goals and target audience.
            </p>
            <ul className=" space-y-2 text-gray-700 mb-4">
              <div class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                SEO Optimization
              </div>

              <div class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                Social Media Strategy
              </div>

              <div class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                Content Planning
              </div>
            </ul>

            <a
              href="#"
              className="group inline-flex items-center text-green-600 group-hover:underline"
            >
              Learn more{" "}
              <ArrowRight className="w-[25px] ml-1 transition-transform duration-200 group-hover:translate-x-1 h-[14px] stroke-[1.2]" />
            </a>
          </div>

          <div className="group  hover:border-green-200  flex flex-col border-gray-200 border-[1px] p-8  bg-white hover:shadow-lg rounded-lg h-[458px] max-w-[397.5px] mx-auto mt-10 hover:scale-105 transition-transform duration-300 ease-in-out">
            <Megaphone className="w-14 h-14 text-green-600 stroke-green-600 transition-colors group-hover:stroke-white group-hover:bg-green-600 bg-green-100 p-2 rounded-md" />

            <p className="text-2xl font-bold text-black my-4">
              Digital Marketing Strategy
            </p>
            <p className="text-gray-800 mb-4 max-w-[300px] leading-relaxed">
              Comprehensive digital marketing plans tailored to your business
              goals and target audience.
            </p>
            <ul className=" space-y-2 text-gray-700 mb-4">
              <div class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                SEO Optimization
              </div>

              <div class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                Social Media Strategy
              </div>

              <div class="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full">
                Content Planning
              </div>
            </ul>

            <a
              href="#"
              className="group inline-flex items-center text-green-600 group-hover:underline"
            >
              Learn more
              <ArrowRight className="w-[25px] ml-1 transition-transform duration-200 group-hover:translate-x-1 h-[14px] stroke-[1.2]" />
            </a>
          </div>
        </div>

        <div className=" flex justify-center items-center mb-8 w-full  mt-4 bg-transparent ">
          <div className=" text-center py-6 w-[1222px] bg-gradient-to-r from-green-600 to-green-700 rounded-[19px] linear flex justify-center items-center flex-col mt-10 mb-6">
            <h1 className=" text-white font-bold text-[30px] mb-5">
              Ready to Transform Your Marketing?
            </h1>
            <p className="text-green-100 text-[20px] mx-auto max-w-[800px] mb-6">
              Let's discuss how our proven strategies can help your business
              grow and succeed in today's competitive market.
            </p>

            <Link to="/Consultations">
              <button className="py-4 px-6 mt-4 text-[20px] bg-white text-green-600 font-semibold rounded-lg  transition duration-300 flex items-center space-x-2 cursor-pointer ">
                Get Free Consultation
              </button>
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};
