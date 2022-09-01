import React, { useRef, useState } from "react";
import Dropdown1 from "../dropdown1/dropdown1";
import { invoke } from "@tauri-apps/api/tauri";

export default function Range() {
  const powerAmount = useRef();
  const tickAmount = useRef();
  const power = useRef();
  const projectile = useRef();
  const [history, setHistory] = useState([]);
  const [barrel, setBarrel] = useState("Barrel");
  const [isPowerDisabled, setIsPowerDisabled] = useState(false);
  const [isProjectileDisabled, setIsProjectileDisabled] = useState(false);

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

  const getRange = () => {
    if (barrel === "Barrel") return;
    if (barrel !== "Custom") {
      invoke(`get_range_${barrel.toLocaleLowerCase().replace(/ /g, "_")}`, {
        powerAmount: Number(powerAmount.current.value),
        tickAmount: Number(tickAmount.current.value),
      }).then((message) => {
        history.push(message);
        setHistory([...history]);
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
      history.push(message);
      setHistory([...history]);
    });
  };

  return (
    <div className="range">
      <div className="range-header">
        <div className="range-header-name">Range Calculator</div>
      </div>
      <div className="range-content">
        <div onClick={dropdownChange} className="range-content-calculator">
          <Dropdown1
            name="Barrel"
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
            <div
              onClick={getRange}
              className="range-content-calculator-calculate"
            >
              Calculate
            </div>
          </div>
        </div>
        <div className="range-content-history">
          <div className="range-content-history-wrapper">
            {history.map((value, index) => {
              return (
                <div key={index} className="range-content-history-entry">
                  <div className="range-content-history-entry-name">
                    #{++index} - {value.barrel.toLocaleLowerCase()} - power:{" "}
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
