import { rgbToHex } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import styled from "styled-components";

// const backgroundColors = {
//   yamaha: "rgba(0,0,207, 0.8)",
//   kawasaki: "rgba(96, 255, 0, 0.6)",
// };
// background-color: ${({ bike }) => backgroundColors[bike]};

export const TableStyled = styled.div`
  width: 75%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(
    ${({ raceResultsLength }) => (raceResultsLength ? raceResultsLength : 0)},
    48px
  );
`;

export const RiderRowStyled = styled.div`
  border: solid 1px #000;
  grid-column: 1 / 8;
  grid-row: ${({ row }) => row};
  display: flex;
  align-items: center;

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
