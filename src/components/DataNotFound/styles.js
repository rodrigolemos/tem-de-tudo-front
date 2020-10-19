import styled, { keyframes } from 'styled-components';

const showFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-2rem);
  }
  to {
    opacity: .4;
    transform: translateX(0);
  }
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  opacity: .4;
  animation: ${showFromLeft} .7s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  svg {
    width: 25%;
    height: 25%;
  }
`;