import React, { useState, useEffect } from 'react';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';
import DataNotFound from '../../components/DataNotFound';
import Loading from '../../components/Loading';

import { api } from '../../services/api';
import formatValue from '../../utils/formatValue';

const Products = () => {

  const [loading, setLoading] = useState(false);
  const [products, setproducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {

    setLoading(true);

    try {

      const response = await api.get('/products/list');

      if (response.status === 200) {
        setproducts(response.data);
      }

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  }

  return (
    <div className="global-container">
      <SidePanel>
        <UserPanel />
      </SidePanel>
      <Main>
        <h1 className="content-title">Produtos</h1>
        {loading ? (
          <Loading />
        ) : (
          products.length > 0 ? (
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Marca</th>
                  <th>Fornecedor</th>
                  <th>Custo</th>
                  <th>Venda</th>
                  <th>Qtd estoque</th>
                  <th>Qtd loja</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.provider}</td>
                    <td>{formatValue(product.cost_price)}</td>
                    <td>{formatValue(product.sale_price)}</td>
                    <td className="center">{product.stock_quantity}</td>
                    <td className="center">{product.store_quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <DataNotFound>
              <h2>Nenhum produto encontrado.</h2>
            </DataNotFound>
          )
        )}
      </Main>
    </div>
  )
};

export default Products;