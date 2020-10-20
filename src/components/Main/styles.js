import styled from 'styled-components';

export const Container = styled.main`
  height: 95vh;
  width: 70vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow-y: auto;

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
  height: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  @media only screen and (max-width: 414px)  {
    width: 80%;
  }
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  font-size: 1.6rem;
`;