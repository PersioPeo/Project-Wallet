import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Tabela extends React.Component {
  render() {
    const { expenses } = this.props;

    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Método de pagamento</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(({
              description,
              tag,
              method,
              value,
              currency,
              exchangeRates,
              id,
            }) => (
              <tr key={ id }>
                <td>{ description }</td>
                <td>{ tag }</td>
                <td>{ method }</td>
                <td>{parseFloat(value).toFixed(2) }</td>
                <td>{exchangeRates[currency].name.split('/')[0]}</td>
                <td>
                  {parseFloat(exchangeRates[currency].ask).toFixed(2)}
                  {' '}
                </td>
                <td>{(value * exchangeRates[currency].ask).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                  >
                    Editar/Excluir
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
Tabela.propTypes = {
  expenses: propTypes.shape(propTypes.string),
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Tabela);
