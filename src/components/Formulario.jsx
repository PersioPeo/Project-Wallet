import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { salvaForm } from '../actions';

class Formulario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vlDespesa: '',
      descDespesa: '',
      moeda: 'USD',
      metodo: 'Dinheiro',
      categoria: 'Alimentação',
      id: '0',

    };
  }

  fetchMoeda = async () => {
    const data = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
    return data;
  }

  salvaDespGlob = async () => {
    const exchangeRates = await this.fetchMoeda();
    const { myDispatch } = this.props;
    const { id,
      vlDespesa,
      descDespesa,
      moeda,
      metodo,
      categoria } = this.state;
    myDispatch({
      id,
      vlDespesa,
      descDespesa,
      moeda,
      metodo,
      categoria,
      exchangeRates,

    });
    this.setState({
      vlDespesa: 0,
      descDespesa: '',
    });
    this.setState((prev) => ({
      id: prev.id + 1,
    }));
  }

  render() {
    const { vlDespesa, descDespesa, moeda, metodo, categoria } = this.state;
    const { moedaGlobal } = this.props;

    return (
      <forms onSubmit={ (e) => e.preventDefault() }>

        <input
          data-testid="value-input"
          value={ vlDespesa }
          onChange={ ({ target: { value } }) => this.setState({ vlDespesa: value }) }
        />
        <input
          data-testid="description-input"
          value={ descDespesa }
          onChange={ ({ target: { value } }) => this.setState({ descDespesa: value }) }
        />
        <label htmlFor="currency">
          Moeda
          <select
            name="currency"
            id="currency"
            data-testid="currency-input"
            value={ moeda }
            onChange={ ({ target: { value } }) => this.setState({ moeda: value }) }
          >
            {moedaGlobal.map((item, key) => <option key={ key }>{ item }</option>)}

          </select>
        </label>

        <label htmlFor="method">
          Método de Pagamento
          <select
            name="method"
            id="method"
            data-testid="method-input"
            value={ metodo }
            onChange={ ({ target: { value } }) => this.setState({ metodo: value }) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Método de Pagamento
          <select
            name="tag"
            id="tag"
            data-testid="tag-input"
            value={ categoria }
            onChange={ ({ target: { value } }) => this.setState({ categoria: value }) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          type="submit"
          onClick={ this.salvaDespGlob }
        >
          Adicionar despesa
        </button>
      </forms>

    );
  }
}

Formulario.propTypes = {
  currencies: propTypes.shape(propTypes.string),
  email: propTypes.string,
  moeda: propTypes.string,
  metodo: propTypes.string,
  categoria: propTypes.string,
  id: propTypes.string,
  moedaGlobal: propTypes.shape(propTypes.string),
}.isRequired;

const mapStateToProps = (state) => ({
  moedaGlobal: state.wallet.currencies,
});
const mapDispatchToProps = (dispatch) => ({
  myDispatch: (state) => dispatch(salvaForm(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Formulario);
