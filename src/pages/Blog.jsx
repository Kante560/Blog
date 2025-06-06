import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "../Context/AuthContext";
import { Nav } from "../Home/Nav";
import { SearchBar } from "../_component_/SearchBar";
import { Link } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";

export const Blog = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [userStatuses, setUserStatuses] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlineUsers, setOnlineUsers] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const postsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(postsData);
    setLoading(false);
  };

  useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "status"), (snapshot) => {
    const updatedStatus = {};
    snapshot.forEach((doc) => {
      updatedStatus[doc.id] = doc.data().state === "online";
    });
    setOnlineUsers(updatedStatus);
  });

  return () => unsubscribe(); // Clean up listener on unmount
}, []);

  const fetchUserStatuses = async () => {
    const usersSnapshot = await getDocs(collection(db, "users"));
    const statusMap = {};
    usersSnapshot.forEach((doc) => {
      statusMap[doc.id] = doc.data().online;
    });
    setUserStatuses(statusMap);
  };

  useEffect(() => {
    fetchPosts();
    fetchUserStatuses();
    const interval = setInterval(fetchUserStatuses, 30000);
    return () => clearInterval(interval);
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return alert("All fields are required");

    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        authorId: user.uid,
        authorEmail: user.email,
        createdAt: serverTimestamp(),
      });
      setTitle("");
      setContent("");
      setShowForm(false);
      alert("Post added successfully");
      fetchPosts();
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };

  const filteredPosts =
    searchQuery.trim() === ""
      ? posts
      : posts.filter(
          (post) =>
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase())
        );

  return (
    <>
      <Nav />
      <div className="w-full min-h-screen">
        <div className="bg-gradient-to-br from-green-100 via-white mt-4 to-green-50 w-full text-center flex items-center justify-center py-30 pb-40">
          <div className="text-center w-7xl flex items-center justify-center flex-col mb-10">
            <h1 className="font-bold text-gray-800 mb-2">
              <span className="text-5xl font-bold text-gray-800">
                Marketing
              </span>
              <span className="text-5xl font-bold text-green-600">
                {" "}
                Insights
              </span>
            </h1>
            <p className="text-gray-800 max-w-[50rem] text-[20px]">
              Expert insights, proven strategies, and actionable tips to
              transform your marketing thoughts into profitable realities.
            </p>
            <div className="pt-8 w-full">
              <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-2 sm:p-4 mt-10 sm:mt-20 relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {loading
              ? Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="bg-white border-gray-200 shadow-sm border rounded-xl p-4 sm:p-5 animate-pulse min-h-[220px] flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                      <span className="bg-green-100 h-5 w-16 rounded-full"></span>
                      <span className="bg-gray-200 h-4 w-12 rounded"></span>
                    </div>
                    <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-100 rounded mb-4 w-full"></div>
                    <div className="h-4 bg-gray-100 rounded mb-3 w-1/2"></div>
                    <div className="h-8 bg-green-200 rounded-full w-32"></div>
                  </div>
                ))
              : filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white hover:border-green-200 border-gray-200 shadow-sm border rounded-xl p-4 sm:p-5 transition-transform duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] flex flex-col justify-between min-h-[220px]"
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
                      <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                        {post.category || "General"}
                      </span>
                      <span className="text-gray-400 text-xs">8 min read</span>
                    </div>

                    <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 break-words">
                      {post.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 break-words">
                      {post.content.slice(0, 100)}...
                    </p>

                    <div className="text-xs text-gray-500 mb-2 sm:mb-3 flex items-center flex-wrap gap-2">
                      <span className="flex items-center gap-1">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            userStatuses[post.authorId]
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                          title={
                            userStatuses[post.authorId] ? "Online" : "Offline"
                          }
                        ></span>
                        By {post.authorEmail}
                      </span>
                      •
                      <span>
                        {post.createdAt?.toDate().toLocaleDateString()}
                      </span>
                    </div>

                    {post.authorId !== user.uid && (
                      <Link
                        to={`/chat/${post.authorId}`}
                        className={`mt-2 inline-block text-sm ${
                          onlineUsers[post.authorId]
                            ? "text-green-600"
                            : "text-gray-400"
                        } hover:underline`}
                      >
                        Message Author 💬
                        {onlineUsers[post.authorId] ? "🟢" : "🔴"}
                      </Link>
                    )}
                  </div>
                ))}
          </div>

          {user && (
            <button
              className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full w-14 h-14 shadow-lg hover:bg-green-700 text-2xl"
              onClick={() => setShowForm(true)}
            >
              +
            </button>
          )}

          {showForm && (
            <div className="fixed inset-0 backdrop-blur-sm bg-[#00000040] flex justify-center items-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <h2 className="text-center text-3xl font-bold mb-4">
                  Create New Post
                </h2>
                <form onSubmit={handlePostSubmit}>
                  <input
                    type="text"
                    placeholder="Post Title"
                    className="w-full mb-3 p-2 border focus:outline-none focus:shadow-sm focus:shadow-green-600 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <textarea
                    placeholder="Post Content..."
                    className="w-full mb-4 p-2 border focus:outline-none focus:shadow-sm focus:shadow-green-600 rounded min-h-[120px]"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Publish
                    </button>
                    <button
                      type="button"
                      className="text-gray-500 hover:bg-gray-800 rounded hover:text-white px-3"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
