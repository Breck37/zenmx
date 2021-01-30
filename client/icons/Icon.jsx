import React from "react";
import clsx from "clsx";
import IconStyled from "./styles";

import close from "./Close/Close.svg";

export const icons = {
  close,
};

export default function Icon({ color, size, name }) {
  if (!name || !icons[name]) return null;

  const SvgComponent = icons[name];

  return (
    <IconStyled
      className={clsx("standard-icon", name)}
      iconColor={color}
      iconSize={size}
    >
      <SvgComponent />
    </IconStyled>
  );
}
