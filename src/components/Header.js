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
        <img src={ logo } alt="logo" />
        <h2>
          <FaCoins />
          { `Total de despesas: ${(Number(totalExpenses)).toFixed(2)} BRL` }
        </h2>
        <h2 data-testid="email-field">{ email }</h2>
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
