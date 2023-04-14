import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { insertNewExpenses, insertTotalExpenses, requestEdit } from '../redux/actions';

const TIME_OUT = 500;

class Table extends Component {
  deleteExpense = (id) => {
    const { expenses, dispatch } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    dispatch(insertNewExpenses(newExpenses));
    setTimeout(() => {
      this.sumExpenses();
    }, TIME_OUT);
  };

  handleEdit = (id) => {
    console.log(id);
    const { dispatch } = this.props;
    dispatch(requestEdit(id));
  };

  sumExpenses = () => {
    const { dispatch, expenses } = this.props;
    if (expenses.length === 0) {
      const result = '0';
      dispatch(insertTotalExpenses(result));
    } else {
      const values = expenses
        .map((expense) => expense.value * expense.exchangeRates[expense.currency].ask);
      const soma = values.reduce((acumulador, valorAtual) => acumulador + valorAtual);
      const result = soma.toFixed(2);
      dispatch(insertTotalExpenses(result));
    }
  };

  render() {
    const { expenses } = this.props;
    return (
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
            expenses?.map((expense) => (
              <tr key={ expense.id }>
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
                  <button
                    data-testid="delete-btn"
                    onClick={ () => this.deleteExpense(expense.id) }
                  >
                    Excluir
                  </button>
                  <button
                    data-testid="edit-btn"
                    onClick={ () => this.handleEdit(expense.id) }
                  >
                    Editar
                  </button>
                </td>
              </tr>))
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
    }),
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Table);
