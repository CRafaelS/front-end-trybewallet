import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setWallet } from '../actions';

class Table extends Component {
  // https://pt-br.reactjs.org/docs/thinking-in-react.html#step-1-break-the-ui-into-a-component-hierarchy
  // https://developer.mozilla.org/pt-BR/docs/Learn/HTML/Tables/Basics
  // removeExpenses = () => {
  //   const { expenses, walletUpdate } = this.props;
  //   this.setState({
  //     id: expenses.id - 1,

  //   });
  //   walletUpdate(this.state.id);
  // }

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
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
        </thead>
        <tbody>
          {expenses.length > 0 && expenses.map((expense) => (
            <tr key={ expense.id }>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{parseFloat(expense.value).toFixed(2)}</td>
              <td>{expense.exchangeRates[expense.currency].name}</td>
              <td>
                {parseFloat(expense.exchangeRates[expense.currency]
                  .ask).toFixed(2)}

              </td>
              <td>
                {parseFloat(expense.value * expense.exchangeRates[expense.currency]
                  .ask).toFixed(2)}

              </td>
              <td>Real</td>

              <td>
                <button
                  type="button"
                >
                  Editar
                </button>
                /
                <button
                  type="button"
                  onClick={ this.removeExpenses }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  // walletUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  walletUpdate: (wallet) => dispatch(setWallet(wallet)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
