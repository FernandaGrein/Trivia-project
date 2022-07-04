import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Feedback from '../pages/Feedback';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa o componente Feedback', () => {
    it('Teste se a imagem do perfil é do Gravatar', () => {      
      renderWithRouterAndRedux(<Feedback />);

      const img = screen.getByTestId('header-profile-picture');
      expect(img).toBeInTheDocument();
    });

    it('Teste se o nome do jogador aparece', () => {
        renderWithRouterAndRedux(<Feedback />);
        
        const nomePlayer = screen.getByTestId('header-player-name');
        expect(nomePlayer).toBeInTheDocument();
    });

    it('Teste se o placar tem o data-testid "header-score"', () => {
        renderWithRouterAndRedux(<Feedback />);
        
        const score = screen.getByTestId('header-score');
        expect(score).toBeInTheDocument();
    });
});
