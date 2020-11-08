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

const PartnersFormPage = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [formInfo, setFormInfo] = useState({
    name: '',
    address: '',
    phone: '',
    type: '',
    status: ''
  });

  const { id } = useParams();

  const fetchPartner = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/partners/list/${id}`);

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
      fetchPartner(id);
    }

  }, [id]);

  const submitForm = async (partner) => {
    setLoading(true);

    try {

      let response = {};

      if (typeof id !== 'undefined') {

        partner.id = id;

        response = await api.put('/partners/update', partner);

      } else {

        response = await api.post('/partners/create', partner);

      }

      if (response.status === 200) {
        Swal.fire({
          title: 'Parceiro cadastrado!',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: colors.confirm,
          confirmButtonText: 'Ok',
        }).then(() => {
          setLoading(false);

          history.push('/partners');
        });

        return;
      }

      Swal.fire({
        title: 'Atenção!',
        text: 'Não foi possível adicionar o parceiro. Tente novamente mais tarde.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } catch (err) {
      Swal.fire({
        title: 'Atenção!',
        text: 'Não foi possível adicionar o parceiro. Tente novamente mais tarde.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }

    setLoading(false);
  };

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
          <h1>Adicionar Parceiro</h1>
          <Link to="/partners">Voltar</Link>
        </div>
        {loading ? (
          <Loading />
        ) : (
            <CustomForm onSubmit={handleSubmit(validateForm)}>
              <h2>Informações do Parceiro</h2>
              <label>
                <span>Nome:</span>
                <input ref={register} type="text" name="name" placeholder="Nome do Parceiro" defaultValue={formInfo.name} />
              </label>
              <label>
                <span>Endereço:</span>
                <input ref={register} type="text" name="address" placeholder="R. Dois, 123" defaultValue={formInfo.address} />
              </label>
              <label>
                <span>Telefone:</span>
                <input ref={register} type="text" name="phone" placeholder="(11)912345678" defaultValue={formInfo.phone} />
              </label>
              <label>
                <span>Tipo:</span>
                <select ref={register} name="type" defaultValue={formInfo.type}>
                  <option value="" disabled>Selecione</option>
                  <option value="customer">Cliente</option>
                  <option value="seller">Vendedor</option>
                </select>
              </label>
              <label>
                <span>Status:</span>
                <select ref={register} name="status" defaultValue={formInfo.status}>
                  <option value="" disabled>Selecione</option>
                  <option value="A">Ativo</option>
                  <option value="I">Inativo</option>
                </select>
              </label>
              <button type="submit">
                {typeof id !== 'undefined' ? 'Atualizar' : 'Adicionar'}
              </button>
            </CustomForm>
          )}
      </Main>
    </div>
  );
};

export default PartnersFormPage;
