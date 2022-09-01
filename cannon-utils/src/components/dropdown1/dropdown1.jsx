import React from "react";
import { useRef } from "react";

export default function Dropdown1({
  name,
  buttonFontSize,
  contentFontSize,
  data,
}) {
  const dropdownHeader = useRef();
  const dropdownContent = useRef();

  const dropdownHeaderClicked = () => {
    dropdownContent.current.classList.toggle("show");
  };

  const dropdownEntryClicked = (event) => {
    dropdownHeader.current.innerHTML = event.target.innerHTML;
    dropdownContent.current.classList.toggle("show");
  };

  return (
    <div className="dropdown1">
      <div
        ref={dropdownHeader}
        onClick={dropdownHeaderClicked}
        style={{ fontSize: buttonFontSize }}
        className="dropdown1-header"
      >
        {name}
      </div>
      <div ref={dropdownContent} className="dropdown1-content">
        {data.map((value, key) => {
          return (
            <div
              onClick={dropdownEntryClicked}
              key={key}
              style={{ fontSize: contentFontSize }}
              className="dropdown1-content-entry"
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
