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
import { Hero } from "./Hero"

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
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1,  x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {user && (
          <div className="container mt-[10rem] mx-auto px-4 lg:px-8 py-8 space-y-8 text-gray-900">
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
                <div className="bg-white rounded-xl shadow-md p-4">
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
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold">
                              {(u.name || u.displayName || u.email || "?")
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{u.name || u.displayName || "Unnamed"}</p>
                              <p className="text-xs text-gray-500 truncate">{u.email || "No email"}</p>
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
                <div key={kpi.label} className="bg-white rounded-xl shadow-md p-4">
                  <p className="text-sm text-gray-500">{kpi.label}</p>
                  <p className="text-2xl font-semibold text-gray-900 mt-1">{kpi.value}</p>
                </div>
              ))}
            </div>

            {/* Main grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left: Chart + Activity */}
              <div className="lg:col-span-2 space-y-6">
                {/* Campaign Performance */}
                <div className="bg-white rounded-xl shadow-md p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Campaign Performance</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <button className="px-2 py-1 rounded-md hover:bg-gray-100">7d</button>
                      <button className="px-2 py-1 rounded-md bg-gray-100">30d</button>
                      <button className="px-2 py-1 rounded-md hover:bg-gray-100">90d</button>
                    </div>
                  </div>
                  <div className="h-52 grid place-items-center text-gray-400">
                    <span>Chart placeholder</span>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-md p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">Recent Activity</h3>
                  <ul className="divide-y">
                    {[
                      "Budget increased on Campaign A (+$200)",
                      "Creative updated on Campaign B",
                      "New audience created: Tech Enthusiasts",
                    ].map((item, idx) => (
                      <li key={idx} className="py-3 text-sm text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Actions + Inbox + Segments */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl shadow-md p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">Quick Actions</h3>
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
                <div className="bg-white rounded-xl shadow-md p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Inbox</h3>
                    <Link to="/messages" className="text-sm text-indigo-600 hover:underline">Open</Link>
                  </div>
                  <ul className="space-y-3">
                    {[
                      { name: "Amaka", msg: "Can we review Campaign A?" },
                      { name: "Dele", msg: "New lead from landing page." },
                    ].map((m, i) => (
                      <li key={i} className="text-sm">
                        <p className="font-medium text-gray-800">{m.name}</p>
                        <p className="text-gray-500 truncate">{m.msg}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Audience Segments */}
                <div className="bg-white rounded-xl shadow-md p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">Top Segments</h3>
                  <div className="space-y-3">
                    {[
                      { name: "Tech Enthusiasts", size: "24.1k", growth: "+8%" },
                      { name: "Fashion Lovers", size: "12.7k", growth: "+3%" },
                    ].map((s, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-800">{s.name}</span>
                        <span className="text-gray-500">{s.size}</span>
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
         <Hero />
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
