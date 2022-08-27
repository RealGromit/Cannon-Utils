import React from "react";
import { useRef } from "react";

export default function Dropdown({
  name,
  buttonFontSize,
  contentFontSize,
  data,
}) {
  const dropdownHeader = useRef();
  const dropdownContent = useRef();

  const dropdownHeaderClicked = () => {
    dropdownContent.current.classList.toggle("reveal");
  };

  const dropdownEntryClicked = (event) => {
    dropdownHeader.current.innerHTML = event.target.innerHTML;
    dropdownContent.current.classList.toggle("reveal");
  };

  return (
    <div className="dropdown">
      <div
        ref={dropdownHeader}
        onClick={dropdownHeaderClicked}
        style={{ fontSize: buttonFontSize }}
        className="dropdown-header"
      >
        {name}
      </div>
      <div ref={dropdownContent} className="dropdown-content">
        {data.map((value, key) => {
          return (
            <div
              onClick={dropdownEntryClicked}
              key={key}
              style={{ fontSize: contentFontSize }}
              className="dropdown-content-entry"
            >
              {value}
            </div>
          );
        })}
      </div>
    </div>
  );
}
