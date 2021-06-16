import styled from 'styled-components';

export default styled.div`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  * {
    box-sizing: border-box;
  }
  
  .mode-container {
    position: absolute;
    top: 8px;
    right: 8px;
    height: 32px;
    width: 100px;
    background-color: ${({ currentMode }) => (currentMode ? '#fff' : '#282828')};
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > button {
      width: 100%;
      z-index: 3000;
      background: none;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: ${({ currentMode }) => (currentMode ? '#282828' : '#454dcc')};
      cursor: pointer;
      border: none;
      padding: 8px;
      outline: inherit;
    }
  }
`;
