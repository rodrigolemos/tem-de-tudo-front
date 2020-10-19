import React from 'react';
import { AiOutlineFileSearch } from 'react-icons/ai';

import { Container } from './styles'

const DataNotFound = ({ children }) => (
  <Container>
    <AiOutlineFileSearch />
    {children}
  </Container>
);

export default DataNotFound;