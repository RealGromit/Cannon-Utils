import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCalculator,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export var sidebarState = false;
export var sidebarMoving = false;

export default function Sidebar() {
  let navigate = useNavigate();
  function routeDictionary() {
    navigate("/dictionary");
  }
  function routeRange() {
    navigate("/range");
  }
  function routeSwing() {
    navigate("/swing");
  }

  useEffect(() => {
    const sidebar = document.querySelector(".sidebar");
    const main = document.querySelector(".main");
    const buttons = sidebar.querySelectorAll(".button");
    sidebar.querySelectorAll(".wrapper").forEach((wrapper) => {
      const bigButton = wrapper.querySelector(".sidebar-button");
      const wrapper1 = wrapper.querySelector(".wrapper1");

      bigButton.addEventListener("click", () => {
        if (!sidebarState) {
          setSidebarMoving(true);
          sidebar.classList.toggle("expand");
          main.classList.toggle("collapse");
          setTimeout(() => {
            buttons.forEach((button) => {
              button.classList.toggle("show");
            });
            if (wrapper1 !== null) wrapper1.classList.toggle("show");
            setSidebarMoving(false);
          }, 200);
        } else {
          if (wrapper1 !== null) wrapper1.classList.toggle("show");
        }
        if (!sidebarState) setSidebarState(true);
      });
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="wrapper">
        <div className="sidebar-button">
          <div className="icon-wrapper">
            <FontAwesomeIcon className="icon" icon={faCalculator} />
          </div>
          <div className="button">Calculator</div>
        </div>
        <div className="wrapper1">
          <div className="shape"></div>
          <div className="wrapper2">
            <div onClick={routeRange} className="sub-button">
              Range
            </div>
            <div className="sub-button">Splitter</div>
            <div onClick={routeSwing} className="sub-button">
              Swing
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="sidebar-button">
          <div className="icon-wrapper">
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
          </div>
          <div className="button">Ratio Finder</div>
        </div>
        <div className="wrapper1">
          <div className="shape"></div>
          <div className="wrapper2">
            <div className="sub-button">255.0</div>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div onClick={routeDictionary} className="sidebar-button">
          <div className="icon-wrapper">
            <FontAwesomeIcon className="icon" icon={faBook} />
          </div>
          <div className="button">Dictionary</div>
        </div>
      </div>
    </div>
  );
}

export function setSidebarState(state) {
  sidebarState = state;
}

export function setSidebarMoving(state) {
  sidebarMoving = state;
}
