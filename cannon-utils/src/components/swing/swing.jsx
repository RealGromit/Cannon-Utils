import { invoke } from "@tauri-apps/api/tauri";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import "./swing.scss";

export default function Swing() {
  const hammerAmount = useRef();
  const hammerPos = useRef();
  const hammerVel = useRef();
  const display = useRef();
  const [displayData, setDisplayData] = useState([]);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("swingData"))
  );

  useEffect(() => {
    if (localStorage.getItem("swingData") !== null) return;
    localStorage.setItem("swingData", JSON.stringify([]));
  }, []);

  const getSwing = () => {
    const splitHammer = hammerPos.current.value.trim().split(/\s+/);
    const splitHammerVel = hammerVel.current.value.trim().split(/\s+/);

    invoke("get_swing", {
      hammerAmount: Number(hammerAmount.current.value),
      hammerPos: {
        x: Number(splitHammer[0]),
        y: Number(splitHammer[1]),
        z: Number(splitHammer[2]),
      },
      hammerVel: {
        x: Number(splitHammerVel[0]),
        y: Number(splitHammerVel[1]),
        z: Number(splitHammerVel[2]),
      },
    }).then((message) => {
      const swingData = JSON.parse(localStorage.getItem("swingData"));
      swingData.unshift(message);
      localStorage.setItem("swingData", JSON.stringify(swingData));
      setHistory([...swingData]);
    });
  };

  const historyEntryClick = (event) => {
    const displayData = [];
    history.reverse();
    const index = event.target.innerHTML
      .substr(event.target.innerHTML.indexOf("#"))
      .match(/(\d+)/);
    const swingInfo = history.at(index[0] - 1);
    history.reverse();

    let projectile_positions = swingInfo.projectile.positions;
    let projectile_velocities = swingInfo.projectile.velocities;

    displayData.push("Hammer amount: " + swingInfo.hammer_amount);
    displayData.push("\nPosition trajectory");
    for (let i = 0; i < projectile_positions.length; i++) {
      displayData.push(
        `Tick ${i + 1}:\t` +
          projectile_positions[i].x +
          " " +
          projectile_positions[i].y +
          " " +
          projectile_positions[i].z
      );
    }
    displayData.push("\nVelocity trajectory");
    for (let i = 0; i < projectile_velocities.length; i++) {
      displayData.push(
        `Tick ${i + 1}:\t` +
          projectile_velocities[i].x +
          " " +
          projectile_velocities[i].y +
          " " +
          projectile_velocities[i].z
      );
    }

    display.current.innerHTML = "";
    setDisplayData(displayData);
  };

  const clearHistory = () => {
    localStorage.setItem("swingData", JSON.stringify([]));
    setHistory([]);
    setDisplayData([]);
    hammerAmount.current.value = "";
    hammerPos.current.value = "";
    hammerVel.current.value = "";
    display.current.innerHTML = "";
  };

  return (
    <div className="swing">
      <div className="swing-header">Swing Calculator</div>
      <div className="swing-content">
        <div className="swing-content-top">
          <div className="swing-content-calculator">
            <div className="swing-content-calculator-input">
              <input ref={hammerAmount} placeholder="hammer amount" />
              <input
                ref={hammerPos}
                placeholder="hammer position (79th tick)"
              />
              <input
                ref={hammerVel}
                placeholder="hammer velocity (79th tick)"
              />
            </div>
            <div className="swing-content-calculator-button-wrapper">
              <div
                onClick={getSwing}
                className="swing-content-calculator-calculate"
              >
                Calculate
              </div>
              <div
                onClick={clearHistory}
                className="swing-content-calculator-clear"
              >
                Clear
              </div>
            </div>
          </div>
          <div className="swing-content-display-wrapper">
            <div ref={display} className="swing-content-display">
              {displayData.map((value) => {
                display.current.innerHTML += value + "\n";
                return true;
              })}
            </div>
          </div>
        </div>
        <div className="swing-content-history">
          <div className="swing-content-history-wrapper">
            {history &&
              history.map((value, index) => {
                return (
                  <div key={index} className="swing-content-history-entry">
                    <div
                      onClick={historyEntryClick}
                      className="swing-content-history-entry-name"
                    >
                      #{history.length - index} - hammer: {value.hammer_amount}
                    </div>
                    <div>Max swing position: {value.projectile.position.y}</div>
                    <div>
                      Max swing velocity: {value.projectile.velocities[0].y}
                    </div>
                    <div>Calculation time: {value.elapsed}µs</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
