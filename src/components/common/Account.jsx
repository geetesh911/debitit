import React, { Fragment, useState, useEffect } from "react";
import { Input } from "./Input";
import { convertDateFormat } from "../../utils/convertDateFormat";
import { connect } from "react-redux";
import { setAlert as Alert } from "../../actions/alertAction";
import {
  clearAccountsMsg,
  setAccountsMsg
} from "./../../actions/accountsAction";

const Account = ({
  heading,
  netBalance,
  netHeading,
  component,
  seperator,
  func,
  range,
  data,
  asAt,
  accounts: {
    dataNotFound: { rangeCashData }
  },
  Alert
}) => {
  const [date, setDate] = useState({
    lRange: "",
    uRange: "",
    setAlert: {
      lRange: false,
      uRange: false
    }
  });

  useEffect(() => {
    if (rangeCashData) {
      Alert("No data found for the given range", "info");
    }

    // eslint-disable-next-line
  }, [rangeCashData]);

  const [loading, setLoading] = useState(false);

  const { lRange, uRange, setAlert } = date;
  const onChange = e => {
    setDate({ ...date, [e.target.name]: e.target.value });
  };
  const onClick = async e => {
    if (lRange === "") {
      setDate({ ...date, setAlert: { ...setAlert, lRange: true } });
    } else if (uRange === "") {
      setDate({ ...date, setAlert: { ...setAlert, uRange: true } });
    } else if (new Date(lRange) > new Date(uRange)) {
      Alert("Lower range is greater than upper range", "danger");
    } else {
      setLoading(true);
      await func(convertDateFormat(lRange), convertDateFormat(uRange));

      setLoading(false);
    }
  };

  return (
    <Fragment>
      {seperator && <div className="seperator mt-5"></div>}
      <div className="account">
        <div className="account-header">
          <div className="icon-div">
            <svg viewBox="0 0 24 24" className="icon">
              <g>
                <path d="M19.75 2H4.25C3.013 2 2 3.013 2 4.25v15.5C2 20.987 3.013 22 4.25 22h15.5c1.237 0 2.25-1.013 2.25-2.25V4.25C22 3.013 20.987 2 19.75 2zM11 16.75H7c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h4c.414 0 .75.336.75.75s-.336.75-.75.75zm6-4H7c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h10c.414 0 .75.336.75.75s-.336.75-.75.75zm0-4H7c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h10c.414 0 .75.336.75.75s-.336.75-.75.75z"></path>
              </g>
            </svg>
          </div>
          <div className="heading-div">
            <div className="heading">
              {heading}
              {asAt && <span className="asAt ml-2">As at {asAt}</span>}
            </div>

            <div className="net-balance">
              {netHeading}:{" "}
              <span className="badge badge-dark">{`\u20B9${netBalance}`}</span>
            </div>
          </div>
        </div>
        {range && (
          <div className="date-range">
            <div className="inputFields">
              <div className="l-range">
                <Input
                  name="lRange"
                  label="Lower Range"
                  type="date"
                  value={lRange}
                  min="0"
                  onChange={onChange}
                  alert={setAlert.lRange}
                  alertMsg="Specify Lower Range"
                />
              </div>
              <div className="date-seperator"></div>
              <div className="u-range">
                <Input
                  name="uRange"
                  label="Upper Range"
                  type="date"
                  value={uRange}
                  min="0"
                  onChange={onChange}
                  alert={setAlert.uRange}
                  alertMsg="Specify Upper Range"
                />
              </div>
            </div>
            <div className="date-seperator"></div>
            <div className="range-button">
              <button
                type="button"
                className="button transparent-button submit-button"
                onClick={onClick}
              >
                Get Data
              </button>
            </div>
          </div>
        )}
        {range ? (
          [
            <div key={Math.random()} className="component-loading">
              {data.length > 0 ? (
                <div className="account-content">{component}</div>
              ) : loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                ""
              )}
            </div>
          ]
        ) : (
          <div className="account-content">{component}</div>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  accounts: state.accounts
});

export default connect(mapStateToProps, {
  clearAccountsMsg,
  setAccountsMsg,
  Alert
})(Account);
