import React, { useRef, useState } from "react";
import Dropdown1 from "../dropdown1/dropdown1";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect } from "react";

export default function Range() {
  const powerAmount = useRef();
  const tickAmount = useRef();
  const powerPos = useRef();
  const projectilePos = useRef();
  const projectileVel = useRef();
  const display = useRef();
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("rangeData"))
  );
  const [barrel, setBarrel] = useState("Barrel");
  const [displayData, setDisplayData] = useState([]);
  const [isPowerDisabled, setIsPowerDisabled] = useState(false);
  const [isProjectileDisabled, setIsProjectileDisabled] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("rangeData") !== null) return;
    localStorage.setItem("rangeData", JSON.stringify([]));
  }, []);

  const dropdownChange = (event) => {
    if (event.target.className !== "dropdown1-content-entry") return;
    if (event.target.innerHTML !== "Custom") {
      setIsPowerDisabled(true);
      setIsProjectileDisabled(true);
    } else {
      setIsPowerDisabled(false);
      setIsProjectileDisabled(false);
    }

    setBarrel(event.target.innerHTML);
  };

  const historyEntryClick = (event) => {
    const displayData = [];
    history.reverse();
    const index = event.target.innerHTML
      .substr(event.target.innerHTML.indexOf("#"))
      .match(/(\d+)/);
    const rangeInfo = history.at(index[0] - 1);
    history.reverse();

    let positions = rangeInfo.projectile.positions;
    let velocities = rangeInfo.projectile.velocities;

    displayData.push("Barrel: " + rangeInfo.barrel.toLocaleLowerCase());
    displayData.push("Power amount: " + rangeInfo.power_amount);
    displayData.push("Tick amount: " + rangeInfo.tick_amount);
    displayData.push(
      "Range: " +
        positions[0].x +
        " " +
        positions[0].y +
        " " +
        rangeInfo.projectile.position.z
    );
    displayData.push(
      "Efficiency: " +
        rangeInfo.efficiency.x +
        " " +
        rangeInfo.efficiency.y +
        " " +
        rangeInfo.efficiency.z
    );
    displayData.push("\nPosition trajectory with guiders");
    for (let i = 0; i < positions.length; i++) {
      displayData.push(
        `Tick ${i + 1}:\t` +
          positions[i].x +
          " " +
          positions[i].y +
          " " +
          positions[i].z
      );
    }
    displayData.push("\nVelocity trajectory with guiders");
    for (let i = 0; i < velocities.length; i++) {
      displayData.push(
        `Tick ${i + 1}:\t` +
          velocities[i].x +
          " " +
          velocities[i].y +
          " " +
          velocities[i].z
      );
    }

    display.current.innerHTML = "";
    setDisplayData(displayData);
  };

  const clearHistory = () => {
    localStorage.setItem("rangeData", JSON.stringify([]));
    setHistory([]);
    setBarrel("Barrel");
    setDisplayData([]);
    powerAmount.current.value = "";
    tickAmount.current.value = "";
    powerPos.current.value = "";
    projectilePos.current.value = "";
    projectileVel.current.value = "";
    display.current.innerHTML = "";
  };

  const getRange = () => {
    if (barrel === "Barrel") return;
    if (barrel !== "Custom") {
      const splitProjectileVel = projectileVel.current.value
        .trim()
        .split(/\s+/);

      invoke(`get_range_${barrel.toLocaleLowerCase().replace(/ /g, "_")}`, {
        powerAmount: Number(powerAmount.current.value),
        tickAmount: Number(tickAmount.current.value),
        projectileVel: {
          x: Number(splitProjectileVel[0]),
          y: Number(splitProjectileVel[1]),
          z: Number(splitProjectileVel[2]),
        },
      }).then((message) => {
        const rangeData = JSON.parse(localStorage.getItem("rangeData"));
        rangeData.unshift(message);
        localStorage.setItem("rangeData", JSON.stringify(rangeData));
        setHistory([...rangeData]);
      });
      return;
    }

    const splitPowerPos = powerPos.current.value.trim().split(/\s+/);
    const splitProjectilePos = projectilePos.current.value.trim().split(/\s+/);
    const splitProjectileVel = projectileVel.current.value.trim().split(/\s+/);

    invoke("get_range_custom", {
      barrel: "Custom",
      powerAmount: Number(powerAmount.current.value),
      tickAmount: Number(tickAmount.current.value),
      powerPos: {
        x: Number(splitPowerPos[0]),
        y: Number(splitPowerPos[1]),
        z: Number(splitPowerPos[2]),
      },
      projectilePos: {
        x: Number(splitProjectilePos[0]),
        y: Number(splitProjectilePos[1]),
        z: Number(splitProjectilePos[2]),
      },
      projectileVel: {
        x: Number(splitProjectileVel[0]),
        y: Number(splitProjectileVel[1]),
        z: Number(splitProjectileVel[2]),
      },
    }).then((message) => {
      const rangeData = JSON.parse(localStorage.getItem("rangeData"));
      rangeData.unshift(message);
      localStorage.setItem("rangeData", JSON.stringify(rangeData));
      setHistory([...rangeData]);
    });
  };

  return (
    <div className="range">
      <div className="range-header">Range Calculator</div>
      <div className="range-content">
        <div className="range-content-top">
          <div onClick={dropdownChange} className="range-content-calculator">
            <Dropdown1
              name={barrel}
              buttonFontSize={14}
              contentFontSize={12}
              data={[
                "Stair",
                "Trapdoor",
                "Cobblestone Wall",
                "Ladder",
                "Chest",
                "Custom",
              ]}
            />
            <div className="range-content-calculator-input">
              <input ref={powerAmount} placeholder="power amount" />
              <input ref={tickAmount} placeholder="tick amount" />
              <input
                ref={powerPos}
                disabled={isPowerDisabled}
                placeholder="power position"
              />
              <input
                ref={projectilePos}
                disabled={isProjectileDisabled}
                placeholder="projectile position"
              />
              <input ref={projectileVel} placeholder="projectile velocity" />
            </div>
            <div className="range-content-calculator-button-wrapper">
              <div
                onClick={getRange}
                className="range-content-calculator-calculate"
              >
                Calculate
              </div>
              <div
                onClick={clearHistory}
                className="range-content-calculator-clear"
              >
                Clear
              </div>
            </div>
          </div>
          <div className="range-content-display-wrapper">
            <div ref={display} className="range-content-display">
              {displayData.map((value) => {
                display.current.innerHTML += value + "\n";
                return true;
              })}
            </div>
          </div>
        </div>
        <div className="range-content-history">
          <div className="range-content-history-wrapper">
            {history &&
              history.map((value, index) => {
                return (
                  <div key={index} className="range-content-history-entry">
                    <div
                      onClick={historyEntryClick}
                      className="range-content-history-entry-name"
                    >
                      #{history.length - index} - power: {value.power_amount} -
                      ticks: {value.tick_amount}
                    </div>
                    <div>X range: {value.projectile.positions[0].x}</div>
                    <div>Y range: {value.projectile.positions[0].y}</div>
                    <div>Z range: {value.projectile.position.z}</div>
                    <div>X eff: {value.efficiency.x}</div>
                    <div>Y eff: {value.efficiency.y}</div>
                    <div>Z eff: {value.efficiency.z}</div>
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
