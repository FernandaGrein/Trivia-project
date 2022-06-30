import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testa o componente Login', () => {
    it('Teste se a pagina posssui um título escrito Login, dois botões', () => {
      renderWithRouterAndRedux(<Login />);
      
      const titleEl = screen.getByRole('heading', { name: /Login/i, level: 3 });
      expect(titleEl).toBeInTheDocument();

      const buttons = screen.getAllByRole('button')
      expect(buttons).toHaveLength(2) 

    });

    it('Testa se os inputs de nome e email aparecem na tela', () => {
        renderWithRouterAndRedux(<Login />);
        const nome = screen.getByPlaceholderText(/digite seu nome/i);
        expect(nome).toBeInTheDocument();

        const email = screen.getByPlaceholderText(/digite seu e-mail/i);
        expect(email).toBeInTheDocument();
    });

    it('Testa se o botao Play se inicia desabilitado e depois é habilitado', async () =>{
        renderWithRouterAndRedux(<App />)

        const email = screen.getByRole('textbox', {  name: /email:/i});
        const nome = screen.getByRole('textbox', {  name: /nome:/i});

        await userEvent.type(email, 'teste@teste')
        await userEvent.type(nome, 'maria')
        console.log(nome, 'input');

        const button = await screen.findByRole('button', { name: /^play$/i });
        expect(button).toBeInTheDocument();
        expect(button).not.toBeDisabled();

    }) 

    it('Teste se o botão com texto de configuracao na tela', () => {
        renderWithRouterAndRedux(<Login />);
        const settingsBtn = screen.getByRole('button', {name: /settings/i } )
        expect(settingsBtn).toBeInTheDocument();
        expect(settingsBtn).not.toBeDisabled();
    });

    it('Teste se o botão de configurações muda a rota para tela de configurações', () => {
       const { history}=renderWithRouterAndRedux(<App />);
       const confBtn = screen.getByRole('button', { name: /settings/i });
       userEvent.click(confBtn)

       expect(history.location.pathname).toBe('/settings')
      
    });

    it('A rota deve ser mudada para \'/telaJogo\' após o clique no botão.', async () => {
        jest.spyOn(global,'fetch').mockResolvedValue({
            json: async () => ({
                "response_code": 0,
                "response_message": "Token Generated Successfully!",
                "token": "f34ac1db1fcdd3707cb3c3c98742b927d5ad276a11857706a8211b3313c17ccd"
            })
        })
        
        const { history } = renderWithRouterAndRedux(<App />);
        const name = screen.getByTestId('input-player-name');
        const email = screen.getByTestId('input-gravatar-email');
        const button = screen.getByText(/Play/i);
    
        userEvent.type(email, 'alguem@email.com');
        userEvent.type(name, 'maria');
        fireEvent.click(button);

        const nameEl = await screen.findByText(/maria/i) 
        expect(nameEl).toBeInTheDocument();

         expect(history.location.pathname).toBe('/game');
      });

});
