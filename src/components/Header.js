import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { FaCoins } from 'react-icons/fa';

import logo from '../img/logo Trybe Wallet.svg';

class Header extends Component {
  render() {
    const { email, totalExpenses } = this.props;
    return (
      <div className="initial-infos">
        <div>
          <img src={ logo } alt="logo" />
        </div>
        <div>
          <FaCoins />
          <h2>Total de despesas: </h2>
          <h2 data-testid="total-field">{ (Number(totalExpenses)).toFixed(2) }</h2>
          <h2 data-testid="header-currency-field"> BRL</h2>
        </div>
        <div>
          <h2 data-testid="email-field">{ email }</h2>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalExpenses: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  totalExpenses: state.wallet.totalExpenses,
});

export default connect(mapStateToProps)(Header);
