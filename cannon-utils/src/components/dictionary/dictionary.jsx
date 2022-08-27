import React from "react";
import { useState } from "react";

export default function Dictionary({ data }) {
  const [filteredData, setFilteredData] = useState(data);

  const handleInput = (event) => {
    const searchWord = event.target.value;
    const filter = data.filter((value) => {
      if (searchWord.length > 0 && value.name.length === 1) return false;
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    setFilteredData(filter);
  };

  return (
    <div className="dictionary">
      <div className="dictionary-navbar">
        <div className="dictionary-navbar-left">Dictionary</div>
        <div className="search-bar">
          <input
            className="input"
            onChange={handleInput}
            type="text"
            placeholder="search"
          />
        </div>
      </div>
      <div className="dictionary-content">
        {filteredData.map((value, key) => {
          if (value.name.length === 1) {
            return (
              <div
                key={key}
                style={{ display: "inline-flex" }}
                className="dictionary-entry"
              >
                <div className="dictionary-entry-name">{value.name}</div>
              </div>
            );
          } else {
            return (
              <div key={key} className="dictionary-entry">
                <div className="dictionary-entry-name">{value.name}</div>
                <div className="dictionary-entry-description">
                  {value.description}
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
