import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Redirect } from 'react-router-dom';
import { quizApi, scoreCounter, saveResposta } from '../redux/actions/index';
import QuestCard from '../components/QuestCard';
import Timer from '../components/Timer';

class TelaJogo extends React.Component {
  state = {
    answers: [],
    index: 0,
    disabled: false,
    showTimer: true,
    timer: 0,
    targetId: 0,
    targetName: '',
  }

  async componentDidMount() {
    const { recebeQuiz, token } = this.props;
    await recebeQuiz(token);
    const { questions } = this.props;

    const newArray = questions.reduce((acc, item) => {
      const responseObj = {
        pergunta: item.question,
        categoria: item.category,
        difficulty: item.difficulty,
        respostaCerta: { test: 'correct-answer',
          resp: item.correct_answer,
          status: 'certo' },
        respostaFalsa: item.incorrect_answers
          .map((AddErr, index) => ({ test: `wrong-answer-${index}`,
            resp: AddErr,
            status: 'errado' })),
      };
      const responseObj2 = { ...responseObj,
        totalResp: [...responseObj.respostaFalsa, responseObj
          .respostaCerta] };
      acc = [...acc, responseObj2];
      return acc;
    }, []);

    this.setState({ answers: newArray });
  }

  disabledButtonAndTimer = () => {
    this.setState({ disabled: true, showTimer: false });
  }

  saveTimer = (timer) => {
    // console.log(timer);
    this.setState({ timer }, () => this.counterScore());
  }

  handleAnswerClick = ({ target }) => {
    const { id, name } = target;
    this.disabledButtonAndTimer();
    this.setState({ targetId: id, targetName: name });
  }

  counterScore = () => {
    const { countScore } = this.props;
    const { timer, targetId, targetName } = this.state;
    if (targetId === 'certo') {
      countScore(timer, targetName);
    }
  }

  handleNextClick = () => {
    const { index } = this.state;
    const { questions, history } = this.props;
    if (index === questions.length - 1) {
      history.push('/feedback');
    }

    this.setState({ index: index + 1, disabled: false, showTimer: true });
  }

  render() {
    const { name, email, placar, token } = this.props;
    const { index, answers, disabled, showTimer } = this.state;

    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
            alt="Gravatar"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{name || ''}</p>
          <p data-testid="header-score">{placar || 0}</p>
        </header>
        <div>
          { token === 'INVALID_TOKEN' && (
            localStorage.removeItem('token'), <Redirect to="/" />
          )}
          { answers.length > 0 && (
            <QuestCard
              question={ answers[index] }
              handleAskClick={ this.handleAnswerClick }
              disabled={ disabled }
            />
          ) }
          {showTimer === true ? <Timer
            disabledButton={ this.disabledButton }
            saveTimer={ this.saveTimer }
          /> : null}
          <button
            type="button"
            onClick={ this.handleNextClick }
          >
            Proxima questão

          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.playerReducer.name,
  email: state.playerReducer.gravatarEmail,
  placar: state.playerReducer.score,
  questions: state.gameReducer.questions,
  token: state.gameReducer.token,
});

const mapDispatchToProps = (dispatch) => ({
  recebeQuiz: (token) => dispatch(quizApi(token)),
  countScore: (timer, dificuldade) => dispatch(scoreCounter(timer, dificuldade)),
  indexCounter: (json) => dispatch(saveResposta(json)),
});

TelaJogo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  placar: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(Object).isRequired,
  token: PropTypes.string.isRequired,
  recebeQuiz: PropTypes.func.isRequired,
  countScore: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,

  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TelaJogo);
