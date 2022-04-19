import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { salvarEmail } from '../actions';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',

    };
  }

  gravaNoEstado = () => {
    const { history: { push }, myDispatch } = this.props;
    const { email } = this.state;
    myDispatch(email);
    push('/carteira');
  }

  render() {
    const { email, senha } = this.state;
    const SEIS = 6;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return (
      <div className="container">
        <input
          data-testid="email-input"
          placeholder="Email"
          type="text"
          onChange={ ({ target: { value } }) => this.setState({ email: value }) }
        />
        <input
          data-testid="password-input"
          placeholder="Senha"
          type="password"
          onChange={ ({ target: { value } }) => this.setState({ senha: value }) }
        />
        <button
          type="button"
          disabled={ !(regex.test(email) && senha.length >= SEIS) }
          onClick={ this.gravaNoEstado }
        >
          Entrar
        </button>
      </div>

    );
  }
}

Login.propTypes = {
  dispatch: propTypes.func,
  history: propTypes.shape({
    push: propTypes.func.isRequired,
  }),
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  myDispatch: (state) => dispatch(salvarEmail(state)),
});
export default connect(null, mapDispatchToProps)(Login);
