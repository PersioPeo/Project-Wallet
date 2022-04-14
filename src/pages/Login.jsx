import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <div>
        <input
          data-testid="email-input"
          placeholder="Email"
          type="text"
        />
        <input
          data-testid="password-input"
          placeholder="Senha"
          type="password"
        />
      </div>

    );
  }
}

export default Login;
