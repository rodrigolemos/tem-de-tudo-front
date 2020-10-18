import React from 'react';
import { GiMusicalScore } from 'react-icons/gi';
import { Container } from './styles';

const SidePanel = ({ children }) => {
  return (
    <Container>
      <GiMusicalScore className="bg-img" />
      {children}
    </Container>
  )
}

export default SidePanel;