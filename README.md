O projeto Trivia foi o primeiro projeto em grupo que realizamos pela trybe, nesse projeto 
realizamos em três alunos, gerenciando os desafios do projeto com as habilidades de cada aluno e as dificuldades de cada um.
Para a realização do projeto foi utilizado o React-Redux e foram criados os testes de cada página da aplicação.

Para acessar essa aplicação, clone o repositótio, acesse a página do projeto, instale as dependências e abra aplicação com o comando start:
 - git clone git@github.com:FernandaGrein/Trivia-project.git
 - cd Trivia-project
 - npm install 
 - npm start

Foram cumpridos os seguintes requisitos:
 - Foi criado uma tela de login, que recebe o nome e o email da pessoa jogadora e possibilita o inicio do jogo.
 - A tela de login possui ainda um botão para iniciar o jogo e um botão que leva para a tela de configuração
 - Na sequencia foi criado uma tela de jogo, esta possui um cabeçalho com as informações da pessoa jogadora: nome, pontuação total, imagem vinda do gravatar.
 - Dentro da página de jogo há um componente que recebe as perguntas e suas alternativas por meio de uma requisição à API, selecionando 5 perguntas aleatórias e passando na tela uma pergunta por vez.
 - Ao selecionar uma alternativa, a resposta correta fica verde e as demais vermelhas, parando cronometro e habilita o botão "next", que possibilitando acessar a pŕoxima pergunta.
 - Foi desenvolvido um timer, que possibilita que cada pergunta seja respondida dentro de 30 segundos, ao clicar em uma alternativa o timer é pausado, o valor restante do tempo será posteriormente utilizado na soma dos pontos, caso o timer finalize as alternativas são desabilitadas sem contar pontos.
 - Foi criado um placar que calcula os pontos de cada jogada atribuindo uma pontuação fixa de acordo com a dificuldade da pergunta multiplicado pelo tempo restante no timer, somado mais 10.
 - Após responder as 5 perguntas o jogador é redirecionado para a tela de feedback, que contem as informações da pessoa jogadora: nome, placar e imagem do gravatar, bem como, possui uma mensagem relacionada ao desepenho do usuário no jogo e a quantidade de questões acertadas.
 - Foi criado um botão na tela de feedback que possibilita jogar novamente e outro que redireciona para a tela de ranking.
 - A tela de ranking possui as informações de todos que jogaram na aplicação, trazendo o nome, a imagem e a pontuação de cada jogador, possui também um botão que redireciona para a tela de login.
- foram desenvolvidos os testes de 95% de cobertura total da aplicação.
