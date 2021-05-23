import styled from 'styled-components';
import { MODERN_PURPLE } from '../../styles/colors';

export default styled.div`
  box-sizing: border-box;
  height: 500px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(10, 1fr);

  .rider {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
  }

  .first-user {
    grid-column: 2;
    grid-row: 3;
  }

  .section.one {
    grid-row: 7 / span 4;
    grid-column: 2;
    background-color: #daa520;
  }

  .second-user {
    grid-column: 1;
    grid-row: 4;
  }

  .section.two {
    grid-column: 1;
    background-color: silver;
    grid-row: 8 / span 3;
  }

  .third-user {
    grid-column: 3;
    grid-row: 5;
  }

  .section.three {
    grid-column: 3;
    background-color: #cd7f32 ;
    grid-row 9 / span 2;
  }

  .spot {
    padding-top: 16px;
    font-size: 64px;
    text-align: center;
  }
`;
