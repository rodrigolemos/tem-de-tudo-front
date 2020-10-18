import React, { useState } from 'react';
import { AiOutlineFileSearch } from 'react-icons/ai';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';

import SalesReport from '../../components/SalesReport';
import ProfitReport from '../../components/ProfitReport';
import TopSellers from '../../components/TopSellers';
import TopCustomers from '../../components/TopCustomers';

import { Filter, ReportsArea, SearchHelp } from './styles';

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
            <input type="date" id="starts" onBlur={setDateToFetch}></input>
          </label>
          <label>Data Fim:
            <input type="date" id="finishes" onBlur={setDateToFetch}></input>
          </label>
        </Filter>
        <ReportsArea>
          {!starts || !finishes ? (
            <SearchHelp>
              <AiOutlineFileSearch className="bg-img" />
              <h1>Selecione uma data para consulta</h1>
              <h3>Por exemplo, de 01/03/2020 à 31/03/2020</h3>
            </SearchHelp>
          ) : (
            <>
              <div className="row">
                <div className="col">
                  <SalesReport starts={starts} finishes={finishes} />
                </div>
                <div className="col">
                  <ProfitReport starts={starts} finishes={finishes} />
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
            </>
          )}
        </ReportsArea>
      </Main>
    </div>
  )
};

export default Dashboard;