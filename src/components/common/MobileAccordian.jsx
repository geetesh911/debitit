import React, { Fragment } from "react";
import { Accordion, Card } from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import { Link } from "react-router-dom";

export const MobileAccordian = ({ options }) => {
  function CustomToggle({ children, eventKey, id }) {
    const decoratedOnClick = useAccordionToggle(eventKey, () => {
      const element = document.getElementById(id);

      if (element.className === "btn btn-link") {
        let elements = document.getElementsByClassName("btn-link");
        for (var i = 0; i < elements.length; i++) {
          elements[i].classList.remove("shown");
        }

        element.classList.add("shown");
      } else if (element.className === "btn btn-link shown") {
        element.classList.remove("shown");
      }
    });

    return (
      <button
        type="button"
        id={id}
        className="btn btn-link"
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  return (
    <Fragment>
      <Accordion>
        {options.map((opt, index) => (
          <Fragment key={index}>
            {opt.seperator && <div className="seperator"></div>}
            {opt.heading && <div className="nav-heading">{opt.heading}</div>}
            {opt.arr &&
              opt.arr.map((option, index) => (
                <Card key={option.name}>
                  <Card.Header>
                    <CustomToggle
                      eventKey={`${option.name}${index}`}
                      id={option.name}
                    >
                      {option.heading}
                      <svg viewBox="0 0 24 24" className="nav-icon">
                        <g>
                          <path d="M17.207 11.293l-7.5-7.5c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L15.086 12l-6.793 6.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.023 0-1.414z"></path>
                        </g>
                      </svg>
                    </CustomToggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={`${option.name}${index}`}>
                    <Card.Body>{option.body}</Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            {opt.other &&
              opt.other.map(option => (
                <div className="other-accordian" key={option.name}>
                  <Link
                    to="#!"
                    id={option.name}
                    className="btn btn-link"
                    onClick={option.onClick ? option.onClick : ""}
                  >
                    {/* {children} */}
                    {option.heading}
                    <svg viewBox="0 0 24 24" className="nav-icon">
                      <g>
                        <path d="M17.207 11.293l-7.5-7.5c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L15.086 12l-6.793 6.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.023 0-1.414z"></path>
                      </g>
                    </svg>
                  </Link>
                </div>
              ))}
          </Fragment>
        ))}
      </Accordion>
    </Fragment>
  );
};
