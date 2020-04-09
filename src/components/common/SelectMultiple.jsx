import React from "react";
import { Dropdown } from "semantic-ui-react";

export const SelectMultiple = ({
  label,
  options,
  id,
  onChange,
  alert,
  value,
  alertMsg,
}) => {
  return (
    <div className={`dr-select-multiple ${alert ? "select-alert" : ""}`}>
      <label htmlFor="select" className="select-label">
        {label}
      </label>
      <div className="select-area">
        <Dropdown
          placeholder={"Select..."}
          fluid
          multiple
          search
          selection
          value={value}
          options={options}
          onChange={onChange}
        />
      </div>
      {alert && (
        <label htmlFor={id} className="select-alert-msg">
          {alertMsg}
        </label>
      )}
    </div>
  );
};
