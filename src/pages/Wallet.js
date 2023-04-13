import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

import { insertAPI, insertExpenses, insertTotalExpenses } from '../redux/actions';
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
    const { currencies, dispatch, expenses } = this.props;
    const { state } = this;
    const result = await fetchApi();
    const id = expenses.length;
    dispatch(insertExpenses(state, result, id));
    setTimeout(() => {
      this.sumExpenses();
    }, TIME_OUT);
    this.setState({
      value: '',
      description: '',
      currency: currencies[0],
      method: methodInputs[0],
      tag: tagInputs[0],
    });
  };

  sumExpenses = () => {
    const { dispatch, expenses } = this.props;
    const { currency } = this.state;
    const values = expenses
      .map((expense) => expense.value * expense.exchangeRates[currency].ask);
    const soma = values.reduce((acumulador, valorAtual) => acumulador + valorAtual);
    const result = soma.toFixed(2);
    dispatch(insertTotalExpenses(result));
  };

  render() {
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
            method={ method }
            value={ value }
            tag={ tag }
          />
          <Table />
        </main>
      </>
    );
  }
}

Wallet.propTypes = {
  currencies: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.shape({
    length: PropTypes.func,
    map: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
