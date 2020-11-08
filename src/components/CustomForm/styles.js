import styled from 'styled-components';
import { showFromLeft } from '../../styles/animations';

export const Container = styled.div`
  width: 100%;
  height: 90%;
  animation: ${showFromLeft} .3s ease-in-out;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Form = styled.form`
  background-color: #FFF;
  width: 60%;
  height: auto;
  
  padding: 2.5rem;
  padding-bottom: 3rem;
  border-radius: 2px;
  box-shadow: 0px 0px .5rem #CCC;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media only screen and (max-width: 1070px) {
    width: 75%;
  }

  label {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      width: 25%;
    }
  }

  input, select {
    font-size: 1.6rem;
    width: 95%;
    margin: .7rem;
    padding: .75rem;
    color: #333;
    border-radius: 5px;
    background-color: var(--font-secondary);
    border: 1px solid var(--font-secondary);
    outline-color: var(--bg-primary);
    transition: all .2s ease-in-out;

    &:focus {
      border: 1px solid var(--bg-primary);
    }

    ::placeholder {
      color: var(--font-secondary-dark);
    }

  }

  select {
    width: 98%;
  }

  button {
    font-size: 1.6rem;
    margin-top: 1.5rem;
    width: 99%;
    padding: .75rem;
    border-radius: .2rem;
    cursor: pointer;
    border: none;
    color: #FFF;
    outline-color: var(--bg-secondary);
    background-color: var(--bg-primary-dark);
    transition: all .1s ease-in-out;

    &:hover {
      transform: translateY(-0.2rem);
      box-shadow: 2px 2px 5px #CBC8D1;
    }

  }
`;
