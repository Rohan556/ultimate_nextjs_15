import React from "react";

const Questions = ({ params }: { params: { id: string } }) => {
  return <div>{params.id}</div>;
};

export default Questions;
