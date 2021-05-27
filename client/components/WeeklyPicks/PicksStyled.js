import styled from 'styled-components';

export default styled.div`
  width: 100%;
  padding: 24px 32px;
  background-color: rgba(9, 236, 233, 1);
  border-radius: 4px;
  margin-bottom: 24px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 8px rgba(0, 0, 0, 0.08);

  .unavailable {
    text-align: center;
    color: #282828;
  }

  @media (max-width: 500px) {
    width: calc(100% - 32px);
  }
`;
