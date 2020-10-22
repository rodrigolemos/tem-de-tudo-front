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
import formatPartner from '../../utils/formatParner';

const Partners = () => {

  const [loading, setLoading] = useState(false);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {

    setLoading(true);

    try {

      const response = await api.get('/partners/list');

      if (response.status === 200) {
        setPartners(response.data);
      }

    } catch (err) {

      console.log(err);

    }

    setLoading(false);

  }

  const removePartner = async (id) => {

    if (window.confirm('Deseja realmente remover o parceiro?')) {

      setLoading(true);

      try {

        const response = await api.put(`/partners/remove/${id}`);

        if (response.status === 200) {

          setPartners(...[partners.filter(partner => partner.id !== id)]);

          Swal.fire({
            title: 'Parceiro removido!',
            icon: 'success',
            confirmButtonText: 'Ok'
          });

        }

      } catch (err) {

        console.log(err);

      }

      setLoading(false);

    }

  }

  return (
    <div className="global-container">
      <SidePanel>
        <UserPanel />
      </SidePanel>
      <Main>
        <div className="content-title">
          <h1>Parceiros</h1>
          <Link to="/partners/add">Adicionar</Link>
        </div>
        {loading ? (
          <Loading />
        ) : (
          partners.length > 0 ? (
            <table className="custom-table">
              <thead>
                <tr>
                  <th></th>
                  <th>ID</th>
                  <th>Nome</th>
                  <th>Endereço</th>
                  <th>Telefone</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {partners.map(partner => (
                  <tr key={partner.id}>
                    <td className="center">
                      <IoIosRemoveCircleOutline
                        title="Remover parceiro"
                        className="icon-remove"
                        onClick={() => removePartner(partner.id)}
                      />
                    </td>
                    <td className="center">{partner.id}</td>
                    <td className="center">{partner.name}</td>
                    <td>{partner.address}</td>
                    <td className="center">{partner.phone}</td>
                    <td className="center">{formatPartner(partner.type)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <DataNotFound>
              <h2>Nenhum parceiro encontrado.</h2>
            </DataNotFound>
          )
        )}
      </Main>
    </div>
  )
};

export default Partners;