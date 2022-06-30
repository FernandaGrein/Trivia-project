import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, saveName, saveEmail, inicialScore } from '../redux/actions/index';

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
      const { getQuestions, history, saveNamefromLogin, saveEmailFromLogin,
        setInicialScore } = this.props;
      saveNamefromLogin(name);
      saveEmailFromLogin(email);
      setInicialScore();
      await getQuestions();
      history.push('/game');
    }

    goToSettings = () => {
      const { history } = this.props;
      console.log(history);
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
  setInicialScore: () => dispatch(inicialScore()),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,

  }).isRequired,
  getQuestions: PropTypes.func.isRequired,
  saveNamefromLogin: PropTypes.func.isRequired,
  saveEmailFromLogin: PropTypes.func.isRequired,
  setInicialScore: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);

// no Component did mount
// fazer um array de objetos com a chave
// data-testid + chave resposta

// fazer um shuffler (pode ser com random)

// renderizar nos botões esse array separando o data-testid e a resposta
// cada um em seu lugar

// - para passar as questions - clicar no botão 'next' que troca o index da questão na tela
