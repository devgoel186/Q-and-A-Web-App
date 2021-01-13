import React from "react";

const Review = ({ answers }) => {
  return (
    <>
      <h1>Review</h1>
      {answers.map((item, i) => {
        return <p key={i}>{`${i + 1}. ${item}`}</p>;
      })}
    </>
  );
};

export default Review;
