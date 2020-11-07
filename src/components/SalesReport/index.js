import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CustomChart from '../CustomChart';
import DataNotFound from '../DataNotFound';
import Loading from '../Loading';

import { api } from '../../services/api';
import calcArrayTotal from '../../utils/calcArrayTotal';

const SalesReport = ({ starts, finishes }) => {
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState([]);
  const [profit, setProfit] = useState([]);

  const fetchSales = async (pstarts, pfinishes) => {
    setLoading(true);

    try {
      const [salesData, profitData] = await axios.all([
        await api.get(`/sales/period?starts=${pstarts}&finishes=${pfinishes}`),
        await api.get(`/sales/profit?starts=${pstarts}&finishes=${pfinishes}`),
      ]);

      if (salesData.status === 200 && profitData.status === 200) {
        setSales(salesData.data);
        setProfit(profitData.data);
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
                <span>Lucro </span>
                <span className="badge">{calcArrayTotal(profit)}</span>
              </div>
              <CustomChart title="Vendas por dia" mainInfo={sales} altInfo={profit} />
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
