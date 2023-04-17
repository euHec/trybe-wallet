

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockData from './helpers/mockData';
import { act } from 'react-dom/test-utils';

describe('Testa a página Wallet', () => {
  it('Testa se ao carregar a página é feita a requisição', () => {
    const initialEntries = ['/carteira'];

    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    renderWithRouterAndRedux(<App />, { initialEntries });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
  it('Testa se a requisição é feita pela URL "https://economia.awesomeapi.com.br/json/all"', () => {
    const initialEntries = ['/carteira'];

    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }));

    renderWithRouterAndRedux(<App />, { initialEntries });

    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
  });
});
