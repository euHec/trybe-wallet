import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import { fetchApi } from '../redux/actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchApi());
  }

  render() {
    return (
      <>
        <Header />
        <main>
          <WalletForm />
          <div>TrybeWallet</div>
        </main>
      </>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Wallet);
