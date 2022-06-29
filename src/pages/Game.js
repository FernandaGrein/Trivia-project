import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class TelaJogo extends React.Component {
  // import md5 from 'crypto-js/md5';
  // const hash = md5(email).toString();
  // const URL = `https://www.gravatar.com/avatar/${hash}`;
  // response.src

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
          <p data-testid="header-player-name">{name}</p>
          <p data-testid="header-score">{placar}</p>
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

TelaJogo.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  placar: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(TelaJogo);
