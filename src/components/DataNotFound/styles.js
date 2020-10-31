import styled from 'styled-components';
import { showFromLeftOpacity } from '../../styles/animations';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  opacity: .4;
  animation: ${showFromLeftOpacity} .7s ease-in-out;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  svg {
    width: 25%;
    height: 25%;
  }
`;
