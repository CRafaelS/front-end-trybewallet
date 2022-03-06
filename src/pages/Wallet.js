import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expenses: 0,
      currency: 'BRL',
    };
  }

  render() {
    const { user } = this.props;
    const { expenses, currency } = this.state;
    return (
      <header>
        <h3 data-testid="email-field">{ user }</h3>
        <h3 data-testid="total-field">
          { expenses }
        </h3>
        <h3 data-testid="header-currency-field">
          { currency }
        </h3>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
});

Wallet.propTypes = {
  user: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(Wallet);
