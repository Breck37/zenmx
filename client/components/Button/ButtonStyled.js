import styled from "styled-components";
import { MODERN_PURPLE, MODERN_WHITE } from "../../styles/colors";

export default styled.div`
  background-color: ${({ disabled, currentMode }) =>
    disabled && currentMode ? "rgba(0, 0, 0, 0.2)" : MODERN_PURPLE};
  border-radius: 4px;
  text-align: center;
  width: 50%;

  .MuiButton-root {
    color: ${MODERN_WHITE};
    padding: 9px 16px;
  }

  @media (max-width: 500px) {
    width: ${({ small }) => (small ? "75%" : "100%")};
  } ;
`;
