import React from "react";
import ButtonStyled from "./ButtonStyled";
import { Button } from "@material-ui/core";
const ModernButton = ({ label, onClick, disabled }) => {
  return (
    <ButtonStyled onClick={onClick}>
      <Button disabled={disabled}>{label}</Button>
    </ButtonStyled>
  );
};

export default ModernButton;
