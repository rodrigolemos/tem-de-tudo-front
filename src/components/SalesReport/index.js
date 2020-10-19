import React, { useState, useEffect } from 'react';

import DataNotFound from '../../components/DataNotFound';
import Loading from '../../components/Loading';

import { api } from '../../services/api';
import formatValue from '../../utils/formatValue';
import formatDate from '../../utils/formatDate';

const SalesReport = ({ starts, finishes }) => {
  
  const [loading, setLoading] = useState(false);
  const [sales, setSales] = useState([]);

  useEffect(() => {

    if (starts && finishes) {
      fetchSales(starts, finishes);
    }

  }, [starts, finishes]);

  const fetchSales = async (starts, finishes) => {

    setLoading(true);

    try {

      const response = await api.get(`/sales/period?starts=${starts}&finishes=${finishes}`);

      if (response.status === 200) {
        setSales(response.data);
      }

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        sales.length > 0 ? (
          <>
            <h2>Vendas por dia</h2>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Total Vendido</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale, index) => (
                  <tr key={index}>
                    <td className="center">
                      {formatDate(sale.date)}
                    </td>
                    <td className="center">
                      {formatValue(sale.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <DataNotFound>
            <h2>Nenhuma venda encontrada.</h2>
          </DataNotFound>
        )
      )}
    </>
  )
}

export default SalesReport;