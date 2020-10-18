import React, { useState, useEffect } from 'react';

import Loading from '../../components/Loading';

import { api } from '../../services/api';
import formatValue from '../../utils/formatValue';

const TopSellers = () => {
  
  const [loading, setLoading] = useState(false);
  const [topSellers, setTopSellers] = useState([]);

  useEffect(() => {
    fetchTopSellers();
  }, []);

  const fetchTopSellers = async () => {

    setLoading(true);

    try {

      const response = await api.get('/sales/top-sellers?starts=2020-03-01&finishes=2020-03-29');

      if (response.status === 200) {
        setTopSellers(response.data);
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
        topSellers.length > 0 ? (
          <>
            <h2>Melhores Vendedores</h2>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Total Vendido</th>
                </tr>
              </thead>
              <tbody>
                {topSellers.map((seller, index) => (
                  <tr key={index}>
                    <td>{seller.name}</td>
                    <td className="center">
                      {formatValue(seller.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <h2>Nenhum vendedor encontrado.</h2>
        )
      )}
    </>
  )
}

export default TopSellers;