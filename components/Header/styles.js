import styled from "styled-components";

export default styled.div`
  width: 100vw;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: flex;

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
      width: 100%;
      color: aqua;
      background-color: white;
      height: 96px;
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
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 96px;
    background: rgb(2,0,36);
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,255,255,1) 75%);
    z-index: 1;
    box-shadow: -1px 6px 3px rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: flex-end;
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
