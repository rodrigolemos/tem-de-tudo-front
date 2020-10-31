import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosRemoveCircleOutline } from 'react-icons/io';
import Swal from 'sweetalert2';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';
import DataNotFound from '../../components/DataNotFound';
import Loading from '../../components/Loading';

import { api } from '../../services/api';
import formatPartner from '../../utils/formatParner';
import { colors } from '../../styles/global';

const StyledTable = withStyles((theme) => ({
  root: {
    '& th': {
      backgroundColor: colors.bgPrimary,
      color: '#FFF'
    },
    '& *': {
      fontSize: 15,
      textAlign: 'center'
    },
  }
}))(Table);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Partners = () => {
  const [loading, setLoading] = useState(false);
  const [partners, setPartners] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchPartners = async () => {
    setLoading(true);

    try {
      const response = await api.get('/partners/list');

      if (response.status === 200) {
        setPartners(response.data);
      }
    } catch (err) {
      Swal.fire({
        title: 'Não foi possível listar os parceiros. Tente novamente mais tarde.',
        icon: 'warning',
        confirmButtonText: 'Ok',
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const removePartner = async (id) => {
    Swal.fire({
      title: 'Deseja realmente remover o parceiro?',
      text: 'O histórico de vendas não será afetado',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: colors.confirm,
      cancelButtonColor: colors.cancel,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);

        try {
          const response = await api.put(`/partners/remove/${id}`);

          if (response.status === 200) {
            setPartners(...[partners.filter((partner) => partner.id !== id)]);

            Swal.fire({
              title: 'Parceiro removido!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          }
        } catch (err) {
          Swal.fire({
            title: 'Não foi possível remover o parceiro. Tente novamente mais tarde.',
            icon: 'warning',
            confirmButtonText: 'Ok',
          });
        }

        setLoading(false);
      }
    });
  };

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
              <TableContainer component={Paper}>
                <StyledTable aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Remover</TableCell>
                      <TableCell>Nome</TableCell>
                      <TableCell>Endereço</TableCell>
                      <TableCell>Telefone</TableCell>
                      <TableCell>Tipo</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? partners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : partners
                    ).map((partner) => (
                      <StyledTableRow key={partner.id}>
                        <TableCell className="center">
                          <IoIosRemoveCircleOutline
                            title="Remover parceiro"
                            className="icon-remove"
                            onClick={() => removePartner(partner.id)}
                          />
                        </TableCell>
                        <TableCell className="center">{partner.name}</TableCell>
                        <TableCell>{partner.address}</TableCell>
                        <TableCell className="center">{partner.phone}</TableCell>
                        <TableCell className="center">{formatPartner(partner.type)}</TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                        labelRowsPerPage="Parceiros por página"
                        colSpan={7}
                        count={partners.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: { 'aria-label': 'Produtos por página' },
                          native: true,
                        }}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                      />
                    </TableRow>
                  </TableFooter>
                </StyledTable>
              </TableContainer>
            ) : (
                <DataNotFound>
                  <h2>Nenhum parceiro encontrado.</h2>
                </DataNotFound>
              )
          )}
      </Main>
    </div>
  );
};

export default Partners;
