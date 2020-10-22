import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';

import { api } from '../../services/api';

const PartnersFormPage = () => {

  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const validateForm = async (partner) => {

    const schema = yup.object().shape({
      name: yup.string().required(),
      address: yup.string().required(),
      phone: yup.string().required(),
      type: yup.string().required(),
      status: yup.string().required(),
    });

    schema.validate(partner).then(async () => {

      await submitForm(partner);

    }).catch(err => {

      alert('Preencha todos os campos corretamente.');
      console.log(err);

    });

  }

  const submitForm = async (partner) => {

    try {

      const response = await api.post('/partners/create', partner);

      if (response.status === 200) {

        history.push('/partners');

      } else {

        alert('Não foi possível adicionar o parceiro. Tente novamente mais tarde.');

      }

    } catch (err) {

      alert('Não foi possível adicionar o parceiro. Tente novamente mais tarde.');

    }

  }

  return (
    <div className="global-container">
      <SidePanel>
        <UserPanel />
      </SidePanel>
      <Main>
        <div className="content-title">
          <h1>Adicionar Parceiro</h1>
          <Link to="/partners">Voltar</Link>
        </div>
        <div className="form-wrapper">
          <h2>Informações do Parceiro</h2>
          <form onSubmit={handleSubmit(validateForm)}>
            <input ref={register} type="text" name="name" placeholder="Nome do Parceiro" />
            <input ref={register} type="text" name="address" placeholder="Endereço" />
            <input ref={register} type="text" name="phone" placeholder="Telefone" />
            <select ref={register} name="type" defaultValue="">
              <option value="" disabled>Selecione</option>
              <option value="customer">Cliente</option>
              <option value="seller">Vendedor</option>
            </select>
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

export default PartnersFormPage;