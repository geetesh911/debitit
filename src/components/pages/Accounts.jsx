import React, { Fragment, useEffect } from "react";
import { Heading } from "../common/Heading";
import { connect } from "react-redux";
import { loadUser } from "./../../actions/authAction";

const Accounts = ({ auth: { user }, loadUser }) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
      <div className="offset-lg-2 col-lg-10 offset-md-2 col-md-10 offset-sm-2 col-sm-10 content">
        <Heading heading="Accounts" icon={user ? user.icon : ""} />
        <div className="accounts">Accounts</div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  loadUser
})(Accounts);
