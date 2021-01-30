import styled from "styled-components";

export default styled.div`
  max-width: 100vw;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: flex; 
  flex-direction: column;   
  background: rgb(2,0,36);
  background: ${({ currentMode }) =>
    currentMode
      ? "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,255,255,1) 75%)"
      : "#282828"};

  .mode-container {
    height: 32px;
    padding-right: 5%;
    background-color: ${({ currentMode }) =>
      currentMode ? "#fff" : "#282828"};
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .logo-container {
    width: 40%;
    filter: drop-shadow(10px 0px  5px rgba(0, 0, 0, 0.4));
    display: inherit;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: slide40 1.5s;
    transition: all 1.5s linear;

    .logo-wrap {
      margin-top: -32px;
      cursor: pointer;
      width: 100%;
      color: aqua;
      background-color: ${({ currentMode }) =>
        currentMode ? "#fff" : "#282828"};
      height: 128px;
      display: inherit;
      align-items: center;
      justify-content: center;
      font-size: 64px;
      font-family: Arial, serif;
      clip-path: polygon(0 0, 100% 0, 86% 100%, 0 100%);

      > span {
        margin-right: 32px;
        text-shadow: 0 0 1px aqua, 0 1px 1px #009999, 0 2px 1px #009999,
          1px 1px 1px #009999, 1px 2px 1px #009999, 1px 3px 1px #009999, 2px 1px 1px #009999,
          2px 2px 1px #009999, 2px 3px 1px #009999;
      }
    }
  }

  .tabs {
    position: absolute;
    top: 32px;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 96px;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    align-self: flex-end;
    margin-left: 50%;
    width: 45%;

   > .tab:first-child {
      border-left: solid 2px ${({ currentMode }) =>
        currentMode ? "#282828" : "aqua"};;
    }
   > .tab:last-child {
      border-right: solid 2px ${({ currentMode }) =>
        currentMode ? "#282828" : "aqua"};;
    }

    .tab {
      flex: 1;
      padding: 8px 0;
      border-left: solid 1px ${({ currentMode }) =>
        currentMode ? "#282828" : "aqua"};;
      border-right: solid 1px ${({ currentMode }) =>
        currentMode ? "#282828" : "aqua"};;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Arial, serif;
      height: 50%;
      color: ${({ currentMode }) => (currentMode ? "#282828" : "aqua")};

      &:hover {
        font-size: 24px;
      }
    }
  }

    @keyframes slide40 {
      0% {
        width: 0;
      }
      100% {
        width: 40%;
      }
    }
    @keyframes slide50 {
      0% {
        width: 0;
      }
      100% {
        width: 50%;
      }
    }
    @keyframes slide60 {
      0% {
        width: 0;
      }
      100% {
        width: 60%;
      }
    }
    @keyframes slide100 {
      0% {
        width: 0;
      }
      100% {
        width: 100%;
      }
    }

    @media (max-width: 1300px) {
      .logo-container {
        width: 50%;
        animation: slide50 1.5s;
      }
    }
    @media (max-width: 1100px) {
      .logo-container {
        width: 60%;
        animation: slide60 1.5s;
      }
    @media (max-width: 950px) {
      .logo-container {
        width: 100%;
        animation: slide100 1.5s;
      }
      .logo-wrap {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%) !important;
        justify-content: space-between;
      }
    }
`;
