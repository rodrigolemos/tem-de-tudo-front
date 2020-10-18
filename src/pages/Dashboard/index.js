import React, { useState } from 'react';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';

import SalesReport from '../../components/SalesReport';

import TopSellers from '../../components/TopSellers';
import TopCustomers from '../../components/TopCustomers';

import { Filter, ReportsArea } from './styles';

const Dashboard = () => {

  const [starts, setStarts] = useState();
  const [finishes, setFinishes] = useState();

  const setDateToFetch = e => {
    if (e.target.id === "starts") {
      setStarts(e.target.value);
    } else {
      setFinishes(e.target.value);
    }
  }

  return (
    <div className="global-container">
      <SidePanel>
        <UserPanel />
      </SidePanel>
      <Main>
        <h1 className="content-title">Selecione um período para consulta</h1>
        <Filter>
          <label>Data Início:
            <input type="date" id="starts" onChange={setDateToFetch}></input>
          </label>
          <label>Data Fim:
            <input type="date" id="finishes" onChange={setDateToFetch}></input>
          </label>
        </Filter>
        <ReportsArea>
          <div className="row">
            <div className="col">
              <SalesReport starts={starts} finishes={finishes} />
            </div>
            <div className="col">
              Lucro no período
            </div>
          </div>
          <div className="row">
            <div className="col">
              <TopSellers starts={starts} finishes={finishes} />
            </div>
            <div className="col">
              <TopCustomers starts={starts} finishes={finishes} />
            </div>
          </div>
        </ReportsArea>
      </Main>
    </div>
  )
};

export default Dashboard;