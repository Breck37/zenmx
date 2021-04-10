import React from "react";
import ButtonStyled from "./ButtonStyled";
import { Button } from "@material-ui/core";
const ModernButton = ({ label, onClick, disabled, small }) => {
  return (
    <ButtonStyled disabled={disabled} onClick={onClick} small={small}>
      <Button disabled={disabled}>{label}</Button>
    </ButtonStyled>
  );
};

export default ModernButton;
