import styled from 'styled-components';

export const RiderRowStyled = styled.div`
  border: solid 1px ${({ currentMode }) => (currentMode ? '#282828' : '#fff')};
  border-bottom: none;
  grid-column: 1 / 8;
  grid-row: ${({ row }) => row};
  display: flex;
  align-items: center;
  height: 48px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 8px rgba(0, 0, 0, 0.08);
  background-color: ${({ highlight }) => (highlight ? `rgba(${highlight}, 1)` : 'transparent')};
  color: ${({ currentMode, highlight }) => (currentMode || highlight ? '#282828' : '#fff')};

  &:last-child {
    border-bottom: 1px solid
      ${({ currentMode }) => (currentMode ? '#282828' : '#fff')};
  }

  &:hover {
    background-color: ${({ onClick, highlight }) => (onClick && !highlight
    ? 'rgba(0, 0, 0, 0.4)'
    : onClick && highlight
      ? `rgba(${highlight}, 0.4)`
      : 'transparent')};
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

  @media (max-width: 500px) {
    .team {
      display: none;
    }

    .bestLap {
      display: none;
    }

    .lastLap {
      display: none;
    }

    .currentLap {
      display: none;
    }
  }
`;
