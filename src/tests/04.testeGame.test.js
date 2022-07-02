import React from 'react';
import { screen } from '@testing-library/react';
import Game from '../pages/Game';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import QuestCard from '../components/QuestCard';

describe('Testa o componente Game', () => {
    it('Teste se imagem do Gravatar', () => {      
      renderWithRouterAndRedux(<Game />);

      const img = screen.getByTestId('header-profile-picture');

      expect(img).toBeInTheDocument();
    });

    it('Teste se na página de jogo aparece o nome do jogador', () => {      
      renderWithRouterAndRedux(<Game />);

      const nomePlayer = screen.getByTestId('header-player-name');
      
      expect(nomePlayer).toBeInTheDocument();
    });

    it('Teste se na página de jogo aparece o placar do jogador', () => {      
      renderWithRouterAndRedux(<Game />);

      const score = screen.getByTestId('header-score');
      
      expect(score).toBeInTheDocument();
    });

  //   it('Teste se o botão muda a rota para tela de feedback', () => {
  //     const { history }= renderWithRouterAndRedux(<Game />);
  //     const confBtn = screen.getByTestId('next');
  //     userEvent.click(confBtn)

  //     expect(history.location.pathname).toBe('/feedback')
     
  //  });

    // it('Teste se na página as opções são desabilitadas com um click', () => {      
    //     renderWithRouterAndRedux(<QuestCard />);
  
    //     const btnClick = screen.getByTestId('question-text');
    //     userEvent.click(btnClick)
        
    //     expect(btnClick).not.toBeDisabled();
    // });

});
