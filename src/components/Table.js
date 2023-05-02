import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { insertNewExpenses, insertTotalExpenses, requestEdit } from '../redux/actions';

class Table extends Component {
  deleteExpense = (id) => {
    const { expenses, dispatch } = this.props;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    dispatch(insertNewExpenses(newExpenses));
    dispatch(insertTotalExpenses());
  };

  handleEdit = (id) => {
    console.log(id);
    const { dispatch } = this.props;
    dispatch(requestEdit(id));
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="content-table">
        <table>
          <thead className="header-table">
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
          <tbody className="body-table">
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
                  <td>Real</td>
                  <td>
                    <BiTrash
                      className="trash-button"
                      onClick={ () => this.deleteExpense(expense.id) }
                    />
                    <BiEdit
                      className="edit-button"
                      onClick={ () => this.handleEdit(expense.id) }
                    />
                  </td>
                </tr>))
            }
          </tbody>
        </table>
      </div>
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
