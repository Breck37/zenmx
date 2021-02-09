import styled from "styled-components";

export default styled.div`
  margin: 0;
  width: 100vw;
  min-height: 100%;
  overflow: hidden;
  background-color: ${({ currentMode }) => (currentMode ? "#fff" : "#282828")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ currentMode }) => (currentMode ? "#282828" : "#fff")};
`;
