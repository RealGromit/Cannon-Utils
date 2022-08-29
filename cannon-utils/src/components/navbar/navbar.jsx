import React from "react";
import { appWindow } from "@tauri-apps/api/window";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import {
  setSidebarMoving,
  setSidebarState,
  sidebarMoving,
  sidebarState,
} from "../sidebar/sidebar";

export default function Navbar() {
  const barsClicked = () => {
    if (sidebarMoving) return;
    setSidebarState(!sidebarState);
    setSidebarMoving(true);
    const sidebar = document.querySelector(".sidebar");
    const main = document.querySelector(".main");

    sidebar.classList.toggle("expand");
    main.classList.toggle("collapse");

    if (sidebarState) {
      setTimeout(() => {
        sidebar.querySelectorAll(".button").forEach((button) => {
          button.classList.toggle("show");
        });
        setSidebarMoving(false);
      }, 200);
    } else {
      sidebar.querySelectorAll(".button").forEach((button) => {
        button.classList.remove("show");
      });
      sidebar.querySelectorAll(".wrapper1").forEach((wrapper1) => {
        wrapper1.classList.remove("show");
      });
      setTimeout(() => {
        setSidebarMoving(false);
      }, 200);
    }
  };

  return (
    <nav data-tauri-drag-region className="navbar">
      <div className="navbar-right">
        <FontAwesomeIcon
          onClick={barsClicked}
          className="navbar-bars"
          icon={faBars}
        />
        <div data-tauri-drag-region className="navbar-label">
          Cannon Utils
        </div>
      </div>
      <div data-tauri-drag-region className="navbar-buttons">
        <FontAwesomeIcon
          onClick={() => appWindow.minimize()}
          className="navbar-button"
          icon={faMinus}
        />
        <FontAwesomeIcon
          onClick={() => appWindow.close()}
          className="navbar-button"
          icon={faX}
        />
      </div>
    </nav>
  );
}
