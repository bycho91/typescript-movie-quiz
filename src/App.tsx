import React, { useState, useEffect } from "react";
import "./App.css";
//Function Imports
import { fetchQuizQuestions } from "./API";
import { Difficulty, QuestionState } from "./API";
//Component Imports
import QuestionCard from "./components/QuestionCard";

interface AnswerObject {
  question: string;
  user_answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_NUM_QUESTIONS = 10;

const App = () => {
  //STATES
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  //FUNCTIONS
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_NUM_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setCurrentQuestion(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //users answers
      const user_answer = e.currentTarget.value;

      // check answer against correct answers
      const correct = questions[currentQuestion].correct_answer === user_answer;

      //add score if answer is correct
      if (correct) {
        setScore(prev => prev + 1)
      }

      //save answer to array of user answers
      const answerObject = {
        question: questions[currentQuestion].question,
        user_answer,
        correct,
        correctAnswer: questions[currentQuestion].correct_answer
      };

      setUserAnswers(prev => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  return (
    <div className="App">
      <h1>Typescript Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_NUM_QUESTIONS ? (
        <button className="start-btn" onClick={startTrivia}>
          Start Quiz
        </button>
      ) : null}
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading && <p>Loading questions...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          currentQuestion={currentQuestion + 1}
          totalQuestions={TOTAL_NUM_QUESTIONS}
          answerChoices={questions[currentQuestion].answer_choices}
          question={questions[currentQuestion].question}
          userAnswer={userAnswers ? userAnswers[currentQuestion] : undefined}
          callback={checkAnswer}
        />
      )}

      {!gameOver &&
      !loading &&
      userAnswers.length === currentQuestion + 1 &&
      currentQuestion !== TOTAL_NUM_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </div>
  );
};

export default App;
