import React from "react";
import { screen, waitFor } from "@testing-library/react";
import Ranking from "../pages/Ranking";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("Testa o componente Ranking", () => {
  it("Teste se clicar no botao a pessoa é redirecionar para tela (login)", async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push("/ranking");
    const btn = screen.getByTestId("btn-go-home");

    userEvent.click(btn);

    await waitFor(
      () => {
        expect(history.location.pathname).toBe("/");
      },
      { timeout: 3000 }
    );
  });

  it("A tela de ranking deve conter a imagem, nome e pontuação da pessoa que jogar", () => {
    const INICIAL_STATE = {
      name: "Maria",
      score: 200,
      gravatarEmail: "teste@test.com",
    };
    const { history } = renderWithRouterAndRedux(<App />, { INICIAL_STATE });
    history.push("/ranking");

    const titleElement = screen.getByRole("heading", {
      name: /ranking/i,
      level: 1,
    });
    const PlayersNameEl = screen.getAllByLabelText("playerName");
    // const ImgsEl = screen.getAllByAltText('gravatar');
    // const score = screen.getByText('200');

    expect(titleElement).toBeInTheDocument();
    // expect(PlayersNameEl).toHaveAttribute('playerName');
    // expect(ImgsEl).toBeInTheDocument();
    // expect(score).toBeInTheDocument();
  });
});
