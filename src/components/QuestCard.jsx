import React from 'react';
import { PropTypes } from 'prop-types';

class QuestCard extends React.Component {
  render() {
    const { question, handleAskClick } = this.props;

    return (
      <>
        <p data-testid="question-text">{ question.pergunta }</p>
        <p>{ question.difficulty }</p>
        <p data-testid="question-category">{ question.categoria }</p>
        <div data-testid="answer-options">
          { question.totalResp.sort(() => Math.round(Math.random()) * 2 - 1)
            .map((item, index) => (
              <button
                key={ index }
                type="button"
                onClick={ handleAskClick }
                data-testid={ item.test }
                id={ item.status }
                name={ question.difficulty }
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
};

export default QuestCard;
