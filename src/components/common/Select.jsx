import React from "react";

export const Select = ({
  label,
  options,
  id,
  onChange,
  value,
  first,
  alert,
  alertMsg
}) => {
  return (
    <div className={`dr-select ${alert ? "select-alert" : ""}`}>
      <label htmlFor="select" className="select-label">
        {label}
      </label>
      <div className="select-area">
        <select id={id} value={value} name={id} onChange={onChange}>
          {first && <option value="">Select....</option>}
          {options.map(option => (
            <option
              value={option.value || option}
              key={`option.value${Math.random()}` || option}
            >
              {option.name || option}
            </option>
          ))}
        </select>
      </div>
      {alert && (
        <label htmlFor={id} className="select-alert-msg">
          {alertMsg}
        </label>
      )}
    </div>
  );
};
