import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Swal from 'sweetalert2';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';

import { api } from '../../services/api';

const ProductsFormPage = () => {

  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const validateForm = async (product) => {

    const schema = yup.object().shape({
      name: yup.string().required(),
      description: yup.string().required(),
      brand: yup.string().required(),
      provider: yup.string().required(),
      classification: yup.string().required(),
      cost_price: yup.number().positive().required(),
      sale_price: yup.number().positive().required(),
      stock_quantity: yup.number().positive().integer().required(),
      store_quantity: yup.number().positive().integer().required(),
      status: yup.string().required(),
    });

    schema.validate(product).then(async () => {

      await submitForm(product);

    }).catch(err => {

      Swal.fire({
        title: 'Atenção!',
        text: 'Preencha todos os campos corretamente.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });

      console.log(err);

    });

  }

  const submitForm = async (product) => {

    try {

      const response = await api.post('/products/create', product);

      if (response.status === 200) {

        history.push('/products');

      } else {

        Swal.fire({
          title: 'Atenção!',
          text: 'Não foi possível adicionar o produto. Tente novamente mais tarde.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });

      }

    } catch (err) {

      Swal.fire({
        title: 'Atenção!',
        text: 'Não foi possível adicionar o produto. Tente novamente mais tarde.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });

    }

  }

  return (
    <div className="global-container">
      <SidePanel>
        <UserPanel />
      </SidePanel>
      <Main>
        <div className="content-title">
          <h1>Adicionar Produto</h1>
          <Link to="/products">Voltar</Link>
        </div>
        <div className="form-wrapper">
          <form onSubmit={handleSubmit(validateForm)}>
            <h2>Informações do Produto</h2>
            <input ref={register} type="text" name="name" placeholder="Nome" />
            <input ref={register} type="text" name="description" placeholder="Descrição" />
            <input ref={register} type="text" name="brand" placeholder="Marca" />
            <input ref={register} type="text" name="provider" placeholder="Fornecedor" />
            <input ref={register} type="text" name="classification" placeholder="Classificação" />
            <input ref={register} type="text" name="cost_price" placeholder="Preço de Custo" />
            <input ref={register} type="text" name="sale_price" placeholder="Preço de Venda" />
            <input ref={register} type="text" name="stock_quantity" placeholder="Quantidade em Estoque" />
            <input ref={register} type="text" name="store_quantity" placeholder="Quantidade em Loja" />
            <select ref={register} name="status" defaultValue="">
              <option value="" disabled>Selecione</option>
              <option value="A">Ativo</option>
              <option value="I">Suspenso</option>
            </select>
            <button>Adicionar</button>
          </form>
        </div>
      </Main>
    </div>
  )
};

export default ProductsFormPage;