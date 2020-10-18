import React from 'react';
import { Table } from './styles';

const ItemsTable = ({ items }) => {

  if (typeof items[0] !== 'undefined') {

    const fields = Object.getOwnPropertyNames(items[0]);

    return (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Marca</th>
            <th>Fornecedor</th>
            <th>Classificação</th>
            <th>Custo</th>
            <th>Venda</th>
            <th>Qtd estoque</th>
            <th>Qtd loja</th>
            <th>Criação</th>
            <th>Atualização</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              {fields.map((field, i) => {
                if (typeof item[field]) {
                  // prepare field
                }
                return <td key={i}>{item[field]}</td>
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    )
  } else {
    return (
      <h1>Nenhum item encontrado.</h1>
    )
  }
}

export default ItemsTable;