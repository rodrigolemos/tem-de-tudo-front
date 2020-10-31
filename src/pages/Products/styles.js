import styled, { css } from 'styled-components';

export const QtdBadge = styled.span`
  padding: .5rem 1.3rem;
  border-radius: .5rem;
  transition: all .1s ease-in-out;

  ${({ qtd }) => qtd >= 7 ? css`
    /* border: 2px solid var(--success);
    color: var(--success); */
  ` : qtd >= 3 && qtd < 7 ? css`
    /* border: 2px solid var(--warning); */
    /* color: var(--warning); */
  ` : css`
    color: #FFF;
    background-color: var(--danger);
  `}

  &:hover {
    transform: translateY(-0.2rem);
    box-shadow: 2px 2px 5px #CBC8D1;
  }
`;