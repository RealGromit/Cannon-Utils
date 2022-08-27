import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCalculator,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  let navigate = useNavigate();
  function routeDictionary() {
    navigate("/dictionary");
  }
  function routeRange() {
    navigate("/range");
  }

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
            <div className="sub-button">Swing</div>
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
