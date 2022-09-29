import { invoke } from "@tauri-apps/api/tauri";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import "./splitter.scss";

export default function Splitter() {
  const hammerPos = useRef();
  const hammerVel = useRef();
  const splitterAmount = useRef();
  const splitterPos = useRef();
  const splitterVel = useRef();
  const splitterBeforeHammer = useRef();
  const sandPos = useRef();
  const sandVel = useRef();
  const display = useRef();
  const [displayData, setDisplayData] = useState([]);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("splitterData"))
  );

  useEffect(() => {
    if (localStorage.getItem("splitterData") !== null) return;
    localStorage.setItem("splitterData", JSON.stringify([]));
  }, []);

  const getSplitter = () => {
    const splitHammer = hammerPos.current.value.trim().split(/\s+/);
    const splitHammerVel = hammerVel.current.value.trim().split(/\s+/);
    const splitSplitter = splitterPos.current.value.trim().split(/\s+/);
    const splitSplitterVel = splitterVel.current.value.trim().split(/\s+/);
    const splitSand = sandPos.current.value.trim().split(/\s+/);
    const splitSandVel = sandVel.current.value.trim().split(/\s+/);

    invoke("get_splitter", {
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
      splitterAmount: Number(splitterAmount.current.value),
      splitterPos: {
        x: Number(splitSplitter[0]),
        y: Number(splitSplitter[1]),
        z: Number(splitSplitter[2]),
      },
      splitterVel: {
        x: Number(splitSplitterVel[0]),
        y: Number(splitSplitterVel[1]),
        z: Number(splitSplitterVel[2]),
      },
      splitterBeforeHammer: Number(splitterBeforeHammer.current.value),
      sandPos: {
        x: Number(splitSand[0]),
        y: Number(splitSand[1]),
        z: Number(splitSand[2]),
      },
      sandVel: {
        x: Number(splitSandVel[0]),
        y: Number(splitSandVel[1]),
        z: Number(splitSandVel[2]),
      },
    }).then((message) => {
      console.log(message);
      const splitterData = JSON.parse(localStorage.getItem("splitterData"));
      splitterData.unshift(message);
      localStorage.setItem("splitterData", JSON.stringify(splitterData));
      setHistory([...splitterData]);
    });
  };

  const historyEntryClick = (event) => {
    const displayData = [];
    history.reverse();
    const index = event.target.innerHTML
      .substr(event.target.innerHTML.indexOf("#"))
      .match(/(\d+)/);
    const splitterInfo = history.at(index[0] - 1);
    history.reverse();

    let hammer_positions = splitterInfo.hammer.positions;
    let hammer_velocities = splitterInfo.hammer.velocities;
    let sand_positions = splitterInfo.sand.positions;
    let sand_velocities = splitterInfo.sand.velocities;

    displayData.push("Splitter amount: " + splitterInfo.splitter_amount);
    displayData.push(
      "Ticks before hammer: " + splitterInfo.splitter_before_hammer
    );
    displayData.push("\nHammer position trajectory");
    for (let i = 0; i < hammer_positions.length; i++) {
      displayData.push(
        `Tick ${i + 1}:\t` +
          hammer_positions[i].x +
          " " +
          hammer_positions[i].y +
          " " +
          hammer_positions[i].z
      );
    }
    displayData.push("\nHammer velocity trajectory");
    for (let i = 0; i < hammer_velocities.length; i++) {
      displayData.push(
        `Tick ${i + 1}:\t` +
          hammer_velocities[i].x +
          " " +
          hammer_velocities[i].y +
          " " +
          hammer_velocities[i].z
      );
    }
    displayData.push("\nSand position trajectory");
    for (let i = 0; i < sand_positions.length; i++) {
      displayData.push(
        `Tick ${i + 1}:\t` +
          sand_positions[i].x +
          " " +
          sand_positions[i].y +
          " " +
          sand_positions[i].z
      );
    }
    displayData.push("\nSand velocity trajectory");
    for (let i = 0; i < sand_velocities.length; i++) {
      displayData.push(
        `Tick ${i + 1}:\t` +
          sand_velocities[i].x +
          " " +
          sand_velocities[i].y +
          " " +
          sand_velocities[i].z
      );
    }

    display.current.innerHTML = "";
    setDisplayData(displayData);
  };

  const clearHistory = () => {
    localStorage.setItem("splitterData", JSON.stringify([]));
    setHistory([]);
    setDisplayData([]);
    hammerPos.current.value = "";
    hammerVel.current.value = "";
    splitterAmount.current.value = "";
    splitterPos.current.value = "";
    splitterVel.current.value = "";
    splitterBeforeHammer.current.value = "";
    sandPos.current.value = "";
    sandVel.current.value = "";
    display.current.innerHTML = "";
  };

  return (
    <div className="splitter">
      <div className="splitter-header">Splitter Calculator</div>
      <div className="splitter-content">
        <div className="splitter-content-top">
          <div className="splitter-content-calculator">
            <div className="splitter-content-calculator-input">
              <input ref={hammerPos} placeholder="hammer position" />
              <input ref={hammerVel} placeholder="hammer velocity" />
              <input ref={splitterAmount} placeholder="splitter amount" />
              <input ref={splitterPos} placeholder="splitter position" />
              <input ref={splitterVel} placeholder="splitter velocity" />
              <input
                ref={splitterBeforeHammer}
                placeholder="splitter ticks before hammer"
              />
              <input ref={sandPos} placeholder="sand position" />
              <input ref={sandVel} placeholder="sand velocity" />
            </div>
            <div className="splitter-content-calculator-button-wrapper">
              <div
                onClick={getSplitter}
                className="splitter-content-calculator-calculate"
              >
                Calculate
              </div>
              <div
                onClick={clearHistory}
                className="splitter-content-calculator-clear"
              >
                Clear
              </div>
            </div>
          </div>
          <div className="splitter-content-display-wrapper">
            <div ref={display} className="splitter-content-display">
              {displayData.map((value) => {
                display.current.innerHTML += value + "\n";
                return true;
              })}
            </div>
          </div>
        </div>
        <div className="splitter-content-history">
          <div className="splitter-content-history-wrapper">
            {history &&
              history.map((value, index) => {
                return (
                  <div key={index} className="splitter-content-history-entry">
                    <div
                      onClick={historyEntryClick}
                      className="splitter-content-history-entry-name"
                    >
                      #{history.length - index} - splitter:{" "}
                      {value.splitter_amount} - ticks before hammer:{" "}
                      {value.splitter_before_hammer}
                    </div>
                    <div>Hammer y position: {value.hammer.position.y}</div>
                    <div>Sand y position: {value.sand.position.y}</div>
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
