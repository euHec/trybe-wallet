import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('Componente Header', () => {
  it('Testa se o email do login está na tela', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const email = screen.getByTestId('email-field');

    expect(email).toBeInTheDocument();
  });

  it('Testa se o campo de valor está na tela e inicia com 0', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const total = screen.getByTestId('total-field');

    expect(total).toBeInTheDocument();
    expect(total).toHaveTextContent('0.00');
  });

  it('Testa se campo de valor está na tela e é o mesmo que está no estado', () => {
    const initialEntries = ['/carteira'];
    const initialState = {
      user: { email: '' },
      wallet: {
        currencies: [],
        expenses: [],
        coins: null,
        editor: false,
        idToEdit: 0,
        totalExpenses: '10' },
    };
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });

    const total = screen.getByTestId('total-field');

    expect(total).toBeInTheDocument();
    expect(total).toHaveTextContent('10.00');
  });

  it('Testa se é exibido BRL na página', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const email = screen.getByTestId('header-currency-field');

    expect(email).toBeInTheDocument();
    expect(email).toHaveTextContent('BRL');
  });
  it('Testa se após adicionar o item é somado corretamente os valores na tela', async () => {
    const coins = Object.keys(mockData);
    const initialEntries = ['/carteira'];
    const initialState = {
      user: { email: '' },
      wallet: {
        currencies: coins,
        expenses: [],
        coins: null,
        editor: false,
        idToEdit: 0,
        totalExpenses: '0' },
    };
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });

    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    expect(screen.getByTestId('total-field')).toHaveTextContent('0.00');

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'Café');
    userEvent.selectOptions(currencyInput, 'CAD');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Lazer');

    expect(valueInput).toHaveValue(10);
    expect(descriptionInput).toHaveValue('Café');
    expect(currencyInput).toHaveValue('CAD');
    expect(methodInput).toHaveValue('Dinheiro');
    expect(tagInput).toHaveValue('Lazer');

    const buttonAddExpenses = screen.getByRole('button', { name: /adicionar despesa/i });

    act(() => {
      userEvent.click(buttonAddExpenses);
    });

    expect(await screen.findByRole('heading', { name: /37\.56/i })).toBeInTheDocument();
  });
});
