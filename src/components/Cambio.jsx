import React from 'react';

class Cambio extends React.Component {
  componentDidMount() {
    this.pegaValorApi();
  }

    pegaValorApi = async () => {
      const data = await fetch('https://economia.awesomeapi.com.br/json/all').then((reponse) => reponse.json);
      delete data.USDT;
    }

    render() {
      return (
        <section>

          <p data-testid="header-currency-field">BRL</p>
        </section>
      );
    }
}

export default Cambio;
