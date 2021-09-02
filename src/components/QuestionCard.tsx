import React from 'react';

interface Props {
	question: string;
	answerChoices: Array<string>;
	callback: any;
	userAnswer: any;
	currentQuestion: number;
	totalQuestions: number;
}

const QuestionCard:React.FC<Props> = ({question, answerChoices, callback, userAnswer, currentQuestion, totalQuestions}) => {
	return (
		<div>
			<p className="number">Question: {currentQuestion} / {totalQuestions}</p>
			<p dangerouslySetInnerHTML={{__html: question}}></p>
			<div className="answers">
				{answerChoices.map(choice => (
					<div key={choice}>
						<button disabled={userAnswer} onClick={callback} value={choice}>
							<span dangerouslySetInnerHTML={{__html: choice}}></span>
						</button>
					</div>
				))}
			</div>
		</div>
	)
}

export default QuestionCard;