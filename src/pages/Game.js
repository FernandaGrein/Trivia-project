import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { scoreCounter } from '../redux/actions';

class TelaJogo extends React.Component {
  // import md5 from 'crypto-js/md5';
  // const hash = md5(email).toString();
  // const URL = `https://www.gravatar.com/avatar/${hash}`;
  // response.src

  disparaAction = () => {
    const { countScore } = this.props;
    const timer = 10;
    const dificuldade = 'hard';
    countScore(timer, dificuldade);
    // if (questão === true) {
    //   countScore(timer, dificuldade);
    // }
  }

  render() {
    const { name, email, placar } = this.props;
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
          <button type="button" onClick={ this.disparaAction }>disparar a action</button>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.playerReducer.name,
  email: state.playerReducer.gravatarEmail,
  placar: state.playerReducer.score,
});

const mapDispatchToProps = (dispatch) => ({
  countScore: (timer, dificuldade) => dispatch(scoreCounter(timer, dificuldade)),
});

TelaJogo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  placar: PropTypes.number.isRequired,
  countScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TelaJogo);
