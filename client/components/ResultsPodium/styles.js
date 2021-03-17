import styled from "styled-components";

export default styled.div`
  .podium-container-top {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(7, 1fr);

    > div {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .seven {
      grid-row: 6;
      grid-column: 7;
      border: solid 1px black;
    }

    .six {
      grid-row: 6;
      grid-column: 6;
      border: solid 1px black;
    }

    .five {
      grid-row: 5;
      grid-column: 1;
      border: solid 1px black;
    }

    .four {
      grid-row: 4;
      grid-column: 2;
      border: solid 1px black;
    }

    .three {
      grid-row: 3;
      grid-column: 3;
      border: solid 1px black;
    }

    .two {
      grid-row: 2;
      grid-column: 4;
      border: solid 1px black;
    }

    .one {
      grid-row: 1;
      grid-column: 5;
      border: solid 1px black;
    }
  }
  .podium-container {
    min-height: ${({ shouldShowSmallPlate }) =>
      shouldShowSmallPlate ? "100" : "250"}px;
    display: grid;
    grid-template-rows: repeat(7, 1fr);
    grid-template-columns: repeat(7, 1fr);

    > div {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${({ currentMode }) =>
        currentMode ? "#fff" : "#282828"};
      color: ${({ currentMode }) => (currentMode ? "#282828" : "aqua")};
      font-size: 24px;
      text-shadow: 0 0 1px aqua, 0 1px 1px #000, 0 1px 1px #000,
      1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000,
      1px 1px 1px #000, 1px 1px 1px #000, 1px 1px 1px #000;
    }

    .seven {
      grid-row: 6 / span 2;
      grid-column: 7;
      border: solid 1px black;
    }

    .six {
      grid-row: 6 / span 2;
      grid-column: 6;
      border: solid 1px black;
    }

    .five {
      grid-row: 5 / span 3;
      grid-column: 1;
      border: solid 1px black;
    }

    .four {
      grid-row: 4 / span 4;
      grid-column: 2;
      border: solid 1px black;
    }

    .three {
      grid-row: 3 / span 5;
      grid-column: 3;
      border: solid 1px black;
    }

    .two {
      grid-row: 2 / span 6;
      grid-column: 4;
      border: solid 1px black;
    }

    .one {
      grid-row: 1 / span 7;
      grid-column: 5;
      border: solid 1px black;
    }
  }
    @media (screen and max-width: 500px) {
    .podium-container-top {
      > div {
        text-align: center;

        border: solid 1px black;
      }
    }
`;
