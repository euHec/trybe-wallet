import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletForm extends Component {
  render() {
    const {
      currencies,
      editor,
      methodInputs,
      tagInputs,
      currency,
      description,
      method,
      value,
      tag,
      handleChanges,
      handleSubmit,
      handleSubmitEdit } = this.props;
    return (
      <form
        className="form-Wallet"
        onSubmit={ editor ? handleSubmitEdit : handleSubmit }
      >
        <div>
          <input
            className="input-form"
            data-testid="value-input"
            name="value"
            onChange={ handleChanges }
            placeholder="Valor"
            type="number"
            value={ value }
          />
          <input
            className="input-form"
            data-testid="description-input"
            name="description"
            onChange={ handleChanges }
            placeholder="Descrição da despesa"
            type="text"
            value={ description }
          />
        </div>
        <div>
          <select
            className="input-form-select"
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
            className="input-form-select"
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
            className="input-form-select"
            data-testid="tag-input"
            name="tag"
            onChange={ handleChanges }
            value={ tag }
          >
            { tagInputs.map((tags, index) => (
              <option key={ index }>{ tags }</option>
            ))}
          </select>
        </div>
        { editor
          ? <button type="submit">Editar despesa</button>
          : <button type="submit">Adicionar despesa</button> }
      </form>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.string,
    { map: PropTypes.func },
  ).isRequired,
  editor: PropTypes.bool.isRequired,
  currency: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleChanges: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleSubmitEdit: PropTypes.func.isRequired,
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
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(WalletForm);
