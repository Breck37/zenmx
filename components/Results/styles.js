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

export const RiderRowStyled = styled.div`
  border: solid 1px #000;
  border-bottom: none;
  grid-column: 1 / 8;
  grid-row: ${({ row }) => row};
  display: flex;
  align-items: center;
  height: 48px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 8px rgba(0, 0, 0, 0.08);

  &:last-child {
    border-bottom: 1px solid #000;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.4);
  }

  > div {
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 8px;
  }

  .position {
    grid-column: 1 / 1;
    flex: 0.25;
  }

  .name {
    grid-column: 2 / 1;
    flex: 1;
  }

  .number {
    grid-column: 3 / 1;
    flex: 0.25;
  }

  .team {
    grid-column: 4 / 1;
    flex: 1;
    padding-right: 8px;
    max-width: 242px;

    > div {
      overflow: hidden;
      max-width: 215px;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .bestLap {
    grid-column: 5 / 1;
    flex: 0.5;
  }

  .lastLap {
    grid-column: 6 / 1;
    flex: 0.5;
  }

  .currentLap {
    grid-column: 7 / 1;
    flex: 0.25;
  }
`;
