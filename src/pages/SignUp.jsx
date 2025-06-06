import{  React, useState } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { Nav } from "../Home/Nav";

const SignUp = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
   const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password);
      alert("Signup successful! Welcome to SayNaira."); 
      navigate("/");
    } catch (err) {
      console.error("Signup failed:", err.message);
      alert("Signup failed: " + err.message);
    }
  };

  return (
    <>
    <Nav/>
    <div className="flex justify-center items-center  min-h-screen  w-full h-100vh bg-gradient-to-br from-green-50 via-white mt-4 to-white py-20 bg-gray-50">
      <form
        onSubmit={handleSignUp}
        className="p-8 border border-gray-200 rounded-lg min-w-[400px] bg-white shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:shadow-sm focus:shadow-green-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 font-medium text-gray-700"
          >
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:shadow-sm focus:shadow-green-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 font-medium text-gray-700"
          >
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:shadow-sm focus:shadow-green-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 rounded bg-green-600 text-white font-bold hover:bg-green-700 transition cursor:pointer"
        >
          Sign Up
        </button>
        <Link
          to="/Login"
          className="text-blue-500 hover:underline block text-center hover:text-purple-800 mt-4 "
        >
          <p> I already have an account </p>
        </Link>
      </form>
    </div>
    </>

  );
};

export default SignUp;
