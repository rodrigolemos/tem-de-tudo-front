import React, { useState, useEffect } from 'react';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';
import Loading from '../../components/Loading';
import ItemsTable from '../../components/ItemsTable';

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

  return (
    <div className="global-container">
      <SidePanel>
        <UserPanel />
      </SidePanel>
      <Main>
        {loading ? (
          <Loading />
        ) : (
          <ItemsTable items={products} />
        )}
      </Main>
    </div>
  )
};

export default Products;