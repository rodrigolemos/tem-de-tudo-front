import { keyframes } from 'styled-components';

export const showFromLeftOpacity = keyframes`
  from {
    opacity: 0;
    transform: translateX(-2rem);
  }
  to {
    opacity: .4;
    transform: translateX(0);
  }
`;

export const showFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-2rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
