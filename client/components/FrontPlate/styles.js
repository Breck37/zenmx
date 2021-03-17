import styled from "styled-components";

export const FrontPlateStyled = styled.div`
  position: relative;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  .number-wrap {
    position: absolute;
    z-index: 1000;
    top: 23%;
    left: 7.5%;
    width: 75%;
    height: 35%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 72px;
  }
`;
export const FrontPlateSmallStyled = styled.div`
  position: relative;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  > svg path {
    filter: drop-shadow(2px 1px 1px rgba(0, 0, 0, 0.3));
  }

  .number-wrap {
    position: absolute;
    z-index: 1000;
    top: 30%;
    left: 15%;
    width: 75%;
    height: 35%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }
`;
