import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletForm extends Component {
  state = {
    number: 0,
    description: '',
    coin: '',
    method: '',
    tag: '',
  };

  handleChanges = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const methodInputs = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tagInputs = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const { currencies } = this.props;
    const { coin, description, method, number, tag } = this.state;
    return (
      <div>
        <form>
          <input
            data-testid="value-input"
            name="number"
            onChange={ this.handleChanges }
            type="number"
            value={ number }
          />
          <input
            data-testid="description-input"
            name="description"
            onChange={ this.handleChanges }
            type="text"
            value={ description }
          />
          <select
            data-testid="currency-input"
            name="coin"
            onChange={ this.handleChanges }
            value={ coin }
          >
            {
              currencies.map((currencie, index) => (
                <option key={ index }>{ currencie }</option>
              ))
            }
          </select>
          <select
            data-testid="method-input"
            name="method"
            onChange={ this.handleChanges }
            value={ method }
          >
            { methodInputs.map((methods, index) => (
              <option key={ index }>{ methods }</option>
            ))}
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChanges }
            value={ tag }
          >
            { tagInputs.map((tags, index) => (
              <option key={ index }>{ tags }</option>
            ))}
          </select>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
