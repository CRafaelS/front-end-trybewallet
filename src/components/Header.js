import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sunExpenses = () => {
    const { currencies } = this.props;
    let sun = 0;
    if (currencies.length > 0) {
      currencies.forEach(({ value, exchangeRates, currency }) => {
        (sun += value * exchangeRates[currency].ask);
      });
    }
    return sun;
  };

  render() {
    const { user, currencies } = this.props;

    return (
      <header>
        <label htmlFor="email">
          Email:
          <h3 data-testid="email-field" id="email">{ user }</h3>
        </label>
        <label htmlFor="expenses">
          Despesa Total R$
          <h3 data-testid="total-field" id="expenses">
            { currencies.length === 0
              ? '0,00'
              : this.sunExpenses() }
          </h3>
        </label>
        <h3 data-testid="header-currency-field">
          BRL
        </h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  currencies: state.wallet.expenses,
});

Header.propTypes = {
  user: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps)(Header);
