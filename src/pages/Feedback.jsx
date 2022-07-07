import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import './Feedback.css';
import { resetGame } from '../redux/actions';

class FeedBack extends React.Component {
  state = {
    message: '',
  }

  componentDidMount() {
    const tres = 3;
    const { points } = this.props;
    if (points < tres) {
      this.setState({ message: 'Could be better...' });
    }
    if (points >= tres) {
      this.setState({ message: 'Well Done!' });
    }
  }

  redirectLogin = () => {
    const { history, dispatch } = this.props;
    dispatch(resetGame());
    history.push('/');
  }

  render() {
    const { message } = this.state;
    const { email, name, placar, points, history } = this.props;

    return (
      <div className="feed">
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
            alt={ email }
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">{ placar }</p>
          <p data-testid="feedback-text">{message}</p>
        </header>
        <div>
          <p data-testid="feedback-total-question">{points}</p>
          <p data-testid="feedback-total-score">{placar}</p>
        </div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.redirectLogin }
          className="btn"
        >
          Play Again
        </button>

        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
          className="btn"
        >
          Ranking
        </button>
      </div>);
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  placar: state.player.score,
  points: state.player.assertions,
});

FeedBack.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  placar: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(FeedBack);
