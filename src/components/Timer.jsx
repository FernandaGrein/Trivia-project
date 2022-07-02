import React from 'react';
import { PropTypes } from 'prop-types';

const ONE_SECOND = 1000;
const TIME_LIMIT = 0;

class Timer extends React.Component {
  state = {
    seconds: 30,
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => ({ seconds: prevState.seconds - 1 }));
    }, ONE_SECOND);
  }

  componentDidUpdate() {
    const { seconds } = this.state;
    const { disabledButton } = this.props;
    if (seconds === TIME_LIMIT) {
      disabledButton();
      this.componentWillUnmount();
    }
  }

  componentWillUnmount() {
    const { seconds } = this.state;
    const { saveTimer } = this.props;
    saveTimer(seconds);
    clearInterval(this.intervalId);
  }

  render() {
    const { seconds } = this.state;
    return <h2>{seconds}</h2>;
  }
}

Timer.propTypes = {
  disabledButton: PropTypes.func.isRequired,
  saveTimer: PropTypes.func.isRequired,
};

export default Timer;
