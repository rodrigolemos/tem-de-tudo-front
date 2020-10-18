import React, { useState, useEffect } from 'react';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';
import Loading from '../../components/Loading';

import { api } from '../../services/api';

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

  return (
    <div className="global-container">
      <SidePanel>
        <UserPanel />
      </SidePanel>
      <Main>
        <h1 className="content-title">Parceiros</h1>
        {loading ? (
          <Loading />
        ) : (
          partners.length > 0 ? (
            <table className="custom-table">
              <thead>
                <tr>
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
                    <td>{partner.id}</td>
                    <td>{partner.name}</td>
                    <td>{partner.address}</td>
                    <td>{partner.phone}</td>
                    <td>{partner.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h2>Nenhum parceiro encontrado.</h2>
          )
        )}
      </Main>
    </div>
  )
};

export default Partners;