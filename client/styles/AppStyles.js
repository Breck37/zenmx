import styled from "styled-components";

export default styled.div`
  margin: -8px;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  background-color: ${({ currentMode }) => (currentMode ? "#fff" : "#282828")};
  font-family: Chalkduster, fantasy;
`;
