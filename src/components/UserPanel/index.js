import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { Container, Logo, ControlPanel } from './styles';

const UserPanel = () => {

  return (
    <Container>
      <Logo>
        <FaUserCircle />
        <h1>Bem-vinda, Celeste!</h1>
      </Logo>
      <ControlPanel>
        <ul>
          <li>
            <Link to="/">Vendas</Link>
          </li>
          <li>
            <Link to="/products">Produtos</Link>
          </li>
          <li>
            <Link to="/partners">Parceiros</Link>
          </li>
        </ul>
      </ControlPanel>
    </Container>
  )
}

export default UserPanel;