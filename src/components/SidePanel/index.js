import React from 'react';
import { GiPencilBrush } from 'react-icons/gi';
import { Container } from './styles';

const SidePanel = ({ children }) => {
  return (
    <Container>
      <GiPencilBrush className="bg-img" />
      {children}
    </Container>
  )
}

export default SidePanel;