import styled from "styled-components";
import { MODERN_PURPLE, MODERN_AQUA, MODERN_GREY } from "./colors";

export default styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    ${MODERN_PURPLE} 0%,
    rgba(0, 255, 255) 75%
  );

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .title {
    color: #fff;
    font-size: 56px;
    text-shadow: 0 0 1px aqua, 0 1px 1px #cfdced, 0 2px 1px #cfdced,
      1px 1px 1px #cfdced, 1px 2px 1px #cfdced, 1px 3px 1px #cfdced,
      2px 1px 1px #cfdced, 2px 2px 1px #cfdced, 2px 3px 1px #cfdced;
    display: flex;
    flex-direction: column;
    width: 100%;

    span:first-child {
      padding-left: 15%;
    }
    span:last-child {
      padding-left: 45%;
    }
  }

  .tagline {
    color: ${MODERN_PURPLE};
    margin-top: 32px;
    font-size: 32px;
  }

  .login-button {
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    text-decoration: none;
    width: 50%;
    padding: 16px;
    background-color: #fff;
    color: ${MODERN_PURPLE};

    position: absolute;
    bottom: 24px;
  }

  @media (min-width: 500px) {
    .title {
      flex-direction: row;
      justify-content: center;

      > span {
        width: auto;
        padding: 0 !important;
      }
    }
  } ;
`;
