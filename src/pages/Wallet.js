import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

import {
  insertAPI,
  insertExpenses,
  insertTotalExpenses,
  insertNewExpensesEdit } from '../redux/actions';
import fetchApi from '../helpers/FetchAPI';

const TIME_OUT = 500;

const methodInputs = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const tagInputs = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

class Wallet extends React.Component {
  state = {
    description: '',
    currency: '',
    method: '',
    value: '',
    tag: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(insertAPI());
    setTimeout(() => {
      const { currencies } = this.props;
      this.setState({
        currency: currencies[0],
        method: methodInputs[0],
        tag: tagInputs[0] });
    }, TIME_OUT);
  }

  handleChanges = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { currencies, dispatch } = this.props;
    const { state } = this;
    const result = await fetchApi();
    dispatch(insertExpenses(state, result));
    dispatch(insertTotalExpenses());
    this.setState({
      value: '',
      description: '',
      currency: currencies[0],
      method: methodInputs[0],
      tag: tagInputs[0],
    });
  };

  handleSubmitEdit = async (e) => {
    e.preventDefault();
    const { currencies, dispatch, expenses, idToEdit } = this.props;
    const { state } = this;
    const newExpenses = expenses.filter((expense) => expense.id !== idToEdit);
    console.log(newExpenses);
    const result = await fetchApi();
    dispatch(insertNewExpensesEdit(newExpenses, state, result, idToEdit));
    dispatch(insertTotalExpenses());
    this.setState({
      value: '',
      description: '',
      currency: currencies[0],
      method: methodInputs[0],
      tag: tagInputs[0],
    });
  };

  render() {
    const { expenses } = this.props;
    const { currency, description, method, value, tag } = this.state;
    return (
      <>
        <div>TrybeWallet</div>
        <Header />
        <main>
          <WalletForm
            methodInputs={ methodInputs }
            tagInputs={ tagInputs }
            currency={ currency }
            description={ description }
            handleChanges={ this.handleChanges }
            handleSubmit={ this.handleSubmit }
            handleSubmitEdit={ this.handleSubmitEdit }
            method={ method }
            value={ value }
            tag={ tag }
          />
          <Table expenses={ expenses } />
        </main>
      </>
    );
  }
}

Wallet.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.any,
    ),
  ).isRequired,
  idToEdit: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  idToEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(Wallet);
