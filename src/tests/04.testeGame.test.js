import React from "react";
import { screen } from "@testing-library/react";
import Game from "../pages/Game";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { data } from "./helpers/dataMocks";

describe("Testa o componente Game", () => {
  it("Teste se imagem do Gravatar", () => {
    renderWithRouterAndRedux(<Game />);

    const img = screen.getByTestId("header-profile-picture");
    expect(img).toBeInTheDocument();
  });

  it("Teste se na página de jogo aparece o nome do jogador", () => {
    renderWithRouterAndRedux(<Game />);

    const nomePlayer = screen.getByTestId("header-player-name");
    expect(nomePlayer).toBeInTheDocument();
  });

  it("Teste se na página de jogo aparece o placar do jogador", () => {
    renderWithRouterAndRedux(<Game />);

    const score = screen.getByTestId("header-score");
    expect(score).toBeInTheDocument();
  });

  it("testa se a pergunta é renderizada na tela", async () => {
    renderWithRouterAndRedux(<Game />);
    const questionEl = await screen.findByTestId("question-text");
    const answerEl1 = await screen.findByTestId("wrong-answer-0");
    // const answerEl2 = await screen.findByTestId('wrong-answer-1')
    // const answerEl3 = await screen.findByTestId('wrong-answer-2')
    const answerEl4 = await screen.findByTestId("correct-answer");
    expect(questionEl).toBeInTheDocument();
    expect(answerEl1).toBeInTheDocument();
    // expect(answerEl2).toBeInTheDocument();
    // expect(answerEl3).toBeInTheDocument();
    expect(answerEl4).toBeInTheDocument();
  });
  it("testa se ao respoder uma pergunta, os botões de respota são desabilitados e o botão nextAparece na tela", async () => {
    renderWithRouterAndRedux(<Game />);
    const wrongAnswerEl = await screen.findByTestId("wrong-answer-0");
    const correctAnswerEl = await screen.findByTestId("correct-answer");

    userEvent.click(wrongAnswerEl);
    expect(correctAnswerEl).toBeDisabled();

    const nextButtonEl = await screen.findByRole("button", {
      name: /proxima questão/i,
    });
    expect(nextButtonEl).toBeInTheDocument();
  });

  it("testa se ao clicar no botão de resposta, as alternativas ficam coloridas", async () => {
    renderWithRouterAndRedux(<Game />);
    const wrongAnswerEl = await screen.findByTestId("wrong-answer-0");
    const correctAnswerEl = await screen.findByTestId("correct-answer");

    userEvent.click(correctAnswerEl);

    expect(wrongAnswerEl).toHaveClass("red");
    expect(correctAnswerEl).toHaveClass("green");
  });

  it("testa se ao final de 4 rodadas o botão next redireciona para a página feedback", async () => {
    jest.clearAllTimers();
    renderWithRouterAndRedux(<App />);
    const email = screen.getByRole("textbox", { name: /email:/i });
    const nome = screen.getByRole("textbox", { name: /nome:/i });

    await userEvent.type(email, "teste@teste");
    await userEvent.type(nome, "maria");
    const playButton = await screen.findByRole("button", { name: /^play$/i });
    userEvent.click(playButton);

    const wrongAnswerEl = await screen.findByTestId("wrong-answer-0");
    const correctAnswerEl = await screen.findByTestId("correct-answer");
    userEvent.click(correctAnswerEl);

    const nextButtonEl = await screen.findByRole("button", {
      name: /proxima questão/i,
    });
    userEvent.click(nextButtonEl);

    userEvent.click(correctAnswerEl);
    userEvent.click(nextButtonEl);

    userEvent.click(correctAnswerEl);
    userEvent.click(nextButtonEl);

    userEvent.click(wrongAnswerEl);
    userEvent.click(nextButtonEl);

    userEvent.click(correctAnswerEl);
    userEvent.click(nextButtonEl);

    const feedbackMessage = await screen.findByTestId("feedback-text");
    expect(feedbackMessage).toBeInTheDocument();
  });
});

describe("testa o temporizado", () => {
  jest.useFakeTimers();
  it("testa se temporizador das questões", async () => {
    renderWithRouterAndRedux(<Game />);
    const timer = await screen.findByText("30");
    expect(timer).toBeInTheDocument();

    jest.advanceTimersByTime(30000);

    const wrongAnswerEl = await screen.findByTestId("wrong-answer-0");
    const correctAnswerEl = await screen.findByTestId("correct-answer");
    expect(correctAnswerEl).toBeDisabled();
    expect(wrongAnswerEl).toBeDisabled();

    jest.clearAllTimers();
  });
});
