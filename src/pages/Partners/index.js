import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

import {
  withStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper
} from '@material-ui/core';

import SidePanel from '../../components/SidePanel';
import UserPanel from '../../components/UserPanel';
import Main from '../../components/Main';
import DataNotFound from '../../components/DataNotFound';
import Loading from '../../components/Loading';

import { api } from '../../services/api';
import formatPartner from '../../utils/formatParner';
import formatStatus from '../../utils/formatStatus';
import { colors } from '../../styles/global';

import { StatusBadge } from './styles';

const StyledTable = withStyles((theme) => ({
  root: {
    '& th': {
      fontWeight: 'bold',
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
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  return (
    <div className="global-container">
      <SidePanel>
        <UserPanel />
      </SidePanel>
      <Main>
        <div className="content-title">
          <h1>Parceiros</h1>
          <Link to="/partner">Adicionar</Link>
        </div>
        {loading ? (
          <Loading />
        ) : (
            partners.length > 0 ? (
              <TableContainer component={Paper}>
                <StyledTable aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Editar</TableCell>
                      <TableCell>Nome</TableCell>
                      <TableCell>Endereço</TableCell>
                      <TableCell>Telefone</TableCell>
                      <TableCell>Tipo</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? partners.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : partners
                    ).map((partner) => (
                      <StyledTableRow key={partner.id}>
                        <TableCell className="center">
                          <Link to={`/partner/${partner.id}`}>
                            <FaEdit
                              title="Editar"
                              className="icon-edit"
                            />
                          </Link>
                        </TableCell>
                        <TableCell className="center">{partner.name}</TableCell>
                        <TableCell>{partner.address}</TableCell>
                        <TableCell className="center">{partner.phone}</TableCell>
                        <TableCell className="center">{formatPartner(partner.type)}</TableCell>
                        <TableCell>
                          <StatusBadge status={partner.status}>
                            {formatStatus(partner.status)}
                          </StatusBadge>
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10]}
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
