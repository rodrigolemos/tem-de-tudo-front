import styled, { css } from 'styled-components';

export const QtdBadge = styled.span`
  padding: .5rem 1.3rem;
  border-radius: .5rem;
  transition: all .1s ease-in-out;

  ${({ qtd }) => qtd <= 3 && css`
    color: #FFF !important;
    background-color: var(--danger);
  `}

  &:hover {
    transform: translateY(-0.2rem);
    box-shadow: 2px 2px 5px #CBC8D1;
  }
`;