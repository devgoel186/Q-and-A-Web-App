import React from "react";

const Review = (props) => {
  return (
    <>
      <h1>Review</h1>
      {console.log(props.list)}
      {/* {props.list.map((item) => {
        return <p>{item}</p>;
      })} */}
    </>
  );
};

export default Review;
