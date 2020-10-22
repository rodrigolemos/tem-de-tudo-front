import styled, { css } from 'styled-components';

export const Container = styled.aside`
  .desktop {
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
  }

  .mobile {
    color: #EEE;

    .icon-open {
      z-index: 1;
      position: fixed;
      color: var(--bg-primary);
      top: 1rem;
      left: 1.5rem;
      font-size: 4rem;
      cursor: pointer;
    }

    @media only screen and (min-width: 1070px) {
      display: none;
    }
  }
`;

export const SideNav = styled.nav`
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: var(--bg-primary);
  width: 100%;
  display: flex;

  ${({ show }) => show === 'N' && css`
    display: none;
  `}

  .closebtn {
    position: absolute;
    z-index: 2;
    top: 0;
    right: 2.5rem;
    font-size: 3.6rem;
    margin-left: 5rem;
    cursor: pointer;
  }
`;