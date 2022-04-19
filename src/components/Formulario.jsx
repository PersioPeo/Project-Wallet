import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { salvaForm } from '../actions';
import './Formulario.css';

class Formulario extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      id: 0,

    };
  }

  fetchMoeda = async () => {
    const data = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
    return data;
  }

  salvaDespGlob = async () => {
    const exchangeRates = await this.fetchMoeda();
    const { myDispatch } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    myDispatch({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,

    });
    this.setState({
      value: 0,
      description: '',
    });
    this.setState((prev) => ({
      id: prev.id + 1,
    }));
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { moedaGlobal } = this.props;

    return (
      <forms onSubmit={ (e) => e.preventDefault() } className="container">
        <div>
          <input
            data-testid="value-input"
            placeholder="Valor"
            name="value"
            value={ value }
            onChange={ (
              { target: { value: valor } },
            ) => this.setState(
              { value: valor },
            ) }
          />
        </div>
        <div>
          <input
            data-testid="description-input"
            placeholder="Desc"
            value={ description }
            onChange={ (
              { target: { value: valor } },
            ) => this.setState(
              { description: valor },
            ) }
          />
        </div>
        <div>
          <label htmlFor="currency">
            Moeda
            <select
              name="currency"
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ (
                { target: { value: valor } },
              ) => this.setState(
                { currency: valor },
              ) }
            >
              {moedaGlobal.map((item, key) => <option key={ key }>{ item }</option>)}

            </select>
          </label>
        </div>
        <div>
          <label htmlFor="method">
            Método de Pagamento
            <select
              name="method"
              id="method"
              data-testid="method-input"
              value={ method }
              onChange={ (
                { target: { value: valor } },
              ) => this.setState(
                { method: valor },
              ) }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="tag">
            Método de Pagamento
            <select
              name="tag"
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ (
                { target: { value: valor } },
              ) => this.setState(
                { tag: valor },
              ) }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
        <div>
          <button
            type="submit"
            onClick={ this.salvaDespGlob }
          >
            Adicionar despesa
          </button>
        </div>
      </forms>
    );
  }
}

Formulario.propTypes = {
  currencies: propTypes.shape(propTypes.string),
  email: propTypes.string,
  currency: propTypes.string,
  method: propTypes.string,
  tag: propTypes.string,
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
