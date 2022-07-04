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

    it('teste se ao clicar no botão Play Again a página é redirecionado para a página de login', () => {
        const {history}=renderWithRouterAndRedux(<App />);
        history.push('/feedback')
        const buttonEl = screen.getByRole('button', {  name: /play again/i});

        userEvent.click(buttonEl)
        expect(screen.getByRole('heading', {  name: /login/i})).toBeInTheDocument();
    })

    it('testa se ao clicar no botão de ranking, a página é redirecionada para "/ranking"', () => {
       const { history } = renderWithRouterAndRedux(<App/>);
       history.push('feedback');
       const rankingButtonEl = screen.getByRole('button', {  name: /ranking/i})

       userEvent.click(rankingButtonEl)
       expect(screen.getByRole('heading', {  name: /ranking/i})).toBeInTheDocument();
    });
    it('testa se a mensagem de feedback é renderizada na tela', () => {
        renderWithRouterAndRedux(<Feedback/>)
        const feedbackEl = screen.getByText(/could be better\.\.\./i)
        expect(feedbackEl).toBeInTheDocument();

    })
});
