import styled from 'styled-components';
import { MODERN_PURPLE, MODERN_GREY } from './colors';

export default styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: ${MODERN_GREY};

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .svg {
    display: none;
  }

  .title {
    color: #fff;
    font-size: 56px;
    text-shadow: 0 0 1px aqua, 0 1px 1px #cfdced, 0 2px 1px #cfdced,
      1px 1px 1px #cfdced, 1px 2px 1px #cfdced, 1px 3px 1px #cfdced,
      2px 1px 1px #cfdced, 2px 2px 1px #cfdced, 2px 3px 1px #cfdced;
    display: flex;
    flex-direction: column;
    width: 100%;

    span:first-child {
      padding-left: 15%;
    }
    span:last-child {
      padding-left: 45%;
    }
  }

  .tagline {
    color: ${MODERN_PURPLE};
    margin-top: 32px;
    font-size: 32px;
  }

  .login-button {
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    text-decoration: none;
    width: 50%;
    padding: 16px;
    color: ${MODERN_PURPLE};

    position: absolute;
    bottom: 24px;
  }

  @media (min-width: 500px) {
    .title {
      flex-direction: row;
      justify-content: center;

      > span {
        width: auto;
        padding: 0 !important;
      }
    }
  }

  @media (max-width: 500px) {
    .title {
      // flex-direction: row;
      // justify-content: center;

      span:first-child {
        padding-left: 0;
      }
      span:last-child {
        padding-left: 0;
      }
    }
  }

  @keyframes text-animate {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
