import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

class TelaJogo extends React.Component {
  state = {
    placar: 0,
  }

  render() {
    const { placar } = this.state;
    const { name } = this.props;
    console.log(name);
    return (
      <div>
        <header>
          <img src="" alt="Gravatar" />
          <p>{name}</p>
          <p>{placar}</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.playerReducer.name,
});

TelaJogo.propTypes = {
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(TelaJogo);
