import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import emailLogin from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validateButton: true,
    };
  }

  loginValidate = ({ target }) => {
    const { name, value } = target;
    this.setState(({
      [name]: value,
    }), () => {
      const { email, password } = this.state;
      const emailVal = email.includes('@');
      const emailCom = email.endsWith('.com');
      const minLength = 6;
      if (emailVal && emailCom && password.length >= minLength) {
        this.setState({
          validateButton: false,
        });
      } else {
        this.setState({
          validateButton: true,
        });
      }
    });
  }

  changePage = (event) => {
    event.preventDefault();
    const { history, emailLoginDispatch } = this.props;
    const { email } = this.state;
    emailLoginDispatch(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, validateButton } = this.state;
    return (
      <div className="login">
        <h1>Trybe Wallet</h1>
        <form className="loginForm">
          <input
            type="email"
            value={ email }
            name="email"
            data-testid="email-input"
            placeholder="Digite seu email"
            onChange={ this.loginValidate }
          />
          <input
            type="password"
            name="password"
            value={ password }
            data-testid="password-input"
            placeholder="Digite sua senha"
            onChange={ this.loginValidate }
          />
          <button
            type="submit"
            disabled={ validateButton }
            onClick={ this.changePage }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  emailLoginDispatch: (email) => dispatch(emailLogin(email)),
});

Login.propTypes = {
  emailLoginDispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
