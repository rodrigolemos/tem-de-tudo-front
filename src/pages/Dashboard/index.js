import React from 'react';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';

import TopSellers from '../../components/TopSellers';
import TopCustomers from '../../components/TopCustomers';

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
            <div className="col">
              Vendas no período
            </div>
            <div className="col">
              Lucro no período
            </div>
          </div>
          <div className="row">
            <div className="col">
              <TopSellers />
            </div>
            <div className="col">
              <TopCustomers />
            </div>
          </div>
        </ReportsArea>
      </Main>
    </div>
  )
};

export default Dashboard;