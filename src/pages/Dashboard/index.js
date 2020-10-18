import React from 'react';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';

import { Filter, ReportsArea } from './style';

const Dashboard = () => {
  return (
    <div className="global-container">
      <SidePanel>
        <UserPanel />
      </SidePanel>
      <Main>
        <Filter>
          <span>Data Início</span>
          <span>Data Fim</span>
        </Filter>
        <ReportsArea>
          <div className="row">
            <div className="col">Coluna 1</div>
            <div className="col">Coluna 2</div>
          </div>
          <div className="row">
            <div className="col">Coluna 1</div>
            <div className="col">Coluna 2</div>
          </div>
        </ReportsArea>
      </Main>
    </div>
  )
};

export default Dashboard;