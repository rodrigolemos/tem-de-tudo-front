import styled from 'styled-components';

export const Container = styled.main`
  height: 90vh;
  width: 60vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  background: #FFF;
  color: var(--font-primary);

  @media only screen and (max-width: 960px)  {
    width: 75vw;
  }

  @media only screen and (max-width: 414px)  {
    width: 100vw;
  }
`;

export const ContentContainer = styled.div`
  height: auto;
  width: 90%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  @media only screen and (max-width: 414px)  {
    width: 80%;
  }
`;

export const Content = styled.div`
  height: 70%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 1.6rem;
  overflow: auto;
`;