import React from 'react';
import { Link } from 'react-router-dom';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';

// import { api } from '../../services/api';

const ProductsFormPage = () => {

  return (
    <div className="global-container">
      <SidePanel>
        <UserPanel />
      </SidePanel>
      <Main>
        <div className="content-title">
          <h1>Adicionar Produto</h1>
          <Link to="/products">Voltar</Link>
        </div>
        Adicionar produto...
      </Main>
    </div>
  )
};

export default ProductsFormPage;