import React, { useState, useEffect } from "react";
import { Input } from "../common/Input";
import { connect } from "react-redux";
import { login } from "./../../actions/authAction";
import { clearErrors } from "./../../actions/authAction";
import { SaveButton } from "../common/SaveButton";

const Login = ({ auth: { isAuthenticated, error }, login, clearErrors }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    setAlert: false
  });

  const [loading, setLoading] = useState(false);

  const { email, password, setAlert } = formData;

  useEffect(() => {
    if (isAuthenticated) window.location = "/accounts";
    if (error === "Invalid Credentials") {
      setFormData({ ...formData, setAlert: true });
      clearErrors();
    }
    //eslint-disable-next-line
  }, [isAuthenticated, error]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    await login({
      email,
      password
    });
    setLoading(false);
  };

  return (
    <div className="login">
      <div className="form-area">
        <div className="logo">
          <img
            src="https://i.ibb.co/LkbKKgt/logo.png"
            className="brand-img"
            alt=""
          />
        </div>
        <div className="form">
          <div className="text">Log in to Debitit </div>
          <form onSubmit={onSubmit}>
            <Input
              name="email"
              label="email"
              alert={setAlert}
              alertMsg="Invalid Email or"
              onChange={onChange}
              value={email}
            />
            <Input
              name="password"
              type="password"
              label="password"
              alert={setAlert}
              alertMsg="Invalid Password"
              onChange={onChange}
              value={password}
              minLength="6"
            />
            <SaveButton label="Login" loading={loading} />
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { login, clearErrors })(Login);
