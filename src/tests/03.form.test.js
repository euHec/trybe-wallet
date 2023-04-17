import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';

describe('Componente formulário', () => {
  it('Testa se todos os campos estão presentes no documento', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
  });
  it('Testa se os valores são inseridos nos campos', () => {
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
    userEvent.selectOptions(currencyInput, 'CAD');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    userEvent.selectOptions(tagInput, 'Lazer');

    expect(valueInput).toHaveValue(10);
    expect(descriptionInput).toHaveValue('Café');
    expect(currencyInput).toHaveValue('CAD');
    expect(methodInput).toHaveValue('Dinheiro');
    expect(tagInput).toHaveValue('Lazer');
  });
});
