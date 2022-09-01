import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./assets/stylesheet.scss";
import "./components/dropdown/dropdown.scss";
import "./components/navbar/navbar.scss";
import "./components/sidebar/sidebar.scss";
import "./components/main/main.scss";
import "./components/dictionary/dictionary.scss";
import "./components/welcome/welcome.scss";
import "./components/range/range.scss";
import "./components/dropdown1/dropdown1.scss";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root"))
.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
);