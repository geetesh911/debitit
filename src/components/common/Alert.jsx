import React, { useState, Fragment } from "react";
import { Toast } from "react-bootstrap";
import { connect } from "react-redux";

const Alert = ({ alert }) => {
  const [show, setShow] = useState(true);
  return (
    <Fragment>
      {alert.map(a => (
        <Fragment key={a.id}>
          <div
            className={`dr-toast ${a.type === "info" &&
              "toast-info"} ${a.type === "danger" && "toast-danger"}`}
          >
            <Toast
              // onClose={() => setShow(false)}
              show={show}
              delay={a.timeout || 5000}
              autohide
            >
              <div className="toast-header">
                <strong className="mr-auto">Debitit</strong>
              </div>
              <Toast.Body>{a.msg}</Toast.Body>
            </Toast>
          </div>
          <div
            className={`dr-mobile-toast ${a.type === "info" &&
              "toast-info"} ${a.type === "danger" && "toast-danger"}`}
          >
            <Toast
              onClose={() => setShow(false)}
              show={show}
              delay={300000}
              autohide
            >
              <Toast.Body>{a.msg}</Toast.Body>
            </Toast>
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(Alert);
