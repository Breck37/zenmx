import React, { useState } from "react";
import ResultsPodiumStyled from "./styles";
import FrontPlate from "../FrontPlate/FrontPlate";
import FrontPlateSmall from "../FrontPlate/FrontPlateSmall";
import { useCurrentMode } from "../../hooks/currentMode";

export default function ResultsPodium({ riders, small = false }) {
  const { currentMode } = useCurrentMode();
  let shouldShowSmallPlate = false;
  const ridersToDisplay = riders
    .sort((riderA, riderB) => riderA.position - riderB.position)
    .reverse();
  console.log({ riders });

  if (window.screen.width <= 500 || small) {
    /* conditional statements */
    shouldShowSmallPlate = true;
  }
  const DisplayPlate = shouldShowSmallPlate ? FrontPlateSmall : FrontPlate;

  return (
    <ResultsPodiumStyled
      currentMode={currentMode}
      shouldShowSmallPlate={shouldShowSmallPlate}
    >
      <section className="podium-container-top">
        {ridersToDisplay.map((rider) => (
          <div
            key={`${rider.number}-${rider.position}`}
            className={rider.position}
          >
            <DisplayPlate rider={rider} />
          </div>
        ))}
      </section>
      <section className="podium-container">
        <div className="position five">5</div>
        <div className="position four">4</div>
        <div className="position three">3</div>
        <div className="position two">2</div>
        <div className="position one">1</div>
        <div className="position six">*</div>
        <div className="position seven">10</div>
      </section>
    </ResultsPodiumStyled>
  );
}
