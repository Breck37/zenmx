import React from "react";
import FrontPlateIcon from "./Exclude.svg";
import { FrontPlateStyled } from "./styles";
import manufacturers from "../../constants/manufacturers";

const FrontPlate = ({ height = 150, width = 150, rider }) => {
  return (
    <FrontPlateStyled height={height} width={width}>
      <FrontPlateIcon fill={manufacturers[rider.bike.toLowerCase()].color} />
      <div className="number-wrap">{rider.number}</div>
    </FrontPlateStyled>
  );
};

export default FrontPlate;
