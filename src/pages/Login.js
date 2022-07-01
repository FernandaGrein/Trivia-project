import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, saveName, saveEmail, quizApi } from '../redux/actions/index';

class Login extends React.Component {
    state = {
      name: '',
      email: '',
    }

    handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    }

    enableButton = () => {
      const { name, email } = this.state;
      if (name.length > 0 && email.length > 0) {
        return false;
      }
      return true;
    }

    handleClick = async () => {
      const { name, email } = this.state;
      const { getQuestions, saveNamefromLogin, saveEmailFromLogin,
        history } = this.props;
      saveNamefromLogin(name);
      saveEmailFromLogin(email);
      await getQuestions();
      history.push('/game');
    }

    goToSettings = () => {
      const { history } = this.props;
      history.push('/settings');
    }

    render() {
      const { name, email } = this.state;
      return (
        <div>
          <h3>Login</h3>
          <label htmlFor="name">
            Nome:
            <input
              id="name"
              name="name"
              type="text"
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
            disabled={ this.enableButton() }
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
  recebeQuiz: (token) => dispatch(quizApi(token)),

});

const mapStateToProps = (state) => ({
  questions: state.gameReducer.questions,
  resposta: state.gameReducer.resposta,
  token: state.gameReducer.token,
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,

  }).isRequired,
  getQuestions: PropTypes.func.isRequired,
  saveNamefromLogin: PropTypes.func.isRequired,

  saveEmailFromLogin: PropTypes.func.isRequired,

};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
