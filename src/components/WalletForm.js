import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletForm extends Component {
  render() {
    const {
      methodInputs,
      tagInputs,
      currencies,
      currency,
      description,
      method,
      value,
      tag,
      handleChanges,
      handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={ handleSubmit }>
          <input
            data-testid="value-input"
            name="value"
            onChange={ handleChanges }
            type="number"
            value={ value }
          />
          <input
            data-testid="description-input"
            name="description"
            onChange={ handleChanges }
            type="text"
            value={ description }
          />
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ handleChanges }
            value={ currency }
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
            onChange={ handleChanges }
            value={ method }
          >
            { methodInputs.map((methods, index) => (
              <option key={ index }>{ methods }</option>
            ))}
          </select>
          <select
            data-testid="tag-input"
            name="tag"
            onChange={ handleChanges }
            value={ tag }
          >
            { tagInputs.map((tags, index) => (
              <option key={ index }>{ tags }</option>
            ))}
          </select>
          <button type="submit">Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
    { map: PropTypes.func },
  ).isRequired,
  currency: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleChanges: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
  methodInputs: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  tag: PropTypes.string.isRequired,
  tagInputs: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  value: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
