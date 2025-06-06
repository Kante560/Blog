import React from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import { Blog } from "./pages/Blog";
import { Contact } from "./pages/Contact";
import { Marketing } from "./Home/Marketing";
import { About } from "./Home/About";
import { Chat }  from "./_component_/Chat";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketing" element={<Marketing />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/chat/:recipientId" element={<Chat />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
