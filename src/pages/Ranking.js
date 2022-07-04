import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { resetGame } from '../redux/actions';

class Ranking extends React.Component {
  redirectLogin = () => {
    const { history, dispatch } = this.props;
    dispatch(resetGame());
    history.push('/');
  }

  getGravatar = (foto) => {
    const takeEmail = md5(foto).toString();
    const takeAvatar = `https://www.gravatar.com/avatar/${takeEmail}`;
    return takeAvatar;
  }

  render() {
    const { userName, scorePlayer, userEmail } = this.props;
    const oldPlayers = JSON.parse(localStorage.getItem('ranking'));

    let sortedRanking;
    if (oldPlayers === null) {
      sortedRanking = [{ name: userName, score: scorePlayer, picture: userEmail }];
    } else {
      const addStorage = [...oldPlayers,
        { name: userName, score: scorePlayer, picture: userEmail }];
      sortedRanking = addStorage
        .sort((obj1, obj2) => obj2.score - obj1.score);
    }
    localStorage.setItem('ranking', JSON.stringify(sortedRanking));

  render() {
    return (
      <div>
        <header>
          <h1 data-testid="ranking-title">Ranking</h1>
        </header>
        <section>
          {sortedRanking.map((player, index) => (
            <div key={ index }>
              <img
                src={ this.getGravatar(player.picture) }
                alt="gravatar"
              />
              <p
                data-testid={ `player-name-${index}` }
              >
                {player.name}

              </p>
              <p
                data-testid={ `player-score-${index}` }
              >
                {player.score}

              </p>
            </div>))}
          <button
            data-testid="btn-go-home"
            type="button"
            name="btn-go-home"
            onClick={ this.redirectLogin }
          >
            Login
          </button>
        </section>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: propTypes.shape().isRequired,
  dispatch: propTypes.func.isRequired,
  userName: propTypes.string.isRequired,
  userEmail: propTypes.string.isRequired,
  scorePlayer: propTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  userName: state.player.name,
  userEmail: state.player.gravatarEmail,
  scorePlayer: state.player.score,
});

export default connect(mapStateToProps)(Ranking);
