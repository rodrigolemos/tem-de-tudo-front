import styled, { css } from 'styled-components';

export const StatusBadge = styled.span`
  padding: .5rem 1.3rem;
  border-radius: .5rem;
  transition: all .1s ease-in-out;
  background-color: #FFF;

  ${({ status }) => status !== 'A' ? css`
    border: 2px solid var(--danger);
    color: var(--danger);
  ` : css`
    border: 2px solid var(--success);
    color: var(--success);
  `}

  &:hover {
    transform: translateY(-0.2rem);
    box-shadow: 2px 2px 5px #CBC8D1;
  }
`;