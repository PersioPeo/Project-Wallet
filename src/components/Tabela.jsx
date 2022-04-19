import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletaDespesa } from '../actions';

class Tabela extends React.Component {
  deletaItem = (id) => {
    const { expenses, myDispatch } = this.props;
    const itensAserMantido = expenses.filter((item) => item.id !== id);
    myDispatch(itensAserMantido);
  }

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
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.deletaItem(id) }
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
  dispatch: propTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  myDispatch: (state) => dispatch(deletaDespesa(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabela);
