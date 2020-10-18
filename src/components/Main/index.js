import React from 'react';
import { Container, ContentContainer, Content } from './styles';

const Main = ({ children }) => {
  return (
    <Container>
      <ContentContainer>
        <Content>
          {children}
        </Content>
      </ContentContainer>
    </Container>
  )
}

export default Main;