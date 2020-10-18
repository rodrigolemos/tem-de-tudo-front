import styled from 'styled-components';

export const Container = styled.main`
  height: 90vh;
  width: 50vw;
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
  width: 60%;
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
`;