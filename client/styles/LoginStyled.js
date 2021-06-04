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
    text-shadow: 0 0 1px ${MODERN_PURPLE}, 0 1px 1px ${MODERN_PURPLE}, 0 2px 1px ${MODERN_PURPLE},
      1px 1px 1px ${MODERN_PURPLE}, 1px 2px 1px ${MODERN_PURPLE}, 1px 3px 1px ${MODERN_PURPLE},
      2px 1px 1px ${MODERN_PURPLE}, 2px 2px 1px ${MODERN_PURPLE}, 2px 3px 1px ${MODERN_PURPLE};
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
    display: ${({ isEmailModalOpen }) => isEmailModalOpen ? 'none' : 'flex'};
    justify-content: center;
    text-transform: uppercase;
    text-decoration: none;
    width: 50%;
    padding: 16px;
    color: ${MODERN_PURPLE};

    position: absolute;
    bottom: 24px;
  }

  .login-modal-form {
    width: calc(100% - 32px);
    height: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    // background-color: #454dcc;
    // background-color: hsla(236, 57%, 43%, 0.87);
    // box-shadow: rgba(50, 50, 93, 0.25) 1px 2px 20px -2px;
    // rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;

    label {
      font-size: 24px;
      color: ${MODERN_PURPLE};
    }

    .subtitle {
      font-size: 14px;
    }

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;

      > label:first-child {
        margin-bottom: 8px;
      }
    }

    input {
      width: 70%;
      border: none;
      border-bottom: 2px #CFDCED solid;
      cursor: text;
      text-align: center;
      font-size: 24px;

      &:focus {
        outline: none;
        border-bottom-color: ${MODERN_PURPLE};
        color: ${MODERN_PURPLE}
      }
    }
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
