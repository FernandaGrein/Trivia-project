import React from 'react';

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
      console.log('click');
    }

    render() {
      const { name, email, buttonDisable } = this.state;
      return (
        <div>
          <h3>Login</h3>
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
          <button
            data-testid="btn-play"
            className="Button"
            type="button"
            disabled={ buttonDisable }
            onClick={ this.handleClick }
          >
            Play
          </button>
        </div>);
    }
}

export default Login;
