import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header>
        <h1 data-testid="total-field">0</h1>
        <h1 data-testid="header-currency-field">BRL</h1>
        <h1 data-testid="email-field">{ email }</h1>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
