import React from 'react';
import { Link } from 'react-router-dom';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';

// import { api } from '../../services/api';

const PartnersFormPage = () => {

  return (
    <div className="global-container">
      <SidePanel>
        <UserPanel />
      </SidePanel>
      <Main>
        <div className="content-title">
          <h1>Adicionar Parceiro</h1>
          <Link to="/partners">Voltar</Link>
        </div>
        Adicionar parceiro...
      </Main>
    </div>
  )
};

export default PartnersFormPage;