import React from "react";
import { SearchInput } from "./SearchInput";

export const StatsAccordian = ({
  name,
  label,
  data,
  searchState,
  onChange
}) => {
  return (
    <div className="accordion stats-accordian" id={`${name}Example`}>
      <div className="card">
        <button
          className="btn btn-link"
          type="button"
          data-toggle="collapse"
          data-target={`#${name}`}
          aria-expanded="true"
          aria-controls={name}
        >
          <div className="card-header" id="headingOne">
            <h2 className="mb-0">{label}</h2>
            <svg viewBox="0 0 24 24" className="nav-icon">
              <g>
                <path d="M17.207 11.293l-7.5-7.5c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L15.086 12l-6.793 6.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.023 0-1.414z"></path>
              </g>
            </svg>
          </div>
        </button>

        <div
          id={name}
          className="collapse body show"
          aria-labelledby="headingOne"
          data-parent={`#${name}Example`}
        >
          <div className="card-body">
            <SearchInput onChange={onChange} value={searchState} />
            {data && data.length > 0 ? (
              data.map(d => (
                <div className="data" key={d._id}>
                  <div className="user-image">
                    <img
                      src="https://i.ibb.co/nQ951dX/default-profile-200x200.png"
                      alt=""
                      className="user-icon"
                    />
                  </div>
                  <div className="user-stats">
                    <div className="name">{d.name}</div>
                    <div className="due">
                      <span className="badge badge-dark">
                        <strong>Due: </strong>
                        {`\u20B9${d.due}`}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="msg">Nothing Here...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
