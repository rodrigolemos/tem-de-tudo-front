import React, { useState, useEffect } from 'react';

import DataNotFound from '../DataNotFound';
import Loading from '../Loading';

import { api } from '../../services/api';
import formatValue from '../../utils/formatValue';

const TopSellers = ({ starts, finishes }) => {
  const [loading, setLoading] = useState(false);
  const [topSellers, setTopSellers] = useState([]);

  const fetchTopSellers = async (pstarts, pfinishes) => {
    setLoading(true);

    try {
      const response = await api.get(`/sales/top-sellers?starts=${pstarts}&finishes=${pfinishes}`);

      if (response.status === 200) {
        setTopSellers(response.data);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (starts && finishes) {
      fetchTopSellers(starts, finishes);
    }
  }, [finishes, starts]);

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
                {topSellers.map((seller) => (
                  <tr key={seller.id}>
                    <td>{seller.name}</td>
                    <td className="center">
                      <span className="simple-badge">{formatValue(seller.total)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <DataNotFound>
            <h2>Nenhum vendedor encontrado.</h2>
          </DataNotFound>
        )
      )}
    </>
  );
};

export default TopSellers;
