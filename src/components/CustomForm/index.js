import React from 'react';

import { Container, Form } from './styles';

const CustomForm = ({ children, ...rest }) => (
  <Container {...rest}>
    <Form>
      {children}
    </Form>
  </Container>
);

export default CustomForm;
