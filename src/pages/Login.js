import React from 'react';
import PropTypes from 'prop-types';

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
        const { password } = this.state;
        if (password.length >= MAX_LENGTH) {
          this.setState({ disabled: false });
        } else {
          this.setState({ disabled: true });
        }
      },
    );
  };

  handleSubmit = () => {
    const { history } = this.props;
    history.push('/carteira');
  };

  render() {
    const { email, password, disabled } = this.state;
    return (
      <div className="containerLogin">
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
          className="button-login"
          disabled={ disabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.shape(
    PropTypes.func,
  ).isRequired,
  push: PropTypes.func.isRequired,
};
