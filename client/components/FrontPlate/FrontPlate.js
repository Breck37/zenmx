import React from "react";
import FrontPlateIcon from "./FrontPlate.svg";
import { FrontPlateStyled } from "./styles";
import manufacturers from "../../constants/manufacturers";

const FrontPlate = ({ fill = "red", height = 150, width = 150, rider }) => {
  return (
    <FrontPlateStyled
      height={height}
      width={width}
      color={manufacturers[rider.bike.toLowerCase()].color}
    >
      <FrontPlateIcon fill={fill} />
      <div className="number-wrap">1</div>
    </FrontPlateStyled>
  );
};

export default FrontPlate;
