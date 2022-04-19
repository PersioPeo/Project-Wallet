import React from 'react';
import Header from '../components/Header';
import Formulario from '../components/Formulario';
import Tabela from '../components/Tabela';

class Wallet extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Formulario />
        <Tabela />

      </>
    );
  }
}

export default Wallet;
