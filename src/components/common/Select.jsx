import React from "react";
import { Dropdown } from "semantic-ui-react";

export const Select = ({
  label,
  options,
  value,
  id,
  onChange,
  alert,
  alertMsg,
}) => {
  options = [{ key: "", text: "Select...", value: "" }, ...options];
  return (
    <div className={`dr-select ${alert ? "select-alert" : ""}`}>
      <label htmlFor="select" className="select-label">
        {label}
      </label>
      <div className="select-area">
        {options && (
          <Dropdown
            placeholder="Select..."
            fluid
            search
            value={value}
            selection
            options={options}
            onChange={onChange}
          />
        )}
      </div>
      {alert && (
        <label htmlFor={id} className="select-alert-msg">
          {alertMsg}
        </label>
      )}
    </div>
  );
};
