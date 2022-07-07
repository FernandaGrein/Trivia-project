import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { quizApi, scoreCounter,
  countAssertions, saveAnswer } from '../redux/actions/index';
import QuestCard from '../components/QuestCard';
import Timer from '../components/Timer';
import './Game.css';
import Header from '../components/Header';

class TelaJogo extends React.Component {
  state = {
    answers: [],
    index: 0,
    disabled: false,
    showTimer: true,
    timer: 0,
    targetId: 0,
    targetName: '',
    color: false,
    buttonNext: false,
  }

  async componentDidMount() {
    const { getQuiz, token } = this.props;
    await getQuiz(token);
    const { questions } = this.props;

    if (questions) {
      const newArray = questions.reduce((acc, item) => {
        const responseObj = {
          question: item.question,
          category: item.category,
          difficulty: item.difficulty,
          correctAnswer: { test: 'correct-answer',
            resp: item.correct_answer,
            status: 'certo',
          },
          wrongAnswer: item.incorrect_answers
            .map((AddErr, index) => ({ test: `wrong-answer-${index}`,
              resp: AddErr,
              status: 'errado',
            })),
        };
        const responseObj2 = { ...responseObj,
          totalResp: [...responseObj.wrongAnswer, responseObj
            .correctAnswer].sort(() => Math.round(Math.random()) * 2 - 1) };
        acc = [...acc, responseObj2];
        return acc;
      }, []);

      this.setState({ answers: newArray });
    }
  }

  disabledButtonAndTimer = () => {
    this.setState({ disabled: true, showTimer: false, buttonNext: true, color: true });
  }

  saveTimer = (timer) => {
    this.setState({ timer }, () => this.counterScore());
  }

  handleAnswerClick = ({ target }) => {
    const { id, name } = target;
    const { AssertionsCounter } = this.props;
    this.disabledButtonAndTimer();
    this.setState({ targetId: id, targetName: name });
    AssertionsCounter(id);
  }

  counterScore = () => {
    const { countScore } = this.props;
    const { timer, targetId, targetName } = this.state;
    if (targetId === 'certo') {
      countScore(timer, targetName);
      this.setState({ targetId: 0, targetName: '' });
    }
    this.setState({ targetId: 0, targetName: '' });
  }

  handleNextClick = () => {
    const { index } = this.state;
    const { questions, history } = this.props;
    if (index === questions.length - 1) {
      history.push('/feedback');
    }

    this.setState({ index: index + 1,
      disabled: false,
      showTimer: true,
      color: false,
      buttonNext: false });
  }

  render() {
    const { token } = this.props;
    const { index, answers, disabled, showTimer, buttonNext,
      color, targetId } = this.state;
    return (
      <div>
        <Header />
        <div className="jogo">
          { token === 'INVALID_TOKEN' && (
            localStorage.removeItem('token'), <Redirect to="/" />
          )}
          { answers.length > 0 && (
            <QuestCard
              question={ answers[index] }
              handleAskClick={ this.handleAnswerClick }
              disabled={ disabled }
              color={ color }
              targetId={ targetId }
            />
          ) }
          {showTimer === true ? <Timer
            disabledButton={ this.disabledButtonAndTimer }
            saveTimer={ this.saveTimer }
          /> : null}
          { buttonNext && (
            <button
              data-testid="btn-next"
              type="button"
              onClick={ this.handleNextClick }
              className="btnNext"
            >
              Proxima questão

            </button>)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
  token: state.gameReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  getQuiz: (token) => dispatch(quizApi(token)),
  countScore: (timer, dificuldade) => dispatch(scoreCounter(timer, dificuldade)),
  indexCounter: (json) => dispatch(saveAnswer(json)),
  AssertionsCounter: (status) => dispatch(countAssertions(status)),
});

TelaJogo.propTypes = {
  questions: PropTypes.arrayOf(Object).isRequired,
  token: PropTypes.string.isRequired,
  getQuiz: PropTypes.func.isRequired,
  countScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,

  }).isRequired,
  AssertionsCounter: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TelaJogo);
