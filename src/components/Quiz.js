import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { quizApi } from '../redux/actions/index';

class Quiz extends React.Component {
  state = {
    // codeResponse: 0,
    answers: [],
    // questions: [],
    // questionNumber: 0,
    index: 0,
    tokenLength: 64,
  }

  async componentDidMount() {
    const { recebeQuiz, token, resposta } = this.props;
    // const tokenLength = 64;

    // if (token.length !== tokenLength) {
    //   console.log('no if');
    //   localStorage.removeItem('token');
    //   history.push('/');
    // }
    this.setState({ answers: resposta });
    // this.makeAnswersArray();
    await recebeQuiz(token);
  }

  makeAnswersArray = () => {
    const { index } = this.state;
    const { questions } = this.props;
    // console.log('chamada questões', questions);
    const array = [];
    const responseObj = {
      test: 'correct-answer',
      resposta: questions.results[index].correct_answer,
    };
    array.push(responseObj);

    const objErro1 = {
      test: 'wrong-answer-0',
      resposta: questions.results[index].incorrect_answers[0],
    };
    array.push(objErro1);

    const objErro2 = {
      test: 'wrong-answer-1',
      resposta: questions.results[index].incorrect_answers[1],
    };
    array.push(objErro2);

    const objErro3 = {
      test: 'wrong-answer-2',
      resposta: questions.results[index].incorrect_answers[2],
    };
    array.push(objErro3);

    const meio = 0.5;
    const randomArray = array.sort(() => Math.random() - meio);

    this.setState({ answers: randomArray });
    // console.log('array resposta', answers);
  }

  handleAnswerClick = () => {
    console.log('clicou resposta');
  }

  handleNextClick = () => {
    const { index } = this.state;
    const maxIndex = 4;
    let count;
    if (index < maxIndex) {
      count = index + 1;
    }

    if (index === maxIndex) {
      console.log('history.push(/feedback)');
    }
    console.log(count);
    this.setState({ index: count }, () => this.makeAnswersArray());
  }

  render() {
    const { questions, token } = this.props;
    const { answers, index, tokenLength } = this.state;

    // console.log('dentro do render - questão', questions);
    // console.log('dentro do render - resposrta', answers);
    return (
      <div>
        { token.length !== tokenLength && (
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
            >
              {answers[0].resposta}

            </button>
            <button
              type="button"
              onClick={ this.handleAnswerClick }
              data-testid={ answers[1].test }
            >
              {answers[1].resposta}

            </button>
            <button
              type="button"
              onClick={ this.handleAnswerClick }
              data-testid={ answers[2].test }
            >
              {answers[2].resposta}

            </button>
            <button
              type="button"
              onClick={ this.handleAnswerClick }
              data-testid={ answers[3].test }
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

};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
