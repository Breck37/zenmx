import styled from 'styled-components';
import {
  MODERN_AQUA,
  MODERN_PURPLE,
  MODERN_WHITE,
  MODERN_GREY,
} from '../../styles/colors';

export default styled.div`
  width: 100%;
  height: 100%;
  min-height: 75vh;
  padding-top: 32px;
  background-color: ${MODERN_PURPLE};
  color: ${MODERN_WHITE};

  display: flex;
  flex-direction: column;
  align-items: center;

  > h4 {
    font-weight: 500;
    margin: 0;
  }

  > section {
    flex: 1;
    width: calc(100% - 48px);
    padding: 32px 24px;

    display: flex;
  }

  .row {
    flex: 1;
  }

  .main {
    background-color: ${MODERN_AQUA};
  }

  .secondary {
    background-color: ${MODERN_GREY};
  }
`;
