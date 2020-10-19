import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  z-index: 1;
`;

export const Logo = styled.div`
  width: 85%;
  height: 10%;
  padding-left: 5%;
  padding-top: 3%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.8rem;

  svg {
    width: 4.5rem;
    height: 4.5rem;
    margin-right: 2.5rem;
  }
  
`;

export const ControlPanel = styled.div`
  width: 85%;
  height: 90%;
  padding-left: 7%;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 1.5rem;

  ul {
    padding: 0;
    width: 100%;
  }

  li {
    font-size: 2.2rem;
    font-weight: normal;
    list-style: none;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: .2rem;
    transition: all .2s ease-in-out;
    cursor: pointer;

    &:hover {
      background: var(--bg-primary-dark);
    }

    a {
      text-decoration: none;
      color: var(--font-secondary);
    }
  }

`;