import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('Componente table', () => {
  it('Testa se há uma tabela na página', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
  });

  it('Testa se a tabela tem o seguinte cabeçalho', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });
    const headerTable = screen.getAllByRole('columnheader');
    expect(headerTable).toHaveLength(9);

    expect(headerTable[0]).toHaveTextContent(/descrição/i);
    expect(headerTable[1]).toHaveTextContent(/tag/i);
    expect(headerTable[2]).toHaveTextContent(/método de pagamento/i);
    expect(headerTable[3]).toHaveTextContent(/valor/i);
    expect(headerTable[4]).toHaveTextContent(/moeda/i);
    expect(headerTable[5]).toHaveTextContent(/câmbio utilizado/i);
    expect(headerTable[6]).toHaveTextContent(/valor convertido/i);
    expect(headerTable[7]).toHaveTextContent(/moeda de conversão/i);
    expect(headerTable[8]).toHaveTextContent(/editar\/Excluir/i);
  });
  it('Testa se ao preencher os form os dados são exibitos na tela', () => {
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

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');

    userEvent.type(valueInput, '10');
    userEvent.type(descriptionInput, 'Café');
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Lazer');

    const button = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.click(button);

    waitFor(() => {
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
    });
  });
});
