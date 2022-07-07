import React from 'react';
import { PropTypes } from 'prop-types';
import './QuestCard.css';

class QuestCard extends React.Component {
  handleColor = (itemStatus) => {
    const { color } = this.props;

    if (color === true && itemStatus === 'certo') {
      return 'green';
    }
    if (color === true && itemStatus === 'errado') {
      return 'red';
    }
    return false;
  }

  render() {
    const { question, handleAskClick, disabled } = this.props;

    return (
      <>
        <p data-testid="question-text">{question.question}</p>
        <p>{question.difficulty}</p>
        <p data-testid="question-category">{question.category}</p>
        <div data-testid="answer-options">
          {question.totalResp
            .map((item, index) => (
              <button
                key={ index }
                type="button"
                onClick={ handleAskClick }
                onChange={ this.handleChange }
                data-testid={ item.test }
                id={ item.status }
                name={ question.difficulty }
                disabled={ disabled }
                className={ this.handleColor(item.status) }
              >
                {item.resp}

              </button>
            ))}
        </div>
      </>
    );
  }
}
QuestCard.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string,
    category: PropTypes.string,
    difficulty: PropTypes.string,
    totalResp: PropTypes.arrayOf(Object),
  }).isRequired,
  handleAskClick: PropTypes.func.isRequired,
  color: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default QuestCard;
