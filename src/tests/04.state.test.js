import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('Testa a funcionalidade do botão "adicionar despesas"', () => {
  it('Valida se o botão está na tela', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });
    const addExpensesButton = screen.getByRole('button', { name: /adicionar despesa/i });
    expect(addExpensesButton).toBeInTheDocument();
  });
  it('Testa se após enviar os dados, o estado é atualizado', async () => {
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
    const expectedObject = {
      expenses: [{
        description: 'Café',
        currency: 'CAD',
        method: 'Dinheiro',
        value: '10',
        tag: 'Lazer',
        id: 0,
        exchangeRates: mockData }],
    };
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries, initialState });

    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

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

    expect(screen.getByRole('option', { name: `${coins[2]}` }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Dinheiro' }).selected).toBe(true);
    expect(screen.getByRole('option', { name: 'Lazer' }).selected).toBe(true);

    const addExpensesButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.click(addExpensesButton);

    await waitFor(() => {
      expect(store.getState().wallet.expenses).toHaveLength(1);
      expect(store.getState().wallet.expenses).toMatchObject(expectedObject.expenses);
    });
  });
});
