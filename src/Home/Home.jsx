import React, { useEffect, useState } from "react";
import { Nav } from "./Nav";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Marketing } from "./Marketing";
import { About } from "./About";
import { Footer } from "../pages/Footer";
import { motion } from "framer-motion";
import { useAuth } from "../Context/AuthContext";
import { SearchBar } from "../_component_/SearchBar";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const Home = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const snap = await getDocs(collection(db, "users"));
        const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setAllUsers(list);
      } catch (e) {
        console.error("Failed to load users", e);
      }
    };
    if (user) fetchUsers();
  }, [user]);
  return (
    <>
      <Nav />

      {/* Animated gradient background */}
      <motion.div
        initial={{ backgroundPosition: "0% 50%" }}
        animate={{ backgroundPosition: "100% 50%" }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        style={{
          background:
            "linear-gradient(120deg, #bbf7d0 0%, #fff 50%, #bbf7d0 100%)",
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
        className="w-full min-h-screen mt-4 py-20 relative font-inter overflow-x-hidden overflow-visible"
      >
        {/* Responsive decorative circles, prevent overflow */}
        <div className="absolute hidden md:flex rounded-[50%] h-20 w-20 bg-green-100 left-[60vw] top-[420px] pointer-events-none -z-10 overflow-hidden max-w-[100vw] max-h-[100vh]"></div>
        <div className="absolute hidden md:flex rounded-[50%] h-24 w-24 bg-green-100 left-[80vw] top-[200px] pointer-events-none -z-10 overflow-hidden max-w-[100vw] max-h-[100vh]"></div>

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

            <div className="mt-8 flex gap-3 items-center">
              <Link to="/marketing">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-600 text-white cursor:pointer px-6 py-4     rounded-lg font-semibold shadow-md"
                >
                  Start Your Journey
                </motion.button>
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
            <div className="space-y-6 bg-white rounded-2xl shadow-2xl p-9 px-13 transform rotate-10 hover:rotate-0 active:rotate-0 transition-transform duration-500 cursor-pointer touch-manipulation">
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
                  <p className="font-semibold text-gray-800">
                    Targeted Campaigns
                  </p>
                  <p className="text-sm text-gray-500">
                    Reach the right audience
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
        {user && (
          <div className="container mx-auto px-4 lg:px-8 py-8 space-y-8 text-gray-900 dark:text-gray-100">
            {/* User Search */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Find people</h2>
              </div>
              <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users by name or email..."
              />
              {searchQuery && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Results</h3>
                  <ul className="divide-y">
                    {allUsers
                      .filter((u) => {
                        const hay = `${u.name || u.displayName || ""} ${u.email || ""}`.toLowerCase();
                        return u.id !== (user?.uid || "") && hay.includes(searchQuery.toLowerCase());
                      })
                      .slice(0, 8)
                      .map((u) => (
                        <li key={u.id} className="py-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center text-green-600 font-semibold">
                              {(u.name || u.displayName || u.email || "?")
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{u.name || u.displayName || "Unnamed"}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{u.email || "No email"}</p>
                            </div>
                          </div>
                          <Link
                            to={`/chat/${u.id}`}
                            className="shrink-0 text-sm bg-gray-900 text-white rounded-lg px-3 py-2 hover:bg-gray-800"
                            onClick={() => toast.success("Opening chat")}
                          >
                            Message
                          </Link>
                        </li>
                      ))}
                  </ul>
                  {!allUsers.some((u) => `${u.name || u.displayName || ""} ${u.email || ""}`.toLowerCase().includes(searchQuery.toLowerCase())) && (
                    <p className="text-sm text-gray-500">No users found.</p>
                  )}
                </div>
              )}
            </div>
            {/* KPIs */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { label: "Impressions", value: "128.4k" },
                { label: "Clicks", value: "9.2k" },
                { label: "CTR", value: "7.2%" },
                { label: "Spend", value: "$1,240" },
                { label: "Conversions", value: "612" },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">{kpi.label}</p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1">{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Chart + Activity */}
              <div className="lg:col-span-2 space-y-6">
                {/* Campaign Performance */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Campaign Performance</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <button className="px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">7d</button>
                      <button className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700">30d</button>
                      <button className="px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">90d</button>
                    </div>
                  </div>
                  <div className="h-52 grid place-items-center text-gray-400 dark:text-gray-500">
                    <span>Chart placeholder</span>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Recent Activity</h3>
                  <ul className="divide-y">
                    {[
                      "Budget increased on Campaign A (+$200)",
                      "Creative updated on Campaign B",
                      "New audience created: Tech Enthusiasts",
                    ].map((item, idx) => (
                      <li key={idx} className="py-3 text-sm text-gray-700 dark:text-gray-300">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Actions + Inbox + Segments */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {["New Campaign", "Boost Post", "Create Audience", "Import Contacts"].map((a) => (
                      <button
                        key={a}
                        onClick={() => toast.success(`${a} coming soon`)}
                        className="text-sm bg-gray-900 text-white rounded-lg py-2 hover:bg-gray-800"
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inbox Preview */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">Inbox</h3>
                    <Link to="/messages" className="text-sm text-indigo-600 hover:underline">Open</Link>
                  </div>
                  <ul className="space-y-3">
                    {[
                      { name: "Amaka", msg: "Can we review Campaign A?" },
                      { name: "Dele", msg: "New lead from landing page." },
                    ].map((m, i) => (
                      <li key={i} className="text-sm">
                        <p className="font-medium text-gray-800 dark:text-gray-200">{m.name}</p>
                        <p className="text-gray-500 dark:text-gray-400 truncate">{m.msg}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Audience Segments */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Top Segments</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Tech Enthusiasts", size: "24.1k", growth: "+8%" },
                      { name: "Fashion Lovers", size: "12.7k", growth: "+3%" },
                    ].map((s, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-800 dark:text-gray-200">{s.name}</span>
                        <span className="text-gray-500 dark:text-gray-400">{s.size}</span>
                        <span className="text-green-600">{s.growth}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!user && (
          <>
          <Marketing />
          <About />
          <Footer />
          </>
        )}
      </motion.div>
    </>
  );
};

export default Home;
