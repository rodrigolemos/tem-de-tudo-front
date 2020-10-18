import styled from 'styled-components';

export const Container = styled.aside`
  height: 95vh;
  width: 25vw;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  background: var(--bg-primary);
  color: var(--font-secondary);
  position: relative;

  @media only screen and (max-width: 1070px) {
    display: none;
  }

  .bg-img {
    position: absolute;
    top: 0px;
    right: -15rem;
    width: 40rem;
    height: 40rem;
    color: var(--bg-primary-dark);
    z-index: 0;
  }
`;