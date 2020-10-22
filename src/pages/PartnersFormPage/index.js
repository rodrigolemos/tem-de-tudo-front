import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Swal from 'sweetalert2';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';
import CustomForm from '../../components/CustomForm';

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

      Swal.fire({
        title: 'Atenção!',
        text: 'Preencha todos os campos corretamente.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });

      console.log(err);

    });

  }

  const submitForm = async (partner) => {

    try {

      const response = await api.post('/partners/create', partner);

      if (response.status === 200) {

        history.push('/partners');

      } else {

        Swal.fire({
          title: 'Atenção!',
          text: 'Não foi possível adicionar o parceiro. Tente novamente mais tarde.',
          icon: 'error',
          confirmButtonText: 'Ok'
        });

      }

    } catch (err) {

      Swal.fire({
        title: 'Atenção!',
        text: 'Não foi possível adicionar o parceiro. Tente novamente mais tarde.',
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
          <h1>Adicionar Parceiro</h1>
          <Link to="/partners">Voltar</Link>
        </div>
          <CustomForm onSubmit={handleSubmit(validateForm)}>
            <h2>Informações do Parceiro</h2>
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
          </CustomForm>
      </Main>
    </div>
  )
};

export default PartnersFormPage;