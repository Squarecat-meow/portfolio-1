import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./routers/Home";
import UploadComp from "./routers/UploadComp";
import UploadForm from "./routers/UploadForm";

import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/UploadComp" element={<UploadComp />}></Route>
        <Route path="/UploadForm" element={<UploadForm />}></Route>
      </Routes>
    </div>
  );
};

export default Layout;
