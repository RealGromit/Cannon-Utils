import React, { useRef, useState } from "react";
import { LineChart, XAxis, Tooltip, Line } from "recharts";
import Dropdown1 from "../dropdown1/dropdown1";
import { invoke } from "@tauri-apps/api/tauri";
import { useEffect } from "react";

export default function Range() {
  const powerAmount = useRef();
  const tickAmount = useRef();
  const power = useRef();
  const projectile = useRef();
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("rangeData"))
  );
  const [barrel, setBarrel] = useState("Barrel");
  const [isPowerDisabled, setIsPowerDisabled] = useState(false);
  const [isProjectileDisabled, setIsProjectileDisabled] = useState(false);
  const [chartData, setChartData] = useState([]);

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
    const chartData = [];
    history.reverse();
    const index = event.target.innerHTML
      .substr(event.target.innerHTML.indexOf("#"))
      .match(/(\d+)/);
    const rangeInfo = history.at(index[0] - 1);
    const distance = rangeInfo.distance_array;
    const velocity = rangeInfo.velocity_array;
    history.reverse();

    for (let i = 0; i < distance.length; i++) {
      chartData.push({
        name: i + 1,
        distance: distance.at(i),
        velocity: velocity.at(i),
      });
    }
    setChartData(chartData);
  };

  const clearHistory = () => {
    localStorage.setItem("rangeData", JSON.stringify([]));
    setHistory([]);
    setChartData([]);
    setBarrel("Barrel");
    powerAmount.current.value = "";
    tickAmount.current.value = "";
    power.current.value = "";
    projectile.current.value = "";
  };

  const getRange = () => {
    if (barrel === "Barrel") return;
    if (barrel !== "Custom") {
      invoke(`get_range_${barrel.toLocaleLowerCase().replace(/ /g, "_")}`, {
        powerAmount: Number(powerAmount.current.value),
        tickAmount: Number(tickAmount.current.value),
      }).then((message) => {
        const rangeData = JSON.parse(localStorage.getItem("rangeData"));
        rangeData.unshift(message);
        localStorage.setItem("rangeData", JSON.stringify(rangeData));
        setHistory([...rangeData]);
      });
      return;
    }

    const splitPower = power.current.value.trim().split(/\s+/);
    const splitProjectile = projectile.current.value.trim().split(/\s+/);

    if (splitPower.length !== 3 || splitProjectile.length !== 3) return;
    if (
      splitPower[0] === "" ||
      splitPower[1] === "" ||
      splitPower[2] === "" ||
      splitProjectile[0] === "" ||
      splitProjectile[1] === "" ||
      splitProjectile[2] === ""
    )
      return;

    const powerX = Number(splitPower[0]);
    const powerY = Number(splitPower[1]);
    const powerZ = Number(splitPower[2]);
    const projX = Number(splitProjectile[0]);
    const projY = Number(splitProjectile[1]);
    const projZ = Number(splitProjectile[2]);

    invoke("get_range_custom", {
      barrel: "Custom",
      powerAmount: Number(powerAmount.current.value),
      tickAmount: Number(tickAmount.current.value),
      power: {
        x: powerX,
        y: powerY,
        z: powerZ,
      },
      projectile: {
        x: projX,
        y: projY,
        z: projZ,
      },
    }).then((message) => {
      const rangeData = JSON.parse(localStorage.getItem("rangeData"));
      rangeData.unshift(message);
      localStorage.setItem("rangeData", JSON.stringify(rangeData));
      setHistory([...rangeData]);
    });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div className="tooltip-title">Tick: {label}</div>
          <div className="tooltip-label">Distance: {payload[0].value}</div>
          <div className="tooltip-label">Velocity: {payload[1].value}</div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="range">
      <div className="range-header">
        <div className="range-header-name">Range Calculator</div>
      </div>
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
            <div className="range-content-calculator-input-wrapper">
              <input ref={powerAmount} placeholder="power" />
              <input ref={tickAmount} placeholder="travel (game ticks)" />
              <input
                ref={power}
                placeholder="power position"
                disabled={isPowerDisabled}
              />
              <input
                ref={projectile}
                placeholder="projectile position"
                disabled={isProjectileDisabled}
              />
              <div className="range-content-calculator-input-wrapper-wrapper">
                <div
                  onClick={getRange}
                  className="range-content-calculator-calculate"
                >
                  Calculate
                </div>
                <div
                  onClick={clearHistory}
                  className="range-content-chart-clear"
                >
                  Clear
                </div>
              </div>
            </div>
          </div>
          <div className="range-content-chart">
            <LineChart
              width={600}
              height={340}
              data={chartData}
              margin={{ right: 20, left: 10 }}
            >
              <XAxis
                dataKey="name"
                tick={{ fill: "#D6D6D6" }}
                stroke="#D6D6D6"
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="distance"
                stroke="#ff7300"
                yAxisId={0}
              />
              <Line
                type="monotone"
                dataKey="velocity"
                stroke="#387908"
                yAxisId={1}
              />
            </LineChart>
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
                      #{history.length - index} -{" "}
                      {value.barrel.toLocaleLowerCase()} - power:{" "}
                      {value.power_amount} - ticks: {value.tick_amount}
                    </div>
                    <div>
                      Z range (blocks [chunks]): {value.z_range.toFixed(2)} [
                      {(value.z_range / 16).toFixed(2)}]
                    </div>
                    <div>
                      Y range (blocks [chunks]): {value.y_range.toFixed(2)} [
                      {(value.y_range / 16).toFixed(2)}]
                    </div>
                    <div>
                      X range (blocks [chunks]): {value.x_range.toFixed(2)} [
                      {(value.x_range / 16).toFixed(2)}]
                    </div>
                    <div>Z eff: {(value.z_eff * 100).toFixed(3)}%</div>
                    <div>Y eff: {(value.y_eff * 100).toFixed(3)}%</div>
                    <div>X eff: {(value.x_eff * 100).toFixed(3)}%</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
