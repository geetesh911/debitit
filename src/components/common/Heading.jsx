import React from "react";

export const Heading = ({ heading, icon }) => {
  return (
    <div className="page-heading">
      <div className="heading-container">
        {icon && <img src={icon} className="avatar" alt="" />}

        <div className="heading-text">{heading}</div>
      </div>
    </div>
  );
};
