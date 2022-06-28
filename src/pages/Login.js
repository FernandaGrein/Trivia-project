import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { fetchApi } from '../redux/actions/index';

class Login extends React.Component {
    state = {
      name: '',
      email: '',
      buttonDisable: true,
    }

    handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value }, () => this.enableButton());
    }

    enableButton = () => {
      const { name, email } = this.state;
      if (name.length > 0 && email.length > 0) {
        this.setState({ buttonDisable: false });
      } else {
        this.setState({ buttonDisable: true });
      }
    }

    handleClick = () => {
      const { getQuestions } = this.props;
      getQuestions();
    }

    render() {
      const { name, email, buttonDisable } = this.state;
      return (
        <div>
          <h3>Login</h3>
          <label htmlFor="name">
            Nome:
            <input
              id="name"
              name="name"
              type="name"
              value={ name }
              data-testid="input-player-name"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              name="email"
              type="email"
              value={ email }
              data-testid=""
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            className="Button"
            type="button"
            disabled={ buttonDisable }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            data-testid="btn-settings"
            className="Button"
            type="button"
            onClick={ () => <Redirect to="/settings" /> }
          >
            Configurações
          </button>
        </div>);
    }
}
// req 2

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchApi()),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  getQuestions: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
