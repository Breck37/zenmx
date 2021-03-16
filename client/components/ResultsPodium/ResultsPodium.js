import React, { useState } from "react";
import TopFiveStyled from "./styles";

export default function ResultsPodium({ riders }) {
  const ridersToDisplay = riders
    .sort((riderA, riderB) => riderA.position - riderB.position)
    .reverse();
  console.log({ riders });
  return (
    <TopFiveStyled>
      <h1>Results Podium</h1>

      <section className="podium-container-top">
        {ridersToDisplay.map((rider) => (
          <div
            key={`${rider.number}-${rider.position}`}
            className={rider.position}
          >
            {rider.name}
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
    </TopFiveStyled>
  );
}
