import styled from "styled-components";

export default styled.div`
  margin: 150px 0 0;
  width: 100vw;
  min-height: 100%;
  overflow: hidden;
  background-color: ${({ currentMode }) => (currentMode ? "#fff" : "#282828")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({ currentMode }) => (currentMode ? "#282828" : "#fff")};

  .team-submit-success {
    height: 24px;
    font-ize: 18px;
    color: limegreen;
  }

  .team-save-button: {
    margin-top: 8px;
  }

  .unavailable {
    background-color: ${({ currentMode }) =>
      currentMode ? "#fff" : "#282828"};
    text-align: center;
    color: ${({ currentMode }) => (currentMode ? "#282828" : "#fff")};
  }
`;
