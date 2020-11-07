import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Swal from 'sweetalert2';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';
import CustomForm from '../../components/CustomForm';
import Loading from '../../components/Loading';

import { api } from '../../services/api';
import { colors } from '../../styles/global';

const ProductsFormPage = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [formInfo, setFormInfo] = useState({
    name: '',
    description: '',
    brand: '',
    provider: '',
    classification: '',
    cost_price: '',
    sale_price: '',
    stock_quantity: '',
    store_quantity: '',
    status: ''
  });

  const { id } = useParams();

  const fetchProduct = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/products/list/${id}`);

      if (response.status === 200) {
        setFormInfo(response.data[0])
      }

    } catch (err) {
      Swal.fire({
        title: 'Não foi possível listar os parceiros. Tente novamente mais tarde.',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
    }
    setLoading(false);
  }

  useEffect(() => {

    if (typeof id !== 'undefined') {
      fetchProduct(id);
    }

  }, [id]);

  const submitForm = async (product) => {
    setLoading(true);

    try {

      let response = {};

      if (typeof id !== 'undefined') {

        product.id = id;

        response = await api.put('/products/update', product);

      } else {

        response = await api.post('/products/create', product);

      }

      if (response.status === 200) {
        Swal.fire({
          title: 'Produto cadastrado!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: colors.confirm,
          confirmButtonText: 'Ok',
        }).then(() => {
          setLoading(false);

          history.push('/products');
        });

        return;
      }

      Swal.fire({
        title: 'Atenção!',
        text: 'Não foi possível adicionar o produto. Tente novamente mais tarde.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } catch (err) {
      Swal.fire({
        title: 'Atenção!',
        text: 'Não foi possível adicionar o produto. Tente novamente mais tarde.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }

    setLoading(false);
  };

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
    }).catch((err) => {
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
          <h1>Adicionar Produto</h1>
          <Link to="/products">Voltar</Link>
        </div>
        {loading ? (
          <Loading />
        ) : (
            <CustomForm onSubmit={handleSubmit(validateForm)}>
              <h2>Informações do Produto</h2>
              <input ref={register} type="text" name="name" placeholder="Nome" defaultValue={formInfo.name} />
              <input ref={register} type="text" name="description" placeholder="Descrição" defaultValue={formInfo.description} />
              <input ref={register} type="text" name="brand" placeholder="Marca" defaultValue={formInfo.brand} />
              <input ref={register} type="text" name="provider" placeholder="Fornecedor" defaultValue={formInfo.provider} />
              <input ref={register} type="text" name="classification" placeholder="Classificação" defaultValue={formInfo.classification} />
              <input ref={register} type="text" name="cost_price" placeholder="Preço de Custo" defaultValue={formInfo.cost_price} />
              <input ref={register} type="text" name="sale_price" placeholder="Preço de Venda" defaultValue={formInfo.sale_price} />
              <input ref={register} type="text" name="stock_quantity" placeholder="Quantidade em Estoque" defaultValue={formInfo.stock_quantity} />
              <input ref={register} type="text" name="store_quantity" placeholder="Quantidade em Loja" defaultValue={formInfo.store_quantity} />
              <select ref={register} name="status" defaultValue={formInfo.status}>
                <option value="" disabled>Selecione</option>
                <option value="A">Ativo</option>
                <option value="I">Inativo</option>
              </select>
              <button type="submit">
                {typeof id !== 'undefined' ? 'Atualizar' : 'Adicionar'}
              </button>
            </CustomForm>
          )}
      </Main>
    </div>
  );
};

export default ProductsFormPage;
