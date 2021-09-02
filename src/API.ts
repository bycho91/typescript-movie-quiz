import {shuffleArray} from './utils';


export interface Question {
	category: string;
	correct_answer: string;
	difficulty: string;
	incorrect_answers: Array<string>;
	question: string;
	type: string;
}

export interface QuestionState extends Question {
	answer_choices: Array<string>;
}


export enum Difficulty {
	EASY = 'easy',
	MEDIUM = 'medium',
	HARD = 'hard'
}


export const fetchQuizQuestions = async (numQuestions: number, difficulty:Difficulty) => {
	const endpoint = `https://opentdb.com/api.php?amount=${numQuestions}&category=11&type=multiple&difficulty=${difficulty}`;

	const data = await (await fetch(endpoint)).json();

	return data.results.map((question: Question) => (
		{
			...question,
			answer_choices: shuffleArray([...question.incorrect_answers, question.correct_answer])
		}
	))

	console.log(data);
}