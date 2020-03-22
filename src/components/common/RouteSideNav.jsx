import React, { Fragment } from "react";

export const RouteSideNav = ({ options }) => {
  return (
    <Fragment>
      <div className="side-nav">
        <div
          className="nav tab-flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          {options.map((opt, index) => (
            <Fragment key={index}>
              {opt.seperator && <div className="seperator"></div>}
              <div className="nav-heading">{opt.heading}</div>
              <a
                className={`nav-link ${opt.firstActive ? "active" : ""}`}
                id={`${opt.firstOption.name}-tab`}
                data-toggle="pill"
                href={`#${opt.firstOption.name}`}
                role="tab"
                aria-controls={opt.firstOption.name}
                aria-selected="true"
              >
                {opt.firstOption.label}
                <svg viewBox="0 0 24 24" className="nav-icon">
                  <g>
                    <path d="M17.207 11.293l-7.5-7.5c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L15.086 12l-6.793 6.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.023 0-1.414z"></path>
                  </g>
                </svg>
              </a>
              {opt.otherOptions &&
                opt.otherOptions.map(option => (
                  <a
                    className="nav-link"
                    id={`${option.name}-tab`}
                    data-toggle="pill"
                    href={`#${option.name}`}
                    role="tab"
                    aria-controls={option.name}
                    aria-selected="false"
                    key={option.name}
                  >
                    {option.label}
                    <svg viewBox="0 0 24 24" className="nav-icon">
                      <g>
                        <path d="M17.207 11.293l-7.5-7.5c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L15.086 12l-6.793 6.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.023 0-1.414z"></path>
                      </g>
                    </svg>
                  </a>
                ))}
            </Fragment>
          ))}
        </div>
      </div>
    </Fragment>
  );
};
