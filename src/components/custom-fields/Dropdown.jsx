import React from "react";

const Dropdown = ({ options, value, onChange, disabled }) => {
  return (
    <select value={value} onChange={onChange} disabled={disabled}>
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
