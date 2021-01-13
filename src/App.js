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

  const calculateScore = (total = 0, value) => {
    if (value) total++;
    return total;
  };

  const handlePrev = () => {
    setChoices([...choices.slice(0, question - 1)]);
    setQuestion(question - 1);
  };

  const handleNext = () => {
    setChoices([...choices, choices[question]]);
    setQuestion(question + 1);
  };

  const handleSubmit = () => {
    setScore(choices.reduce(calculateScore));
    setShowScore(true);
  };

  return (
    <Container>
      <Row>
        <Col sm={8}>
          {!showScore ? (
            <>
              <h1>Question {question + 1}</h1>
              <h3>Total questions = {questions.length}</h3>
              <p>{questions[question].questionText}</p>
              {questions[question].answerOptions.map((option, key) => {
                return (
                  <div className="m-2" style={{ textAlign: "center" }}>
                    <div
                      onClick={() => compareAnswer(option)}
                      className={`option ${
                        userAnswer[question] === option.answerText
                          ? "selected"
                          : null
                      }`}
                    >
                      {option.answerText}
                    </div>
                  </div>
                );
              })}
              {question !== 0 ? (
                <Button onClick={handlePrev} className="mr-2">
                  Previous Question
                </Button>
              ) : (
                <div></div>
              )}
              {question !== questions.length - 1 ? (
                <Button onClick={handleNext} className="mr-2">
                  Next Question
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="mr-2">
                  Submit
                </Button>
              )}
            </>
          ) : (
            <h1>
              Your final score : {score}/{questions.length}
            </h1>
          )}
        </Col>
        <p>{score}</p>
        <Col>
          {userAnswer.map((item) => {
            return <p>{item}</p>;
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default App;
