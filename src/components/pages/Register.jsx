import React, { useState, useEffect } from "react";
import { Input } from "../common/Input";
import { connect } from "react-redux";
import { registerUser } from "./../../actions/authAction";
import { clearErrors } from "./../../actions/authAction";

const Register = ({
  auth: { isAuthenticated, error },
  registerUser,
  clearErrors
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    setAlert: {
      email: false,
      password: false
    }
  });

  const [loading, setLoading] = useState(false);

  const { name, email, password, password2, setAlert } = formData;

  useEffect(() => {
    if (isAuthenticated) window.location = "/accounts";
    if (error === "User already exist") {
      setFormData({ ...formData, setAlert: { ...setAlert, email: true } });
      clearErrors();
    }
    //eslint-disable-next-line
  }, [isAuthenticated]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setFormData({
      ...formData,
      setAlert: { ...setAlert, email: false, password: false }
    });

    if (password !== password2) {
      setFormData({
        ...formData,
        setAlert: { ...setAlert, password: true }
      });
    } else if (error === "User already exist") {
      setFormData({ ...formData, setAlert: { ...setAlert, email: true } });
      clearErrors();
    } else {
      setLoading(true);
      await registerUser({
        name,
        email,
        password
      });
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="form-area">
        <div className="logo">
          <img
            src="https://i.ibb.co/LkbKKgt/logo.png"
            className="brand-img"
            alt=""
          />
        </div>
        <div className="form">
          <div className="text">Create your account</div>
          <form onSubmit={onSubmit}>
            <Input
              name="name"
              label="business name"
              onChange={onChange}
              value={name}
            />
            <Input
              name="email"
              label="email"
              alert={setAlert.email}
              alertMsg="User Already Exists"
              onChange={onChange}
              value={email}
            />
            <Input
              name="password"
              label="password"
              type="password"
              alert={setAlert.password}
              onChange={onChange}
              value={password}
              minLength="6"
            />
            <Input
              name="password2"
              label="confirm password"
              type="password"
              alert={setAlert.password}
              alertMsg="Passwords do not match"
              onChange={onChange}
              value={password2}
              minLength="6"
            />
            <button
              type="submit"
              className="button filled-button submit-button"
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { registerUser, clearErrors })(
  Register
);
