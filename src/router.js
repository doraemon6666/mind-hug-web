import React from "react";
import { Routes, Route } from "react-router-dom";  // 从 react-router-dom 导入 Routes 和 Route
// import Home from "./pages/Home";  // 首页组件
import Login from "./pages/Login";  // Login
import Register from "./pages/Register"; // Register


const Router = () => {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />  {/* Login */}
      <Route path="/Register" element={<Register />} />  {/* Register */}
    </Routes>
  );
};

export default Router;
