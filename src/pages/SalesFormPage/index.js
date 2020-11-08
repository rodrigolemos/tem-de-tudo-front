import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';
import CustomForm from '../../components/CustomForm';
import SelectAPI from '../../components/SelectAPI';
import Loading from '../../components/Loading';

import { api } from '../../services/api';
import { colors } from '../../styles/global';

import { Title } from './styles';

const Product = ({ index, register, products, setProducts }) => {

  const remove = () => {
    setProducts(products.map((product, i) => {
      if (i !== index) {
        return product;
      }
      return {};
    }))
  }

  return (
    <>
      <Title>
        <h3>Produto {index}</h3>
        {index > 1 && (
          <AiOutlineMinusCircle onClick={remove} />
        )}
      </Title>
      <SelectAPI forwardRef={register} type="text" apiName="products" name={`product_${index}`} placeholder="Produto" />
      <input ref={register} type="number" name={`quantity_${index}`} placeholder="Quantidade" min={1} defaultValue={1} />
    </>
  )
}

const SalesFormPage = () => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const [lastOrder, setLastOrder] = useState();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([
    <Product key={1} index={1} register={register} />
  ]);

  const addProduct = () => {
    setProducts([...products,
    <Product
      key={products.length + 1}
      index={products.length + 1}
      register={register}
      products={products}
      setProducts={setProducts}
    />
    ]);
  }

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const response = await api.get('/sales/list');

      if (response.status === 200) {
        const orders = response.data;

        if (orders.length > 0) {
          setLastOrder(orders[0].order + 1);
        } else {
          setLastOrder(1);
        }
      }
    } catch (err) {
      Swal.fire({
        title: 'Atenção!',
        text: 'Não foi possível recuperar as informações de venda. Tente novamente mais tarde.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const submitForm = async (sale) => {
    const date = new Date().toISOString().substr(0, 10);

    const formatedSale = [];
    for (let i = 1; i <= products.length; i++) {
      formatedSale.push({
        order: lastOrder,
        date,
        customer: {
          id: sale.customer,
        },
        seller: {
          id: sale.seller,
        },
        product_id: sale[`product_${i}`],
        quantity: sale[`quantity_${i}`],
      });
    }

    setLoading(true);

    try {
      const response = await api.post('/sales/create', formatedSale);

      if (response.status === 200) {
        Swal.fire({
          title: 'Venda registrada!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: colors.confirm,
          confirmButtonText: 'Ok',
        }).then(() => {
          setLoading(false);

          history.push('/');
        });

        return;
      }

      Swal.fire({
        title: 'Atenção!',
        text: 'Não foi possível adicionar a venda. Tente novamente mais tarde.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });

    } catch (err) {

      Swal.fire({
        title: 'Atenção!',
        text: err.response.data.message,
        icon: 'error',
        confirmButtonText: 'Ok',
      });

    }

    setLoading(false);
  };

  const validateForm = async (sale) => {
    const productsToCheck = [];
    for (let i = 1; i <= products.length; i++) {
      productsToCheck.push({
        [`product_${i}`]: yup.string().required(),
        [`quantity_${i}`]: yup.number().positive().integer().required(),
      });
    }

    const productsToValidate = Object.assign({}, ...productsToCheck);

    const schema = yup.object().shape({
      customer: yup.string().required(),
      seller: yup.string().required(),
      ...productsToValidate
    });

    schema.validate(sale).then(async () => {
      await submitForm(sale);
    }).catch((err) => {
      console.log(err);
      Swal.fire({
        title: 'Atenção!',
        text: 'Preencha todos os campos corretamente.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    });
  };

  return (
    <div className="global-container">
      <SidePanel>
        <UserPanel />
      </SidePanel>
      <Main>
        <div className="content-title">
          <h1>Simular Venda</h1>
          <Link to="/">Voltar</Link>
        </div>
        {loading ? (
          <Loading />
        ) : (
            <CustomForm onSubmit={handleSubmit(validateForm)}>
              <Title>
                <h2>Informações de Venda</h2>
                <AiOutlinePlusCircle onClick={addProduct} title="Adicionar produto" />
              </Title>

              <SelectAPI forwardRef={register} type="text" apiName="partners" name="customer" filterType="customer" placeholder="Cliente" />
              <SelectAPI forwardRef={register} type="text" apiName="partners" name="seller" filterType="seller" placeholder="Vendedor" />

              {products.map(product => product)}

              <button type="submit">Adicionar</button>
            </CustomForm>
          )}
      </Main>
    </div>
  );
};

export default SalesFormPage;
