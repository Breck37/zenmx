import styled from 'styled-components';

export default styled.div`
  max-width: 100vw;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  background: rgb(2, 0, 36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,255,255,1) 75%);


  .mode-container {
    height: 32px;
    padding-right: 5%;
    background-color: ${({ currentMode }) => (currentMode ? '#fff' : '#282828')};
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > button {
      z-index: 3000;
      background: none;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: ${({ currentMode }) => (currentMode ? '#28282' : 'aqua')};
      border: none;
      cursor: pointer;
      outline: inherit;
    }
  }

  .logo-container {
    width: 40%;
    filter: drop-shadow(10px 0px 5px rgba(0, 0, 0, 0.4));
    display: inherit;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: slide40 1.5s;
    animation-delay: 4s;
    transition: all 1.5s linear;

    .logo-wrap {
      margin-top: -32px;
      cursor: pointer;
      width: 100%;
      color: aqua;
      background-color: ${({ currentMode }) => (currentMode ? '#fff' : '#282828')};
      height: 128px;
      display: inherit;
      align-items: center;
      justify-content: center;
      font-size: 64px;
      font-family: Arial, serif;
      clip-path: polygon(0 0, 100% 0, 86% 100%, 0 100%);

      > span {
        margin-right: 32px;
        letter-spacing: 2px;
        text-shadow: 0 0 1px aqua, 0 1px 1px #520099, 0 2px 1px #520099,
          1px 1px 1px #520099, 1px 2px 1px #520099, 1px 3px 1px #520099,
          2px 1px 1px #520099, 2px 2px 1px #520099, 2px 3px 1px #520099;
      }
      // > span {
      //   margin-right: 32px;
      //   letter-spacing: 2px;
      //   text-shadow: 0 0 1px aqua, 0 1px 1px #009999, 0 2px 1px #009999,
      //     1px 1px 1px #009999, 1px 2px 1px #009999, 1px 3px 1px #009999,
      //     2px 1px 1px #009999, 2px 2px 1px #009999, 2px 3px 1px #009999;
      // }
    }

    .icon-wrap {
      background-color: ${({ currentMode }) => (currentMode ? '#fff' : '#FFF')};
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
      border-left: solid 2px #282828;
    }
    > .tab:last-child {
      border-right: solid 2px #282828;
    }

    .tab {
      flex: 1;
      padding: 8px 0;
      letter-spacing: 1px;
      text-transform: uppercase;
      border-left: solid 1px #282828;
      border-right: solid 1px #282828;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: Arial, serif;
      height: 50%;
      color: "#282828";

      &:hover {
        font-size: 24px;
      }
    }
  }

  .menu {
    display: none;
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
    .tab {
      &:hover {
        font-size: 18px !important;
      }
    }
  }

  @media (max-width: 950px) {
    .logo-container {
      width: 100%;
      animation: slide100 1.5s;
    }
    .tabs {
      display: ${({ showMobileTabs }) => (showMobileTabs ? 'block' : 'none')};
      flex-direction: column;
      width: 200px;
      z-index: 10000;
      margin-left: 0;
      left: calc(100% - 200px);
      top: 128px;
      background-color: aqua;      
      height: 220px;      
      filter: drop-shadow(0px 2px 0px rgba(0, 0, 0, 0.3));
      animation: unveil 2.4s;
      transition: all 2.4s linear;
      border-bottom-right-radius: 4px;
      border-bottom-left-radius: 8px;
      overflow: hidden;

      > .tab {
        height: 48px;
        opacity: 1;
        color: #282828;
        border: none !important;
        padding: 4px 0;
        animation: showTabs 2.4s;
        transition: height: 2.4s linear;
      }
    }
    .logo-wrap {
      clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%) !important;
      justify-content: space-between;
      position: relative;
    }
    .mode-container {
      padding-right: 18px;
    }
    .menu {
      display: inline-block;
      position: absolute;
      right: 24px;
      top: 41%;
      color: ${({ currentMode }) => (currentMode ? 'aqua' : '#282828')};
    }
  }

  @media (max-width: 500px) {
    .logo-wrap {
      font-size: 36px !important;
    }
    .tabs {
      left: 0;
      width: 100%;
    }
  }

  @keyframes unveil {
    0% {
      display: none;
      height: 0;
    }
    100 {
      display: block;
      height: 220px;
    }
  }
  @keyframes showTabs {
    0% {
      opacity: 0;
      height: 0;
    }
    100 {
      opacity: 1;
      height: 48px;
    }
  }
`;
