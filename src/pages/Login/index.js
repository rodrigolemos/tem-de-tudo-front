import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import Swal from 'sweetalert2';

import Main from '../../components/Main';
import CustomForm from '../../components/CustomForm';
import Loading from '../../components/Loading';

// import { api } from '../../services/api';
// import { colors } from '../../styles/global';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  /*
  const submitForm = async (partner) => {
    setLoading(true);

    try {

      const response = await api.post('/partners/create', partner);

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
  */

  const validateForm = async (partner) => {
    setLoading(false);
    /*
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
    */
  };


  return (
    <div className="global-container">
      <Main>
        {loading ? (
          <Loading />
        ) : (
            <CustomForm onSubmit={handleSubmit(validateForm)}>
              <h2>Entrar na plataforma</h2>
              <input ref={register} type="email" name="email" placeholder="Email cadastrado" />
              <input ref={register} type="password" name="password" placeholder="Senha" />
              <button type="submit">
                Entrar
              </button>
            </CustomForm>
          )}
      </Main>
    </div>
  );
};

export default Login;
