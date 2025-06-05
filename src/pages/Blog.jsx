import React,{useState, useEffect}  from "react";
import { db } from "../../firebase";
import { collection, addDoc, getDocs, query, orderBy, serverTimestamp} from "firebase/firestore";
import { useAuth } from "../Context/AuthContext";
import { Nav } from ""

export const Blog = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const postsData = querySnapshot.docs.map(doc => ({
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
      fetchPosts();
    } catch (err) {
      console.error("Error adding post:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 mt-10 relative">
      <h1 className="text-3xl font-bold mb-6">Latest Blog Posts</h1>

      {posts.map((post) => (
        <div key={post.id} className="border-b pb-4 mb-6">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-600 text-sm mb-2">
            by {post.authorEmail} • {post.createdAt?.toDate().toLocaleDateString()}
          </p>
          <p>{post.content.slice(0, 150)}...</p>
        </div>
      ))}

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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <h2 className="text-xl font-semibold mb-4">Create New Post</h2>
            <form onSubmit={handlePostSubmit}>
              <input
                type="text"
                placeholder="Post Title"
                className="w-full mb-3 p-2 border rounded"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Post Content"
                className="w-full mb-4 p-2 border rounded min-h-[120px]"
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
                  className="text-gray-500 hover:text-gray-800"
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
  );
  

}