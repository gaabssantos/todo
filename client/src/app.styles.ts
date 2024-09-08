import styled from 'styled-components';
import { colors } from './styles/themes.styles';

export const Container = styled.div`
  background-color: ${colors.white};
  width: 30%;
  margin: 0 auto;
  padding: 1rem 1rem 0 1rem;
  border-radius: 5px;

  input {
    width: 80%;
    padding: 0.5rem 1rem;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    margin-right: 2rem;
  }

  button {
    padding: 0.5rem 1.3rem;
    background-color: ${colors.primary};
    border: 0;
    color: ${colors.white};
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
  }

  @media (max-width: 800px) {
    width: 90%;
  }

  @media (max-width: 900px) {
    width: 80%;
  }
`;

export const FormControl = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ItensContainer = styled.div`
  padding: 2rem;
  text-align: center;

  p {
    font-weight: bold;
  }
`;

export const Todo = styled.div`
  background-color: #e4e4e4;
  padding: 1rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  svg {
    cursor: pointer;
  }

  #done {
    color: #74c365;
  }

  #delete {
    color: #ff2e38;
  }

  span.done {
    text-decoration: line-through;
  }
`;
