import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { insertUser } from '../redux/actions/index';
import validEmail from '../helpers/validEmail';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disabled: true,
  };

  handleChanges = ({ target }) => {
    const { name, value } = target;
    this.setState(
      { [name]: value },
      () => {
        const MAX_LENGTH = 6;
        const { password, email } = this.state;
        if (password.length >= MAX_LENGTH && validEmail(email)) {
          this.setState({ disabled: false });
        } else {
          this.setState({ disabled: true });
        }
      },
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { history, dispatch } = this.props;
    const { state } = this;
    dispatch(insertUser(state));
    history.push('/carteira');
  };

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div className="containerLogin">
        <form onSubmit={ this.handleSubmit }>
          <input
            className="input-login"
            data-testid="email-input"
            name="email"
            onChange={ this.handleChanges }
            placeholder="exemple@email.com"
            required
            type="email"
            value={ email }
          />
          <input
            className="input-login"
            data-testid="password-input"
            name="password"
            onChange={ this.handleChanges }
            placeholder="senha@123"
            required
            type="password"
            value={ password }
          />
          <button
            type="submit"
            className="input-login"
            disabled={ disabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
