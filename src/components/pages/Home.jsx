import React, { Fragment } from "react";
import { Link } from "react-router-dom";
export const Home = () => {
  let year = new Date().getFullYear();
  return (
    <Fragment>
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="home">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 order-lg-1 order-md-2 order-sm-2 order-2 usp">
              <div className="usp-content">
                <ul>
                  <li>
                    <div className="usp-list">
                      <div className="list-img">
                        <img
                          src="https://i.ibb.co/NZCc7Dr/bill.png"
                          alt=""
                          className="usp-list-img"
                        />
                      </div>
                      <div className="list-text">Your Billing Buddy</div>
                    </div>
                  </li>
                  <li>
                    <div className="usp-list">
                      <div className="list-img">
                        <img
                          src="https://i.ibb.co/XWQbfF5/wallet.png"
                          alt=""
                          className="usp-list-img"
                        />
                      </div>
                      <div className="list-text">
                        Maintain Expenses of Business
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="usp-list">
                      <div className="list-img">
                        <img
                          src="https://i.ibb.co/CPf6XsS/book.png"
                          alt=""
                          className="usp-list-img"
                        />
                      </div>
                      <div className="list-text">
                        Maintain Books of Accounts
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 order-lg-2 order-md-1 order-sm-1 order-1 links">
              <div className="links-content">
                <div className="logo">
                  <img
                    src="https://i.ibb.co/LkbKKgt/logo.png"
                    className="brand-img"
                    alt=""
                  />
                </div>
                <div className="tagline">
                  Struggling with finance,
                  <br />
                  <br />
                  Just debitit
                </div>
                <div className="msg">Join Debitit today</div>
                <Link to="/register">
                  <div className="signup-button">Sign up</div>
                </Link>
                <Link to="/login">
                  <div className="login-button">Login</div>
                </Link>
              </div>
            </div>
          </div>
          <div className="footer">Copyright &copy; {year} Debitit</div>
        </div>
      </div>
    </Fragment>
  );
};
