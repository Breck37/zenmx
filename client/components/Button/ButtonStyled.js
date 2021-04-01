import styled from "styled-components";
import { MODERN_PURPLE, MODERN_WHITE } from "../../styles/colors";

export default styled.div`
  background-color: ${({ disabled }) =>
    disabled ? "rgba(0, 0, 0, 0.2)" : MODERN_PURPLE};
  border-radius: 4px;
  text-align: center;

  .MuiButton-root {
    color: ${MODERN_WHITE};
    padding: 9px 16px;
  }
`;
