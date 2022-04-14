import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',

    };
  }

  render() {
    const { email, senha } = this.state;
    const SEIS = 6;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return (
      <div>
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
        >
          Entrar
        </button>
      </div>

    );
  }
}

export default Login;
