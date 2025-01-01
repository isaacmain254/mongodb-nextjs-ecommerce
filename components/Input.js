import React from "react";

const formatLabel = (label) => {
  // Add space before each capital letter and capitalize the first letter
  return label
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());
};

const Input = ({ type = "text", name, className = "" }) => {
  return (
    <>
      <label htmlFor="username" className="pt-3">
        {formatLabel(name)}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className={`p-2 rounded  text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
      />
    </>
  );
};

export default Input;
