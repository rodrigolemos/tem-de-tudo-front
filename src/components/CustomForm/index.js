import React from 'react';

import { Container, Form } from './styles';

const CustomForm = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <Form>
        {children}
      </Form>
    </Container>
  )
}

export default CustomForm;