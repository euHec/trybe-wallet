import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Pagina de login', () => {
  it('Testa se os componentes estão presentes na tela', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button');

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('O botão é ativado quando é inserido um e-mail válido e senha maior que 6 digitos', () => {
    renderWithRouterAndRedux(<App />);

    const rightEmail = 'exemple@email.com';
    const rightPassword = '@12345';

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();

    userEvent.type(inputEmail, rightEmail);
    expect(inputEmail).toHaveValue(rightEmail);
    expect(button).toBeDisabled();

    userEvent.type(inputPassword, rightPassword);
    expect(inputPassword).toHaveValue(rightPassword);
    expect(button).not.toBeDisabled();
  });

  it('O botão não é ativado quando é inserido um e-mail válido e senha menor que 6 digitos', () => {
    renderWithRouterAndRedux(<App />);

    const wrongEmail = 'exemple.com';
    const wrongPassword = '@1234';

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button');

    expect(button).toBeDisabled();

    userEvent.type(inputEmail, wrongEmail);
    expect(inputEmail).toHaveValue(wrongEmail);
    expect(button).toBeDisabled();

    userEvent.type(inputPassword, wrongPassword);
    expect(inputPassword).toHaveValue(wrongPassword);
    expect(button).toBeDisabled();
  });

  it('Ao clicar no botão de entrar é direcionado para a rota "/carteira"', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const rightEmail = 'exemple@email.com';
    const rightPassword = '@12345';

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const button = screen.getByRole('button');

    userEvent.type(inputEmail, rightEmail);
    userEvent.type(inputPassword, rightPassword);

    expect(inputEmail).toHaveValue(rightEmail);
    expect(inputPassword).toHaveValue(rightPassword);

    userEvent.click(button);

    const { entries } = history;

    expect(entries[1].pathname).toBe('/carteira');
  });
});
