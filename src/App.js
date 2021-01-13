import React, { useState } from "react";

import Review from "./components/ReviewSection";

import { Container, Row, Col, Button } from "react-bootstrap";

const App = () => {
  const [chosen, setChosen] = useState(false);
  const [question, setQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleClick = (val) => {
    if (val) setChosen(val);
  };

  const handlePrev = () => {
    if (chosen) setScore(score - 1);
    setChosen(false);
    setQuestion(question - 1);
  };

  const handleNext = () => {
    if (chosen) setScore(score + 1);
    setChosen(false);
    setQuestion(question + 1);
  };

  const handleSubmit = () => {
    setShowScore(true);
  };

  const questions = [
    {
      questionText: "What is the capital of France?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionText: "Who is CEO of Tesla?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionText: "The iPhone was created by which company?",
      answerOptions: [
        { answerText: "Apple", isCorrect: true },
        { answerText: "Intel", isCorrect: false },
        { answerText: "Amazon", isCorrect: false },
        { answerText: "Microsoft", isCorrect: false },
      ],
    },
    {
      questionText: "How many Harry Potter books are there?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
  ];
  return (
    <Container>
      <Row>
        <Col sm={4}>
          <Review />
        </Col>
        <Col sm={8}>
          {!showScore ? (
            <>
              <h1>Question {question + 1}</h1>
              <h3>Total questions = {questions.length}</h3>
              <p>{questions[question].questionText}</p>
              {questions[question].answerOptions.map((option, key) => {
                return (
                  <div className="m-2" style={{ textAlign: "center" }}>
                    <Button
                      variant="secondary"
                      onClick={() => handleClick(option.isCorrect)}
                      style={{ width: "50%" }}
                    >
                      {option.answerText}
                    </Button>
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
      </Row>
    </Container>
  );
};

export default App;
