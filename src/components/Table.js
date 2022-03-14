import React, { Component } from 'react';

class Table extends Component {
  // https://pt-br.reactjs.org/docs/thinking-in-react.html#step-1-break-the-ui-into-a-component-hierarchy
  render() {
    return (
      <tr>
        <th> Descrição </th>
        <th> Tag </th>
        <th> Método de pagamento </th>
        <th> Valor </th>
        <th> Moeda </th>
        <th> Câmbio utilizado </th>
        <th> Valor convertido </th>
        <th> Moeda de conversão </th>
        <th> Editar/Excluir </th>
      </tr>
    );
  }
}

export default Table;
