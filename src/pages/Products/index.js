import React, { useState, useEffect } from 'react';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';
import Loading from '../../components/Loading';

import { api } from '../../services/api';

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

  const ProductsTable = products => {
    if (products.products) {
      return (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Marca</th>
              <th>Fornecedor</th>
              <th>Classificação</th>
              <th>Preço de custo</th>
              <th>Preço de venda</th>
              <th>Qtd estoque</th>
              <th>Qtd loja</th>
            </tr>
          </thead>
          <tbody>
            {products.products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.brand}</td>
                <td>{product.provider}</td>
                <td>{product.classification}</td>
                <td>{product.cost_price}</td>
                <td>{product.sale_price}</td>
                <td>{product.stock_quantity}</td>
                <td>{product.store_qauntity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    } else {
      return (
        <h1>Nenhum produto encontrado.</h1>
      )
    }
  }

  return (
    <div className="global-container">
      <SidePanel>
        <UserPanel />
      </SidePanel>
      <Main>
        {loading ? (
          <Loading />
        ) : (
          <ProductsTable products={products} />
        )}
      </Main>
    </div>
  )
};

export default Products;