import {React, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {useAuth} from "../Context/AuthContext"
import { Nav } from "../Home/Nav";


const Login = () => {

const { login } =  useAuth()
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


const handleLogin = async (e) => {
e.preventDefault();

try {
  await login(email, password);
  alert("welcome back to SayNaira")
  
} catch (err) {

  console.log(err.message)
  
}


}




   return (
    <>
    <Nav/>
      <div className="flex justify-center items-center min-h-screen ">
        <form
        onSubmit={handleLogin}
          action="Login"
          className="p-8 border border-gray-600 rounded-lg  min-w-[400px] mx-auto bg-white  shadow-md "
        >
          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
                   <div className="mb-4">
            <label
              className="block mb-2  font-medium text-gray-700"
              htmlFor="Email"
            >
              Email
            </label>

            <input
            onChange={(e) => setEmail(e.target.value) }
            required
              type="Email"
              id="Email"
              name="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none   focus:shadow-green-400 focus:shadow-sm mb-4"
            />
          </div>
           <div className="mb-4">
            <label
              className="block mb-2  font-medium text-gray-700"
              htmlFor="Password"
            >
              Password
            </label>

            <input
                onChange={(e) => setPassword(e.target.value) }
                required
              type="Password"
              id="Password"
              name="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:shadow-green-400 focus:shadow-sm smb-4"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 pt-4  rounded bg-green-600 cursor:pointer text-white font-bold hover:bg-green-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
