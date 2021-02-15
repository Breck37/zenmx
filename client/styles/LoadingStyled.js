import styled from "styled-components";

export default styled.div`
  z-index: 10001;
  position: relative;
  width: 100vw;
  height: 100vh;
  font-family: Chalkduster, fantasy;

  .top {
    height: 50%;
    width: 100%;
    background-color: #fff;
    animation: topSlide 5s ease-in-out infinite;

    span {
      position: absolute;
      bottom: 50%;
      right: 45%;
      font-family: Arial, sans-serif;
      font-size: 100px;
      font-style: bold;
      margin-bottom: 28px;
    }
  }
  .bottom {
    height: 50%;
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: aqua;
    animation: bottomSlide 5s ease-in-out infinite;

    span {
      position: absolute;
      bottom: 35%;
      right: 35%;
      display: inline-block;
      margin-top: 28px;
    }

    .backwards {
      font-family: Arial, sans-serif;
      font-size: 100px;
      font-style: bold;
      // transition: all 0.9s;
      // // -moz-transform: scale(-1, -1);
      // // -webkit-transform: scale(-1, -1);
      // // -o-transform: scale(-1, -1);
      // // -ms-transform: scale(-1, -1);
      // // transform: scale(-1, -1);
      // transform: scale(1, -1);
      // -moz-transform: scale(1, -1);
      // -webkit-transform: scale(1, -1);
      // -o-transform: scale(1, -1);
      // -ms-transform: scale(1, -1);
      // // transform: scale(1, -1);
      // // transform: rotateY(-180deg);
    }
  }

  @keyframes topSlide {
    0% {
      height: 100%;
      width: 100%;
      clip-path: polygon(100% 0, 100% 50%, 0 50%, 0 0);
    }
    50% {
      height: 100%;
      width: 100%;
      clip-path: polygon(100% 0, 100% 0, 0 100%, 0 0);
    }
    100% {
      height: 100%;
      width: 100%;
      clip-path: polygon(0 0, 0 0, 0 0, 0 0);
    }
  }
  @keyframes bottomSlide {
    0% {
      height: 100%;
      width: 100%;
      clip-path: polygon(100% 50%, 100% 100%, 0 100%, 0 50%);
    }
    50% {
      height: 100%;
      width: 100%;
      clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 100%);
    }
    100% {
      height: 100%;
      width: 100%;
      clip-path: polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%);
    }
  }

  @media (max-width: 500px) {
    .top {
      span {
        font-size: 32px;
        right: 55%;
      }
    }

    .bottom {
      .backwards {
        font-size: 32px;
      }
    }
  }
`;
