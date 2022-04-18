import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { pegarMoeda } from '../actions';

class Cambio extends React.Component {
  componentDidMount() {
    this.pegaValorApi();
  }

  pegaValorApi = async () => {
    const { myDispatch } = this.props;
    const data = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
    delete data.USDT;
    myDispatch(Object.keys(data));
  }

  render() {
    return (
      <section>
        <p data-testid="header-currency-field">BRL</p>
      </section>
    );
  }
}

Cambio.propTypes = {
  myDispatch: propTypes.func,

}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  myDispatch: (state) => dispatch(pegarMoeda(state)),
});

export default connect(null, mapDispatchToProps)(Cambio);
