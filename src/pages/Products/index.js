import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import Swal from 'sweetalert2';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';
import DataNotFound from '../../components/DataNotFound';
import Loading from '../../components/Loading';

import { api } from '../../services/api';
import formatValue from '../../utils/formatValue';
import { colors } from '../../styles/global';

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const response = await api.get('/products/list');

      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const removeProduct = async (id) => {
    Swal.fire({
      title: 'Deseja realmente remover o produto?',
      text: 'O histórico de vendas não será afetado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: colors.confirm,
      cancelButtonColor: colors.cancel,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);

        try {
          const response = await api.put(`/products/remove/${id}`);

          if (response.status === 200) {
            setProducts(...[products.filter((product) => product.id !== id)]);

            Swal.fire({
              title: 'Produto removido!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          }
        } catch (err) {
          console.log(err);
        }

        setLoading(false);
      }
    });
  };

  return (
    <div className="global-container">
      <SidePanel>
        <UserPanel />
      </SidePanel>
      <Main>
        <div className="content-title">
          <h1>Produtos</h1>
          <Link to="/products/add">Adicionar</Link>
        </div>
        {loading ? (
          <Loading />
        ) : (
          products.length > 0 ? (
            <table className="custom-table">
              <thead>
                <tr>
                  <th aria-label="control" />
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
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="center">
                      <IoIosRemoveCircleOutline
                        title="Remover produto"
                        className="icon-remove"
                        onClick={() => removeProduct(product.id)}
                      />
                    </td>
                    <td className="center">{product.id}</td>
                    <td className="center">{product.name}</td>
                    <td className="center">{product.brand}</td>
                    <td className="center">{product.provider}</td>
                    <td className="center">{formatValue(product.cost_price)}</td>
                    <td className="center">{formatValue(product.sale_price)}</td>
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
  );
};

export default Products;
