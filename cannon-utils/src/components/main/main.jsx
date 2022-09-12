import React from "react";
import Dictionary from "../dictionary/dictionary";
import JsonData from "../data.json";
import Welcome from "../welcome/welcome";
import Range from "../range/range";
import { Route, Routes } from "react-router-dom";
import Swing from "../swing/swing";

export default function Main() {
  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dictionary" element={<Dictionary data={JsonData} />} />
        <Route path="/range" element={<Range />} />
        <Route path="/swing" element={<Swing />} />
      </Routes>
    </div>
  );
}
