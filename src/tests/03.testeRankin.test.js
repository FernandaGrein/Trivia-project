import React from 'react';
import { screen } from '@testing-library/react';
import Ranking from '../pages/Ranking';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('Testa o componente Ranking', () => {
    it('Teste se clicar no botao a pessoa é redirecionar para tela (login)', () => {      
      renderWithRouterAndRedux(<Ranking />);

      const btn = screen.getByRole('button', { name: /inicio/i });
      userEvent.click(btn);

      expect(history.location.pathname).toBe('/');

    });

    it('A tela de ranking deve conter a imagem, nome e pontuação da pessoa que jogar', () => {      
        renderWithRouterAndRedux(<Ranking />);
  
        const img = screen.getByTestId('header-profile-picture');
        const nomePlayer = screen.getByTestId('header-player-name');
        const score = screen.getByTestId('header-score');

        expect(img).toBeInTheDocument();
        expect(nomePlayer).toBeInTheDocument();
        expect(score).toBeInTheDocument();
      });

});
