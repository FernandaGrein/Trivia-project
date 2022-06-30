import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { quizApi } from '../redux/actions/index';

class Quiz extends React.Component {
    state = {
      // codeResponse: 0,
      answers: [],
      // questions: [],
      // questionNumber: 0,
    }

    async componentDidMount() {
      const { recebeQuiz, token, questions } = this.props;
      recebeQuiz(token);
      const array = [];
      const responseObj = {
        test: 'data-testid="correct-answer"',
        resposta: questions.results[0].correct_answer,
      };
      array.push(responseObj);

      const objErro1 = {
        test: `data-testid="wrong-answer-${0}"`,
        resposta: questions.results[0].incorrect_answers[0],
      };
      array.push(objErro1);

      const objErro2 = {
        test: `data-testid="wrong-answer-${1}"`,
        resposta: questions.results[0].incorrect_answers[1],
      };
      array.push(objErro2);

      const objErro3 = {
        test: `data-testid="wrong-answer-${2}"`,
        resposta: questions.results[0].incorrect_answers[2],
      };
      array.push(objErro3);
      const meio = 0.5;
      console.log('array1 ', array);
      const randomArray = array.sort(() => Math.random() - meio);// sort no array

      console.log(randomArray);
      this.setState({ answers: array });
    }

  handleClick = () => {
    console.log('clicou');
  }

  render() {
    const { questions } = this.props;
    const { answers } = this.state;
    console.log(answers);
    return (
      <div>
        { questions.results.length > 0 && (
          <div>
            <p data-testid="question-text">{ questions.results[0].question }</p>
            <p>{ questions.results[0].difficulty }</p>
            <p data-testid="question-category">{ questions.results[0].category }</p>

            <button
              type="button"
              onClick={ this.handleClick }
            >
              {}

            </button>
            {/* <button>{}</button>
            <button>{}</button>
            <button>{}</button> */}
          </div>
        )}
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
  // resposta: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
