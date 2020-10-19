import React, { useState, useEffect } from 'react';

import DataNotFound from '../../components/DataNotFound';
import Loading from '../../components/Loading';

import { api } from '../../services/api';
import formatValue from '../../utils/formatValue';

const TopCustomers = ({ starts, finishes }) => {
  
  const [loading, setLoading] = useState(false);
  const [topCustommers, setTopCustomers] = useState([]);

  useEffect(() => {

    if (starts && finishes) {
      fetchTopCustomers(starts, finishes);
    }

  }, [starts, finishes]);

  const fetchTopCustomers = async (starts, finishes) => {

    setLoading(true);

    try {

      const response = await api.get(`/sales/top-customers?starts=${starts}&finishes=${finishes}`);

      if (response.status === 200) {
        setTopCustomers(response.data);
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
                {topCustommers.map((customer, index) => (
                  <tr key={index}>
                    <td>{customer.name}</td>
                    <td className="center">
                      {formatValue(customer.total)}
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
  )
}

export default TopCustomers;