import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { PropTypes } from 'prop-types';

class Header extends React.Component {
  render() {
    const { name, email, placar } = this.props;
    return (
      <header>
        <img
          src={ `https://www.gravatar.com/avatar/${md5(email).toString()}` }
          alt="Gravatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{name || ''}</p>
        <p data-testid="header-score">{placar || 0}</p>
      </header>);
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  email: state.player.gravatarEmail,
  placar: state.player.score,
  questions: state.gameReducer.questions,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  placar: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
