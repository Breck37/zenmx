import { rgbToHex } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import styled from "styled-components";

// const backgroundColors = {
//   yamaha: "rgba(0,0,207, 0.8)",
//   kawasaki: "rgba(96, 255, 0, 0.6)",
// };
// background-color: ${({ bike }) => backgroundColors[bike]};

export const TableStyled = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(
    ${({ raceResultsLength }) =>
      raceResultsLength ? raceResultsLength + 1 : 0},
    48px
  );
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 8px rgba(0, 0, 0, 0.08);

  > div:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  > div:nth-child(2) {
    border-top-left-radius: ${({ hasOverlay }) => (hasOverlay ? "8px" : 0)};
    border-top-right-radius: ${({ hasOverlay }) => (hasOverlay ? "8px" : 0)};
  }

  > div:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  .overlay {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    width: 100%;
    height: 100%;

    .icon-wrap {
      padding: 24px;
      cursor: pointer;
      float: right;
    }

    .overlay-content {
      margin: 88px 24px 24px;
      background-color: #fff;
      position: absolute;
      top: 8px;
      right: 24px;
      left: 24px;
      bottom: 24px;
    }
  }
`;
