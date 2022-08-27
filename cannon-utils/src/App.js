import React from "react";
import Main from "./components/main/main";
import Navbar from "./components/navbar/navbar";
import Sidebar from "./components/sidebar/sidebar";

export default function App() {
    return (
        <>
            <Navbar />
            <Sidebar />
            <Main />
        </>
    );
}