import React, { useState, useEffect } from "react";
import { db, storage } from "../../firebase";
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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { SearchBar } from "../_component_/SearchBar";

export const Blog = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const postsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPosts(postsData);
    console.log("Fetched posts:", posts);
  };

  // Post submit handler
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

  useEffect(() => {
    fetchPosts();
  }, []);

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
      <div className=" w-full min-h-screen">
        <div className="  bg-gradient-to-br from-green-100 via-white mt-4 to-green-50  w-full text-center  flex items-center justify-center  py-30  pb-40">
          <div className="text-center w-7xl flex items-center justify-center    flex-col  mb-10">
            <h1 className=" font-bold text-gray-800 mb-2">
              <span className="text-5xl font-bold text-gray-800 ">
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
        <div className="w-7xl mx-auto p-4 mt-20 relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white hover:border-green-200 border-gray-200 shadow-sm border rounded-xl p-5 transition-transform duration-300 ease-in-out   hover:shadow-lg hover:scale-105"
              >
                {/* Category + Read Time */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full">
                    {post.category || "General"}
                  </span>
                  <span className="text-gray-400 text-xs">8 min read</span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4">
                  {post.content.slice(0, 100)}...
                </p>

                {/* Author + Date */}
                <div className="text-xs text-gray-500 mb-3">
                  <span>By {post.authorEmail}</span> •{" "}
                  <span>{post.createdAt?.toDate().toLocaleDateString()}</span>
                </div>

                {/* Read More Button */}
                <button className="text-sm text-white bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded-full">
                  Read Article →
                </button>
              </div>
            ))}
          </div>

          {/* Floating Button */}
          {user && (
            <button
              className="fixed bottom-6 right-6 bg-green-600 text-white rounded-full w-14 h-14 shadow-lg hover:bg-green-700 text-2xl"
              onClick={() => setShowForm(true)}
            >
              +
            </button>
          )}

          {/* Upload Form Modal */}
          {showForm && (
            <div className="fixed inset-0 backdrop-blur-sm  flex justify-center bg-[#00000040] items-center z-50">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                <h2 className="text-center bg-yellow-600 font-bold mb-4">Create New Post</h2>
                <form onSubmit={handlePostSubmit}>
                  <input
                    type="text"
                    placeholder="Post Title"
                    className="w-full mb-3 p-2 border focus:outline-none focus:shadow-sm focus:shadow-green-600 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <textarea
                    placeholder="Post Content"
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
                      className="text-gray-500   hover:bg-gray-800 rounded hover:text-white px-3"
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
