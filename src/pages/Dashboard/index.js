import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineFileSearch } from 'react-icons/ai';
import Swal from 'sweetalert2';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';

import SalesReport from '../../components/SalesReport';
import TopSellers from '../../components/TopSellers';
import TopCustomers from '../../components/TopCustomers';

import { Filter, ReportsArea, SearchHelp } from './styles';

const Dashboard = () => {
  const initialDate = new Date().toISOString().split('T')[0];
  const [starts, setStarts] = useState(initialDate);
  const [finishes, setFinishes] = useState(initialDate);
  const [fetch, setFetch] = useState(false);

  const setDateToFetch = (e) => {
    setFetch(false);
    if (e.target.id === 'starts') {
      setStarts(e.target.value);
    } else {
      setFinishes(e.target.value);
    }
  };

  const fetchData = () => {
    if (starts && finishes) {
      setFetch(true);
    } else {
      Swal.fire({
        title: 'Atenção!',
        text: 'Preencha as datas corretamente.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="global-container">
      <SidePanel>
        <UserPanel />
      </SidePanel>
      <Main>
        <div className="content-title">
          <h1>Vendas</h1>
          <Link to="/sales/add">Adicionar</Link>
        </div>
        <Filter>
          <label htmlFor="starts">
            De:
            <input type="date" id="starts" onChange={setDateToFetch} defaultValue={starts} />
          </label>
          <label htmlFor="finishes">
            Até:
            <input type="date" id="finishes" onChange={setDateToFetch} defaultValue={finishes} />
          </label>
        </Filter>
        <ReportsArea>
          {!fetch ? (
            <SearchHelp>
              <AiOutlineFileSearch className="bg-img" />
              <h1>Selecione uma data para consulta</h1>
            </SearchHelp>
          ) : (
              <>
                <div className="row">
                  <div className="col col-full">
                    <SalesReport starts={starts} finishes={finishes} />
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
  );
};

export default Dashboard;
