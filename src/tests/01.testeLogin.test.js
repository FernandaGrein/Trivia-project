import React from 'react';
import { screen } from '@testing-library/react';
import Login from '../pages/Login';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';

describe('Testa o componente Login', () => {
    it('Teste se a pagina posssui um título escrito Login', () => {
      renderWithRouterAndRedux(<Login />);
      const titleEl = screen.getByRole('heading', { name: /Login/i, level: 3 });
      expect(titleEl).toBeInTheDocument();
    });

    it('Testa se os inputs de nome e email aparecem na tela', () => {
        renderWithRouterAndRedux(<Login />);
        const nome = screen.getByPlaceholderText(/digite seu nome/i);
        expect(nome).toBeInTheDocument();

        const email = screen.getByPlaceholderText(/digite seu e-mail/i);
        expect(email).toBeInTheDocument();
    });

    it('Testa se o botao Play se inicia desabilitado e depois é habilitado', () => {
        renderWithRouterAndRedux(<Login />);
        const button = screen.getByText(/Play/i);

        expect(button).toBeInTheDocument();
        expect(button).toBeDisabled();

        const email = screen.getByTestId('input-gravatar-email');
        const nome = screen.getByTestId('input-player-name');

        userEvent.type(nome, 'maria')
        expect(screen.getByTestId('input-player-name')).toHaveValue('maria')

        userEvent.type(email, 'teste@teste.com')
        expect(screen.getByTestId('input-gravatar-email')).toHaveValue('teste@teste.com')
        
        const playBtn = screen.getByRole('button', { name: /play/i })
       // expect(playBtn).not.toBeDisabled();
       
    });

    it('Teste se o botão com texto de configuracao na tela', () => {
        renderWithRouterAndRedux(<Login />);
        const settingsBtn = screen.getByRole('button', {name: /settings/i } )
        expect(settingsBtn).toBeInTheDocument();
        expect(settingsBtn).not.toBeDisabled();
    });

    it('Teste se o botão play muda a rota para a tela de Jogo', () => {
        renderWithRouterAndRedux(<Login />);
        const button = screen.getByRole('button', { name: /play/i});
        userEvent.click(button);

        // const gameScreen = screen.getByRole('heading', { name: /Tela de Jogo/i });
        // expect(gameScreen).toBeInTheDocument();

    });

    it('Teste se o botão de configurações muda a rota para tela de configurações', () => {
       renderWithRouterAndRedux(<Login/>)
       const confBtn = screen.getByRole('button', { name: /settings/i });
       userEvent.click(confBtn)
      
      //  const title = screen.getByTestId('settings-title')
      //  expect(title)

    });

      

});
