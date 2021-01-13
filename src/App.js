import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import questions from "./questions";
import "./styles.css";

const App = () => {
  const [userAnswer, setUserAnswer] = useState([]);
  const [choices, setChoices] = useState([]);
  const [question, setQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const compareAnswer = (opt) => {
    setUserAnswer([
      ...userAnswer.slice(0, question),
      opt.answerText,
      ...userAnswer.slice(question + 1),
    ]);
    setChoices([...choices.slice(0, question), opt.isCorrect]);
  };

  const calculateScore = (total, value) => {
    if (value) total++;
    return total;
  };

  const handleSkip = () => {
    setUserAnswer([
      ...userAnswer.slice(0, question),
      "Skipped",
      ...userAnswer.slice(question + 1),
    ]);
    setChoices([...choices.slice(0, question), false]);
    if (question === questions.length - 1) handleSubmit();
    setQuestion(question + 1);
  };

  const handlePrev = () => {
    setChoices([...choices.slice(0, question - 1)]);
    setQuestion(question - 1);
  };

  const handleNext = () => {
    setChoices([...choices.slice(0, question), choices[question]]);
    console.log(choices);
    setQuestion(question + 1);
  };

  const handleSubmit = () => {
    setScore(choices.reduce(calculateScore, 0));
    setShowScore(true);
  };

  return (
    <Container>
      <Row>
        <Col sm={8} className="quizSection">
          {!showScore ? (
            <>
              <h1>Question {question + 1}</h1>
              <p>Total questions = {questions.length}</p>
              <h3>Question : {questions[question].questionText}</h3>
              {questions[question].answerOptions.map((option, i) => {
                return (
                  <div
                    key={i}
                    onClick={() => compareAnswer(option)}
                    style={{ textAlign: "center" }}
                    className={`m-2 option ${
                      userAnswer[question] === option.answerText
                        ? "selected"
                        : null
                    }`}
                  >
                    {option.answerText}
                  </div>
                );
              })}
              <div style={{ textAlign: "center" }}>
                {question !== 0 ? (
                  <Button onClick={handlePrev} className="m-2">
                    Previous Question
                  </Button>
                ) : null}
                {question !== questions.length - 1 ? (
                  <Button
                    disabled={!userAnswer[question]}
                    onClick={handleNext}
                    className="m-2"
                  >
                    Next Question
                  </Button>
                ) : (
                  <Button
                    disabled={!userAnswer[question]}
                    onClick={handleSubmit}
                    className="m-2"
                  >
                    Submit
                  </Button>
                )}
                <Button onClick={handleSkip} className="m-2">
                  Skip Question
                </Button>
              </div>
            </>
          ) : (
            <>
              <h1>
                Your final score : {score}/{questions.length}
              </h1>
              <p>
                [Score Percentage : {`${(score / questions.length) * 100} %]`}
              </p>
              <h3 className="m-2">Correct Answers : </h3>
              {questions.map((question, i) => {
                return question.answerOptions.map((option, k) => {
                  return option.isCorrect ? (
                    <p key={k}>{`${i + 1}. ${option.answerText}`}</p>
                  ) : null;
                });
              })}
            </>
          )}
        </Col>
        <Col sm={4} className="reviewSection">
          <h1>Review</h1>
          {userAnswer.map((item, i) => {
            return <p key={i}>{`${i + 1}. ${item}`}</p>;
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
