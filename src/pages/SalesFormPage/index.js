import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';
import SelectAPI from '../../components/SelectAPI';

import { api } from '../../services/api';

const SalesFormPage = () => {

  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const validateForm = async (sale) => {

    const schema = yup.object().shape({
      order: yup.number().positive().integer().required(),
      customer: yup.string().required(),
      seller: yup.string().required(),
      product: yup.string().required(),
      quantity: yup.number().positive().integer().required(),
      product_2: yup.string(),
      quantity_2: yup.number().integer()
    });

    schema.validate(sale).then(async () => {

      await submitForm(sale);

    }).catch(err => {

      alert('Preencha todos os campos corretamente.');
      console.log(err);

    });

  }

  const submitForm = async (sale) => {

    const date = new Date().toISOString().substr(0, 10);

    const formatedSale = [
      {
        "order": sale.order,
        "product_id": sale.product,
        "quantity": sale.quantity,
        "customer": {
          "id": sale.customer
        },
        "seller": {
          "id": sale.seller
        },
        "date": date
      }
    ];

    if (sale.product_2 && sale.quantity_2 > 0) {

      if (sale.product === sale.product_2) {
        alert('Selecione um produto diferente do outro.');
        return;
      }

      formatedSale.push(
        {
          "order": sale.order,
          "product_id": sale.product_2,
          "quantity": sale.quantity_2,
          "customer": {
            "id": sale.customer
          },
          "seller": {
            "id": sale.seller
          },
          "date": date
        }
      );
    }

    try {

      const response = await api.post('/sales/create', formatedSale);

      console.log(response);

      if (response.status === 200) {

        history.push('/');

      } else {

        alert('Não foi possível adicionar a venda. Tente novamente mais tarde.');

      }

    } catch (err) {

      alert('Não foi possível adicionar a venda. Tente novamente mais tarde.');

    }

  }

  return (
    <div className="global-container">
      <SidePanel>
        <UserPanel />
      </SidePanel>
      <Main>
        <div className="content-title">
          <h1>Adicionar Venda (experimental)</h1>
          <Link to="/">Voltar</Link>
        </div>
        <div className="form-wrapper">
          <h2>Informações da Venda</h2>
          <form onSubmit={handleSubmit(validateForm)}>
            <input ref={register} type="text" name="order" placeholder="Número do pedido" />
            <SelectAPI forwardRef={register} type="text" apiName="partners" name="customer" filterType="customer" placeholder="Cliente" />
            <SelectAPI forwardRef={register} type="text" apiName="partners" name="seller" filterType="seller" placeholder="Vendedor" />

            <h3>Produto 1</h3>
            <SelectAPI forwardRef={register} type="text" apiName="products" name="product" placeholder="Produto" />
            <input ref={register} type="number" name="quantity" placeholder="Quantidade" min={1} defaultValue={1}/>

            <h3>Produto 2</h3>
            <SelectAPI forwardRef={register} type="text" apiName="products" name="product_2" placeholder="Produto" />
            <input ref={register} type="number" name="quantity_2" placeholder="Quantidade" min={0} defaultValue={0} />

            <button>Adicionar</button>
          </form>
        </div>
      </Main>
    </div>
  )
};

export default SalesFormPage;