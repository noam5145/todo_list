import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import NotFound from "../NotFound";
import MainSite from "../comp/MainSite";

export default function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
