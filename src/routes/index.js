import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage"; // adjust the path if needed

const PageRouting = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    {/* Add other public routes if you want */}
  </Routes>
);

export default PageRouting;
