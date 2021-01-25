import styled from "styled-components";

export default styled.div`
  width: 100vw;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: flex;

  .logo-container {
    width: 40%;
    filter: drop-shadow(-1px 6px 3px rgba(0, 0, 0, 0.4));
    display: inherit;
    align-items: center;
    justify-content: center;

    .logo-wrap {
      width: 100%;
      color: aqua;
      background-color: white;
      height: 96px;
      z-index: 1000;
      display: inherit;
      align-items: center;
      justify-content: center;
      font-size: 64px;
      font-family: Arial, serif;
      clip-path: polygon(0 0, 100% 0, 86% 100%, 0 100%);

      > span {
        margin-right: 32px;
        text-shadow: 0 0 1px aqua, 0 1px 1px aqua, 0 2px 1px aqua,
          1px 1px 1px aqua, 1px 2px 1px aqua, 1px 3px 1px aqua, 2px 1px 1px aqua,
          2px 2px 1px aqua, 2px 3px 1px aqua;
      }
    }
  }

  .tabs {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 96px;
  }
`;
