import React, { useState, useEffect } from 'react';

import DataNotFound from '../DataNotFound';
import Loading from '../Loading';

import { api } from '../../services/api';
import formatValue from '../../utils/formatValue';

const TopCustomers = ({ starts, finishes }) => {
  const [loading, setLoading] = useState(false);
  const [topCustommers, setTopCustomers] = useState([]);

  const fetchTopCustomers = async (pstarts, pfinishes) => {
    setLoading(true);

    try {
      const response = await api.get(`/sales/top-customers?starts=${pstarts}&finishes=${pfinishes}`);

      if (response.status === 200) {
        setTopCustomers(response.data);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (starts && finishes) {
      fetchTopCustomers(starts, finishes);
    }
  }, [starts, finishes]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        topCustommers.length > 0 ? (
          <>
            <h2>Melhores Clientes</h2>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Total Comprado</th>
                </tr>
              </thead>
              <tbody>
                {topCustommers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.name}</td>
                    <td className="center">
                      <span className="simple-badge">{formatValue(customer.total)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <DataNotFound>
            <h2>Nenhum cliente encontrado.</h2>
          </DataNotFound>
        )
      )}
    </>
  );
};

export default TopCustomers;
