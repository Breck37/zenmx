import React from "react";
import clsx from "clsx";
import IconStyled from "./styles";

import close from "./close/close.js";
import menu from "./menu/menu.js";

export const icons = {
  close,
  menu,
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
