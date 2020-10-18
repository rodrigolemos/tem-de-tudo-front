import React, { useState, useEffect } from 'react';

import Loading from '../../components/Loading';

import { api } from '../../services/api';

const TopCustomers = () => {
  
  const [loading, setLoading] = useState(false);
  const [topCustommers, setTopCustomers] = useState([]);

  useEffect(() => {
    fetchTopCustomers();
  }, []);

  const fetchTopCustomers = async () => {

    setLoading(true);

    try {

      const response = await api.get('/sales/top-customers?starts=2020-03-01&finishes=2020-03-29');

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
                    <td>{customer.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <h2>Nenhum cliente encontrado.</h2>
        )
      )}
    </>
  )
}

export default TopCustomers;