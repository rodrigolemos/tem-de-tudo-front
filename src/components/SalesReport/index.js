import React, { useState, useEffect } from 'react';

import CustomChart from '../CustomChart';
import DataNotFound from '../DataNotFound';
import Loading from '../Loading';

import { api } from '../../services/api';
import calcArrayTotal from '../../utils/calcArrayTotal';

const SalesReport = ({ starts, finishes }) => {
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState([]);

  const fetchSales = async (pstarts, pfinishes) => {
    setLoading(true);

    try {
      const response = await api.get(`/sales/period?starts=${pstarts}&finishes=${pfinishes}`);

      if (response.status === 200) {
        setSales(response.data);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (starts && finishes) {
      fetchSales(starts, finishes);
    }
  }, [starts, finishes]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        sales.length > 0 ? (
          <>
            <div className="report-title">
              <span>Total Vendido </span>
              <span className="badge">{calcArrayTotal(sales)}</span>
            </div>
            <CustomChart title="Vendas por dia" info={sales} />
          </>
        ) : (
          <DataNotFound>
            <h2>Nenhuma venda encontrada.</h2>
          </DataNotFound>
        )
      )}
    </>
  );
};

export default SalesReport;
