import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencyThunk, setWallet } from '../actions';
import getCurrencyApi from '../services/CurrencyAPI';

class Form extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      currency: 'USD',
      value: '',
      description: '',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { currencySuccess } = this.props;
    currencySuccess();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  saveExpenses = async (event) => {
    event.preventDefault();
    const { id } = this.state;
    this.setState({
      exchangeRates: await getCurrencyApi(),
    });
    const { walletInfos } = this.props;
    walletInfos(this.state);
    this.setState({
      id: id + 1,
      currency: 'USD',
      value: '',
      description: '',
      method: '',
      tag: '',
      exchangeRates: {},
    });
  }

  render() {
    const { currencies } = this.props;
    const { currency, value, description, method, tag } = this.state;
    return (

      <form>
        <label htmlFor="value">
          Valor
          <input
            data-testid="value-input"
            name="value"
            value={ value }
            type="number"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description">
          Descrição
          <input
            data-testid="description-input"
            name="description"
            value={ description }
            type="text"
            id="description"
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            data-testid="currency-input"
            name="currency"
            value={ currency }
            id="currency"
            onChange={ this.handleChange }
          >
            { currencies.filter((removeCurrency) => removeCurrency !== 'USDT')
              .map((eachCurrency, index) => (
                <option key={ index } data-testid="USD">
                  { eachCurrency }
                </option>
              ))}
          </select>
        </label>
        <label htmlFor="method">
          Método de Pagamento
          <select
            id="method"
            name="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria
          <select
            id="tag"
            name="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.handleChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="submit"
          onClick={ this.saveExpenses }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  walletInfos: (wallet) => dispatch(setWallet(wallet)),
  currencySuccess: () => dispatch(fetchCurrencyThunk()),
});

Form.propTypes = {
  currencies: PropTypes.arrayOf(Object).isRequired,
  currencySuccess: PropTypes.func.isRequired,
  walletInfos: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
