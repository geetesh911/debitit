import React from "react";
import { Link } from "react-router-dom";

export const NavLink = ({ Icon, onClick, activeIcons, id, active }) => {
  let name = id.split("-");

  if (name.length === 1) name = name[0];
  else name = name[1];

  return (
    <Link to={`/${name === "home" ? "" : name}`}>
      <div
        className={`menu-option ${active ? "activeNav" : ""}`}
        id={id}
        onClick={() => onClick(name)}
      >
        <Icon active={activeIcons[name]} />
        <div className="menu-text">{name}</div>
      </div>
    </Link>
  );
};
