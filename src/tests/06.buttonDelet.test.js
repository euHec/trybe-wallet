import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('Botão deletar', () => {
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
            method: 'Cartão de débito',
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

    const button = screen.getAllByRole('button', { name: /excluir/i });
    expect(button).toHaveLength(2);
  });
  it('Testa se ao deletar um item da tabela deixa de exibir e atualiza o estado', () => {
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
            tag: 'Alimentação',
            id: 1,
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
          description: 'Biscito',
          currency: 'CAD',
          method: 'Cartão de crédito',
          value: '5',
          tag: 'Alimentação',
          id: 1,
          exchangeRates: mockData,
        },
      ] };
    const { store } = renderWithRouterAndRedux(<App />, { initialEntries, initialState });

    const cel1Line1 = screen.getByRole('cell', { name: /café/i });
    const cel2Line1 = screen.getByRole('cell', { name: /lazer/i });
    const cel3Line1 = screen.getByRole('cell', { name: /dinheiro/i });
    const cel4Line1 = screen.getByRole('cell', { name: /10.00/i });
    const cel5Line1 = screen.getByRole('cell', { name: /dólar americano\/real brasileiro/i });
    const cel6Line1 = screen.getByRole('cell', { name: /4.75/i });
    const cel7Line1 = screen.getByRole('cell', { name: /47.53/i });
    const cel8Line1 = screen.getAllByRole('cell', { name: /real/i });

    expect(cel1Line1).toBeInTheDocument();
    expect(cel2Line1).toBeInTheDocument();
    expect(cel3Line1).toBeInTheDocument();
    expect(cel4Line1).toBeInTheDocument();
    expect(cel5Line1).toBeInTheDocument();
    expect(cel6Line1).toBeInTheDocument();
    expect(cel7Line1).toBeInTheDocument();
    expect(cel8Line1[0]).toBeInTheDocument();

    const button = screen.getAllByRole('button', { name: /excluir/i });

    userEvent.click(button[0]);

    expect(cel1Line1).not.toBeInTheDocument();
    expect(cel2Line1).not.toBeInTheDocument();
    expect(cel3Line1).not.toBeInTheDocument();
    expect(cel4Line1).not.toBeInTheDocument();
    expect(cel5Line1).not.toBeInTheDocument();
    expect(cel6Line1).not.toBeInTheDocument();
    expect(cel7Line1).not.toBeInTheDocument();
    expect(cel8Line1[0]).not.toBeInTheDocument();

    expect(store.getState().wallet.expenses).toEqual(expectedObject.expenses);
  });
  it('Testa se após deletar um item o total aparece como 0 na tela', () => {
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

    const { store } = renderWithRouterAndRedux(<App />, { initialEntries, initialState });

    const cel1Line1 = screen.getByRole('cell', { name: /café/i });
    const cel2Line1 = screen.getByRole('cell', { name: /lazer/i });
    const cel3Line1 = screen.getByRole('cell', { name: /dinheiro/i });
    const cel4Line1 = screen.getByRole('cell', { name: /10.00/i });
    const cel5Line1 = screen.getByRole('cell', { name: /dólar americano\/real brasileiro/i });
    const cel6Line1 = screen.getByRole('cell', { name: /4.75/i });
    const cel7Line1 = screen.getByRole('cell', { name: /47.53/i });
    const cel8Line1 = screen.getAllByRole('cell', { name: /real/i });

    expect(cel1Line1).toBeInTheDocument();
    expect(cel2Line1).toBeInTheDocument();
    expect(cel3Line1).toBeInTheDocument();
    expect(cel4Line1).toBeInTheDocument();
    expect(cel5Line1).toBeInTheDocument();
    expect(cel6Line1).toBeInTheDocument();
    expect(cel7Line1).toBeInTheDocument();
    expect(cel8Line1[0]).toBeInTheDocument();

    const button = screen.getAllByRole('button', { name: /excluir/i });

    userEvent.click(button[0]);

    expect(cel1Line1).not.toBeInTheDocument();
    expect(cel2Line1).not.toBeInTheDocument();
    expect(cel3Line1).not.toBeInTheDocument();
    expect(cel4Line1).not.toBeInTheDocument();
    expect(cel5Line1).not.toBeInTheDocument();
    expect(cel6Line1).not.toBeInTheDocument();
    expect(cel7Line1).not.toBeInTheDocument();
    expect(cel8Line1[0]).not.toBeInTheDocument();

    expect(store.getState().wallet.expenses).toHaveLength(0);
    expect(screen.getByTestId('total-field')).toHaveTextContent('0.00');
  });
});
