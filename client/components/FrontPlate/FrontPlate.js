import React from "react";
import FrontPlateIcon from "./FrontPlate.inline.svg";

const FrontPlate = ({ fill = "red" }) => {
  return (
    <div>
      <FrontPlateIcon fill={fill} />
    </div>
  );
};

export default FrontPlate;
