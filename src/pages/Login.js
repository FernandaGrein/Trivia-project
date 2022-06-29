import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, saveName, saveEmail } from '../redux/actions/index';

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
      const { name, email } = this.state;
      const { getQuestions, history, saveNamefromLogin, saveEmailFromLogin } = this.props;
      saveNamefromLogin(name);
      saveEmailFromLogin(email);
      getQuestions();
      history.push('/game');
    }

    goToSettings = () => {
      const { history } = this.props;
      console.log(history);
      history.push('/settings');
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
              placeholder="Digite seu nome"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              id="email"
              name="email"
              type="email"
              value={ email }
              data-testid="input-gravatar-email"
              onChange={ this.handleChange }
              placeholder="Digite seu e-mail"
            />
          </label>
          <button
            data-testid="btn-play"
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
            onClick={ this.goToSettings }
          >
            settings
          </button>
        </div>);
    }
}

const mapDispatchToProps = (dispatch) => ({
  getQuestions: () => dispatch(fetchApi()),
  saveNamefromLogin: (name) => dispatch(saveName(name)),
  saveEmailFromLogin: (email) => dispatch(saveEmail(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,

  }).isRequired,
  getQuestions: PropTypes.func.isRequired,
  saveNamefromLogin: PropTypes.func.isRequired,
  saveEmailFromLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
