import styled from "styled-components";

export default styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  h1,
  h4 {
    text-align: center;
  }

  .pick {
    flex: 1;
    background-color: aqua;
    border: solid 1px black;

    > h1 {
      font-size: 14px;
    }

    .rider-row {
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
  }
`;
