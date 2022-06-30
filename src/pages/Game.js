import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import Quiz from '../components/Quiz';

class TelaJogo extends React.Component {
  state = {
    placar: 0,
  }

  // import md5 from 'crypto-js/md5';
  // const hash = md5(email).toString();
  // const URL = `https://www.gravatar.com/avatar/${hash}`;
  // response.src

  render() {
    const { placar } = this.state;
    const { name, email } = this.props;
    return (
      <div>
        <header>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
            alt="Gravatar"
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{name}</p>
          <p>{placar}</p>
        </header>
        <Quiz />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.playerReducer.name,
  email: state.playerReducer.gravatarEmail,
});

TelaJogo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(TelaJogo);
