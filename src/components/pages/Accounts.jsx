import React, { Fragment, useEffect } from "react";
import { Heading } from "../common/Heading";
import { connect } from "react-redux";
import { loadUser } from "./../../actions/authAction";
import faker from "faker";
import _ from "lodash";
import { SelectMultiple } from "./../common/SelectMultiple";

const Accounts = ({ auth: { user }, loadUser }) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  const addressDefinitions = faker.definitions.address;
  const stateOptions = _.map(addressDefinitions.state, (state, index) => ({
    key: addressDefinitions.state_abbr[index],
    text: state,
    value: addressDefinitions.state_abbr[index]
  }));

  const onChange = (e, { value, name }) => {
    console.log(value);
  };

  return (
    <Fragment>
      <div className="offset-lg-2 col-lg-10 offset-md-2 col-md-10 offset-sm-2 col-sm-10 content">
        <Heading heading="Accounts" icon={user ? user.icon : ""} />
        <div className="accounts">
          <SelectMultiple
            label="Product"
            options={stateOptions}
            onChange={onChange}
          />
          {/* <Dropdown
            placeholder="Select Country"
            fluid
            search
            selection
            options={stateOptions}
            onChange={onChange}
          /> */}
        </div>
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
