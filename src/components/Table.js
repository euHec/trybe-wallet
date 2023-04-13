import PropTypes from 'prop-types';
import React, { Component } from 'react';
// import { connect } from 'react-redux';

class Table extends Component {
  // numFormated = (num) => {
  //   const returned = (num.parseFloat()).toFixed(2);
  //   return returned;
  // };

  render() {
    const { expenses } = this.props;
    return (
      <>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses?.map((expense, index) => (
                <tr key={ index }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{ (Number(expense.value)).toFixed(2) }</td>
                  <td>{expense.exchangeRates[expense.currency].name}</td>
                  <td>
                    {
                      Number(expense.exchangeRates[expense.currency].ask)
                        .toFixed(2)
                    }
                  </td>
                  <td>
                    {
                      (expense.value * expense.exchangeRates[expense.currency].ask)
                        .toFixed(2)
                    }
                  </td>
                  <td><p>Real</p></td>
                  <td>
                    <button>Editar</button>
                    <button>Excluir</button>
                  </td>
                </tr>))
            }
          </tbody>
        </table>
        {/* <h1>{ expenses[0].description }</h1> */}
      </>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
    }),
  ).isRequired,
};

// const mapStateToProps = (state) => ({
//   expenses: state.wallet.expenses,
// });

export default Table;
