import { invoke } from "@tauri-apps/api/tauri";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Line, LineChart, Tooltip, XAxis } from "recharts";
import "./swing.scss";

export default function Swing() {
  const hammerAmount = useRef();
  const hammerY = useRef();
  const hammerYVel = useRef();
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("swingData"))
  );
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("swingData") !== null) return;
    localStorage.setItem("swingData", JSON.stringify([]));
  }, []);

  const getSwing = () => {
    invoke("get_swing", {
      hammerAmount: Number(hammerAmount.current.value),
      hammerY: Number(hammerY.current.value),
      hammerYVel: Number(hammerYVel.current.value),
    }).then((message) => {
      const swingData = JSON.parse(localStorage.getItem("swingData"));
      swingData.unshift(message);
      localStorage.setItem("swingData", JSON.stringify(swingData));
      setHistory([...swingData]);
    });
  };

  const historyEntryClick = (event) => {
    const chartData = [];
    history.reverse();
    const index = event.target.innerHTML
      .substr(event.target.innerHTML.indexOf("#"))
      .match(/(\d+)/);
    const swingInfo = history.at(index[0] - 1);
    const position = swingInfo.position_array;
    const velocity = swingInfo.velocity_array;
    history.reverse();

    for (let i = 0; i < position.length; i++) {
      chartData.push({
        name: i + 1,
        position: position.at(i),
        velocity: velocity.at(i),
      });
    }
    setChartData(chartData);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <div className="tooltip-title">Tick: {label}</div>
          <div className="tooltip-label">Position: {payload[0].value}</div>
          <div className="tooltip-label">Velocity: {payload[1].value}</div>
        </div>
      );
    }

    return null;
  };

  const clearHistory = () => {
    localStorage.setItem("swingData", JSON.stringify([]));
    setHistory([]);
    setChartData([]);
    hammerAmount.current.value = "";
    hammerY.current.value = "";
    hammerYVel.current.value = "";
  };

  return (
    <div className="swing">
      <div className="swing-header">Swing Calculator</div>
      <div className="swing-content">
        <div className="swing-content-top">
          <div className="swing-content-calculator">
            <div className="swing-content-calculator-input">
              <input ref={hammerAmount} placeholder="hammer amount" />
              <input ref={hammerY} placeholder="hammer y on 79th tick" />
              <input
                ref={hammerYVel}
                placeholder="hammer y velocity on 79th tick"
              />
            </div>
            <div className="swing-content-calculator-button-wrapper">
              <div
                onClick={getSwing}
                className="swing-content-calculator-calculate"
              >
                Calculate
              </div>
              <div onClick={clearHistory} className="swing-content-chart-clear">
                Clear
              </div>
            </div>
          </div>
          <div className="swing-content-chart">
            <LineChart
              width={600}
              height={340}
              data={chartData}
              margin={{ right: 20, left: 10, top: 10 }}
            >
              <XAxis
                dataKey="name"
                tick={{ fill: "#D6D6D6" }}
                stroke="#D6D6D6"
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="position"
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
                    <div>
                      Max swing position:{" "}
                      {value.position_array[value.position_array.length - 1]}
                    </div>
                    <div>Max swing velocity: {value.velocity_array[0]}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
