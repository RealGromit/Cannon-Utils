import React from "react";
import Dropdown from "../dropdown/dropdown";

export default function Range() {
  return (
    <div className="range">
      <div className="range-header">
        <div className="range-header-name">Range Calculator</div>
      </div>
      <div className="range-content">
        <div className="range-content-dropdown">
          <Dropdown
            name="Barrel"
            buttonFontSize={16}
            contentFontSize={14}
            data={[
              "Stair",
              "Trapdoor",
              "Cobblestone Wall",
              "Ladder",
              "Chest",
              "Custom",
            ]}
          />
        </div>
      </div>
    </div>
  );
}
