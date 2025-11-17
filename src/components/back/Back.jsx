import React from "react";
import { useNavigate } from "react-router-dom";

const Back = ({ name }) => {
  const navigate = useNavigate();
  return <div onClick={() => navigate(-1)}>{name}</div>;
};

export default Back;
