import styled from 'styled-components';
import { MODERN_WHITE } from './colors';

export default styled.div`
  margin: 150px 0 0;
  width: 100vw;
  min-height: 80vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  > h1 {
    margin: 0;
    color: ${MODERN_WHITE};
  }

  .header {
    margin-top: 24px;
  }
`;
