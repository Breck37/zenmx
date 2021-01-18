import styled from "styled-components";

export const TableStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeate(
    ${({ raceResultsLength }) => (raceResultsLength ? raceResultsLength : 0)},
    14f
  );
`;
