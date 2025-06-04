import React from "react";
import { Nav } from "./Nav";
import { Link } from "react-router-dom";
import { Marketing } from "./Marketing";
import { About } from "./About";
import { Footer } from "../pages/Footer";

const Home = () => {
  return (
    <>
      <Nav />

      <section class=" w-full h-100vh bg-gradient-to-br from-green-50 via-white mt-4 to-green-50 py-20 ">
        
    <div className="absolute hidden md:flex rounded-[50%] h-20 w-20 bg-green-100 left-[840px] top-[420px] ">
     
        </div>
        <div className="absolute hidden md:flex rounded-[50%] h-24 w-24 bg-green-100 left-[1330px] top-[200px] ">
     
        </div>
        <div class="max-w-7xl mx-auto px-6 lg:flex lg:items-center lg:justify-between">
          <div class="lg:w-1/2">
            <h1 class="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              Transform Your
              <span class="text-green-600">Marketing Thoughts</span> Into
              Reality
            </h1>
            <p class="mt-6 text-lg text-gray-600">
              At SayNaira, we turn innovative marketing ideas into powerful
              strategies that drive growth. Your success is our mission, and
              every naira invested works harder for your business.
            </p>

            <div class="mt-8 flex gap-4">
              <a
                href="#"
                class="bg-green-600 text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-green-700"
              >
                Start Your Journey
              </a>
              <a
                href="#"
                class="border border-green-600 text-green-600 px-6 py-3 rounded-md text-sm font-semibold hover:bg-green-50"
              >
                View Our Work
              </a>
            </div>

            <div class="mt-12 grid grid-cols-3 gap-6 text-center">
              <div>
                <p class="text-2xl font-bold text-green-600">200+</p>
                <p class="text-sm text-gray-500">Happy Clients</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-green-600">500%</p>
                <p class="text-sm text-gray-500">Avg ROI Increase</p>
              </div>
              <div>
                <p class="text-2xl font-bold text-green-600">5+</p>
                <p class="text-sm text-gray-500">Years Experience</p>
              </div>
            </div>
          </div>

          <div class="mt-12 lg:mt-0 lg:w-5/12 relative">

      
            <div class=" space-y-6 bg-white rounded-2xl shadow-2xl p-9 px-13 transform rotate-10 hover:rotate-0 transition-transform duration-500">
              <div class="flex items-start space-x-4">
                <div class="bg-green-100 text-green-600 p-2 rounded-md">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-800">Growth Strategy</p>
                  <p class="text-sm text-gray-500">
                    Data-driven marketing solutions
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="bg-green-100 text-green-600 p-2 rounded-md">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle cx="12" cy="12" r="3" stroke-width="2" />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-800">Targeted Campaigns</p>
                  <p class="text-sm text-gray-500">Reach the right audience</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="bg-green-100 text-green-600 p-2 rounded-md">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-800">Creative Ideas</p>
                  <p class="text-sm text-gray-500">
                    Innovative marketing thoughts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Marketing />
      <About />
      <Footer />

    </>
  );
};

export default Home;
