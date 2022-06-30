import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { quizApi } from '../redux/actions/index';

class Quiz extends React.Component {

    state = {
        codeResponse: 0,
        answers: [],
        questions: [],
        questionNumber: 0,
    }

  async componentDidMount() {
    const { recebeQuiz, token, questions } = this.props;
    recebeQuiz(token);
    const { response_code, results } = questions;
    this.setState({codeResponse: response_code, questions: results})
    
    // if (questions.response_code) {
    //     const responseObj = {
    //         test: `data-testid="correct-answer"`,
    //         resposta: questions[0].correct_answer,
    //     }

    //     this.state.answers.push(responseObj);
    
    //     this.setState((prevState) => ({
    //         answers: [...prevState.answers, responseObj]
    //     })); 
    
    //     const objErro1 = {
    //         test: `data-testid="wrong-answer-${0}"`,
    //         resposta: questions[0].incorrect_answers[0],
    //     }
    
    //     this.setState((prevState) => ({
    //         answers: [...prevState.answers, objErro1]
    //     })); 
    
    //     const objErro2 = {
    //         test: `data-testid="wrong-answer-${1}"`,
    //         resposta: questions[0].incorrect_answers[1]
    //     }
    
    //     this.setState((prevState) => ({
    //         answers: [...prevState.answers, objErro2]
    //     })); 
    
    //     const objErro3 = {
    //         test: `data-testid="wrong-answer-${2}"`,
    //         resposta: questions[0].incorrect_answers[2]
    //     }
    
    //     this.setState((prevState) => ({
    //         answers: [...prevState.answers, objErro3]
    //     })); 
    // }

  }

  handleClick = () => {
    console.log('clicou')
  }

  render() {
    const { questions, questionNumber, answers } = this.state;
    const { resposta } = this.props;
    
    console.log(resposta)
    return (
            <div>
                { questions.length > 0 && (
                    <div>
                        <p data-testid="question-text">{ questions[0].question }</p>
                        <p>{ questions[0].difficulty }</p>
                        <p data-testid="question-category">{ questions[0].category }</p>

                        <button
                        type="button"
                        onClick={ this.handleClick }
                        >{}</button>
                        <button>{}</button>
                        <button>{}</button>
                        <button>{}</button>
                    </div>
                )}
            </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
    recebeQuiz: (token) => dispatch(quizApi(token)),
});

const mapStateToProps = (state) => ({
    token: state.gameReducer.token,
    questions: state.gameReducer.questions,
    resposta: state.gameReducer.resposta,
});

Quiz.propTypes = {
    token: PropTypes.string.isRequired,
    recebeQuiz: PropTypes.func.isRequired,
    questions: PropTypes.shape(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
