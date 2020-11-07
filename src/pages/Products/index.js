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
import formatValue from '../../utils/formatValue';
import { colors } from '../../styles/global';

import { QtdBadge } from './styles';

const StyledTable = withStyles((theme) => ({
  root: {
    '& th': {
      fontWeight: 'bold',
      backgroundColor: colors.bgPrimary,
      color: '#FFF'
    },
    '& *': {
      fontSize: 15,
      textAlign: 'center',
      // color: '#555'
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

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const response = await api.get('/products/list');

      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch (err) {
      Swal.fire({
        title: 'Não foi possível listar os produtos. Tente novamente mais tarde.',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="global-container">
      <SidePanel>
        <UserPanel />
      </SidePanel>
      <Main>
        <div className="content-title">
          <h1>Produtos</h1>
          <Link to="/product">Adicionar</Link>
        </div>
        {loading ? (
          <Loading />
        ) : (
            products.length > 0 ? (
              <TableContainer component={Paper}>
                <StyledTable aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Editar</TableCell>
                      <TableCell>Produto</TableCell>
                      <TableCell>Marca</TableCell>
                      <TableCell>Fornecedor</TableCell>
                      <TableCell>Custo</TableCell>
                      <TableCell>Venda</TableCell>
                      <TableCell>Qtd Estoque</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : products
                    ).map((product) => (
                      <StyledTableRow key={product.id}>
                        <TableCell className="center">
                          <Link to={`/product/${product.id}`}>
                            <FaEdit
                              title="Editar"
                              className="icon-edit"
                            />
                          </Link>
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.brand}</TableCell>
                        <TableCell>{product.provider}</TableCell>
                        <TableCell>{formatValue(product.cost_price)}</TableCell>
                        <TableCell>{formatValue(product.sale_price)}</TableCell>
                        <TableCell>
                          <QtdBadge qtd={product.stock_quantity}>
                            {product.stock_quantity}
                          </QtdBadge>
                        </TableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10]}
                        labelRowsPerPage="Produtos por página"
                        colSpan={8}
                        count={products.length}
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
                  <h2>Nenhum produto encontrado.</h2>
                </DataNotFound>
              )
          )}
      </Main>
    </div>
  );
};

export default Products;
