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
        <p data-testid="question-text">{question.pergunta}</p>
        <p>{question.difficulty}</p>
        <p data-testid="question-category">{question.categoria}</p>
        <div data-testid="answer-options">
          {question.totalResp
            .sort(() => Math.round(Math.random()) * 2 - 1)
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
    pergunta: PropTypes.string,
    categoria: PropTypes.string,
    difficulty: PropTypes.string,
    totalResp: PropTypes.arrayOf(Object),
  }).isRequired,
  handleAskClick: PropTypes.func.isRequired,
  color: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default QuestCard;
