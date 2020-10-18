import React from 'react';
import ReactLoading from 'react-loading';

import { Container } from './styles';
import { colors } from '../../styles/global';

const Loading = () => {
  return (
    <Container>
      <ReactLoading type={"spin"} color={colors.bgPrimary} height={"10%"} width={"10%"}/>
    </Container>
  )
}

export default Loading;