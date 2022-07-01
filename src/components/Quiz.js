import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { quizApi, scoreCounter } from '../redux/actions/index';

class Quiz extends React.Component {
  state = {
    // codeResponse: 0,
    answers: [],
    // questions: [],
    // questionNumber: 0,
    index: 0,
  }

  async componentDidMount() {
    const { recebeQuiz, token, resposta } = this.props;
    this.setState({ answers: resposta });
    await recebeQuiz(token);
    console.log('did mount', resposta);
  }

  makeAnswersArray = () => {
    const { index, answers } = this.state;
    const { questions } = this.props;
    // console.log('chamada questões', questions);
    const array = [];
    const responseObj = {
      test: 'correct-answer',
      resposta: questions.results[index].correct_answer,
      difficulty: questions.results[index].difficulty,
    };
    array.push(responseObj);

    const objErro1 = {
      test: 'wrong-answer-0',
      resposta: questions.results[index].incorrect_answers[0],
      difficulty: questions.results[index].difficulty,
    };
    array.push(objErro1);

    const objErro2 = {
      test: 'wrong-answer-1',
      resposta: questions.results[index].incorrect_answers[1],
      difficulty: questions.results[index].difficulty,
    };
    array.push(objErro2);

    const objErro3 = {
      test: 'wrong-answer-2',
      resposta: questions.results[index].incorrect_answers[2],
      difficulty: questions.results[index].difficulty,
    };
    array.push(objErro3);

    const meio = 0.5;
    const randomArray = array.sort(() => Math.floor(Math.random() - meio));

    console.log('randomArray', randomArray);

    this.setState({ answers: randomArray });

    console.log('array resposta', answers);
  }

  handleAnswerClick = ({ target }) => {
    const { countScore } = this.props;
    const timer = 10;
    const { id, difficulty } = target;
    if (id === 'correct-answer') {
      countScore(timer, difficulty);
    }
  }

  handleNextClick = () => {
    const { index } = this.state;
    const maxIndex = 4;
    let count;
    if (index < maxIndex) {
      count = index + 1;
    }

    if (index === maxIndex) {
      // console.log('history.push(/feedback)');
    }

    this.setState({ index: count }, () => this.makeAnswersArray());
  }

  render() {
    const { questions, token } = this.props;
    const { answers, index } = this.state;
    console.log('quiz -render - questão', questions);
    console.log('quiz-render - resposta', answers);
    return (
      <div>
        { token === 'INVALID_TOKEN' && (
          localStorage.removeItem('token'), <Redirect to="/" />
        )}
        { questions.results && (
          <>
            <p data-testid="question-text">{ questions.results[index].question }</p>
            <p>{ questions.results[index].difficulty }</p>
            <p data-testid="question-category">{ questions.results[index].category }</p>
          </>
        )}
        { answers.length > 0 && (
          <>
            <button
              type="button"
              onClick={ this.handleAnswerClick }
              data-testid={ answers[0].test }
              id={ answers[0].test }
              name={ answers[0].difficulty }
            >
              {answers[0].resposta}

            </button>
            <button
              type="button"
              onClick={ this.handleAnswerClick }
              data-testid={ answers[1].test }
              id={ answers[1].test }
              name={ answers[1].difficulty }
            >
              {answers[1].resposta}

            </button>
            <button
              type="button"
              onClick={ this.handleAnswerClick }
              data-testid={ answers[2].test }
              id={ answers[2].test }
              name={ answers[2].difficulty }
            >
              {answers[2].resposta}

            </button>
            <button
              type="button"
              onClick={ this.handleAnswerClick }
              data-testid={ answers[3].test }
              id={ answers[3].test }
              name={ answers[3].difficulty }
            >
              {answers[3].resposta}

            </button>
          </>)}
        <button
          type="button"
          onClick={ this.handleNextClick }
        >
          Proxima questão

        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  recebeQuiz: (token) => dispatch(quizApi(token)),
  countScore: (timer, dificuldade) => dispatch(scoreCounter(timer, dificuldade)),
});

const mapStateToProps = (state) => ({
  token: state.gameReducer.token,
  questions: state.gameReducer.questions,
  resposta: state.gameReducer.resposta,
});

Quiz.propTypes = {
  token: PropTypes.string.isRequired,
  recebeQuiz: PropTypes.func.isRequired,
  questions: PropTypes.shape(Object).isRequired,
  resposta: PropTypes.arrayOf(Object).isRequired,
  countScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
