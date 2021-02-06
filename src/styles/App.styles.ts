import styled from "styled-components/macro";

export const Wrapper = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;

  h2 {
    opacity: 0.85;
  }

  select {
    padding: 10px 30px;
    font-size: 1rem;
  }

  section {
    font-size: 2.5rem;
    background-color: rgba(173, 113, 193, 0.25);
    padding: 20px 40px;
    margin-top: 40px;
    border-radius: 40px;
  }

  span {
    margin: 0 10px;
    opacity: 0.75;
  }
`;
