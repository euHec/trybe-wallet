import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('Botão editar', () => {
  it('Testa se o botão está na tela', () => {
    const coins = Object.keys(mockData);
    const initialEntries = ['/carteira'];
    const initialState = {
      user: { email: '' },
      wallet: {
        currencies: coins,
        expenses: [
          {
            description: 'Café',
            currency: 'USD',
            method: 'Dinheiro',
            value: '10',
            tag: 'Lazer',
            id: 0,
            exchangeRates: mockData,
          },
          {
            description: 'Biscito',
            currency: 'CAD',
            method: 'Cartão de crédito',
            value: '5',
            tag: 'Lazer',
            id: 1,
            exchangeRates: mockData,
          },
        ],
        coins: null,
        editor: false,
        idToEdit: 0,
        totalExpenses: '0' },
    };
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });

    const button = screen.getAllByRole('button', { name: /editar/i });
    expect(button).toHaveLength(2);
  });
  it('Testa se ao editar um item da tabela, aparece os dados atualiados', async () => {
    const coins = Object.keys(mockData);
    const initialEntries = ['/carteira'];
    const initialState = {
      user: { email: '' },
      wallet: {
        currencies: coins,
        expenses: [
          {
            description: 'Café',
            currency: 'USD',
            method: 'Dinheiro',
            value: '10',
            tag: 'Lazer',
            id: 0,
            exchangeRates: mockData,
          },
        ],
        coins: null,
        editor: false,
        idToEdit: 0,
        totalExpenses: '0' },
    };
    const expectedObject = {
      expenses: [
        {
          description: 'Biscoito',
          currency: 'USD',
          method: 'Cartão de débito',
          value: '5',
          tag: 'Alimentação',
          id: 0,
          exchangeRates: mockData,
        },
      ] };
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries, initialState });

    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    expect(screen.getByRole('cell', { name: /café/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /lazer/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /dinheiro/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /10.00/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /dólar americano\/real brasileiro/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /4.75/i })).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: /47.53/i })).toBeInTheDocument();

    const buttonEdit = screen.getByRole('button', { name: /editar/i });

    userEvent.click(buttonEdit);

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');

    userEvent.type(valueInput, '5');
    userEvent.type(descriptionInput, 'Biscoito');
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(methodInput, 'Cartão de débito');
    userEvent.selectOptions(tagInput, 'Alimentação');

    const buttonSendEdit = screen.getByRole('button', { name: /editar despesa/i });

    userEvent.click(buttonSendEdit);

    expect(await screen.findByRole('cell', { name: /biscoito/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /alimentação/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /cartão de débito/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /5.00/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /dólar americano\/real brasileiro/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /4\.75/i })).toBeInTheDocument();
    expect(await screen.findByRole('cell', { name: /23.77/i })).toBeInTheDocument();

    expect(store.getState().wallet.expenses).toEqual(expectedObject.expenses);
  });
});
