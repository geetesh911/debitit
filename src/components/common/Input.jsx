import React from "react";

export const Input = ({
  name,
  id,
  label,
  type,
  onChange,
  value,
  min,
  minLength,
  maxLength,
  required,
  disabled,
  alert,
  helperText,
  alertMsg
}) => {
  let classes = "form-input";
  if (alert) classes = "form-input setAlert";
  return (
    <div className="dr-input">
      <div className={classes}>
        <input
          type={type || "text"}
          name={name}
          id={id || ""}
          value={value || ""}
          onChange={onChange}
          autoComplete="off"
          min={min}
          minLength={minLength}
          maxLength={maxLength}
          required={required === false ? false : true}
          disabled={disabled || false}
        />
        <label htmlFor={name} className="label">
          <span className="label-content">{label}</span>
        </label>
      </div>
      {alert && (
        <label htmlFor={name} className="alert-msg">
          {alertMsg}
        </label>
      )}
      {!alert && helperText && (
        <label htmlFor={name} className="helper-text">
          {helperText}
        </label>
      )}
    </div>
  );
};
