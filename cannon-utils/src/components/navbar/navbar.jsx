import React from "react";
import { appWindow } from "@tauri-apps/api/window";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <nav data-tauri-drag-region className="navbar">
      <div className="navbar-right">
        <FontAwesomeIcon className="navbar-bars" icon={faBars} />
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
