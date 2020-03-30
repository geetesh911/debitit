import React, { Fragment, useEffect, useState } from "react";
import { Heading } from "../common/Heading";
import { connect } from "react-redux";
import {
  getCreditors,
  filterCreditors,
  clearFilterCreditors
} from "../../actions/purchaseAction";
import {
  getCustomers,
  filterCustomer,
  clearFilterCustomer
} from "../../actions/salesAction";
import { loadUser } from "./../../actions/authAction";
// import { Link } from "react-router-dom";
import { StatsAccordian } from "../common/StatsAccordian";

const Accounts = ({
  auth: { user },
  sales: {
    customers,
    filtered: { customer }
  },
  purchase: {
    creditors,
    filtered: { creditor }
  },
  loadUser,
  getCreditors,
  filterCreditors,
  clearFilterCreditors,
  filterCustomer,
  clearFilterCustomer,
  getCustomers
}) => {
  const [customerSearch, setCustomerSearch] = useState("");
  const [creditorSearch, setCreditorSearch] = useState("");

  useEffect(() => {
    loadUser();
    getCustomers();
    getCreditors();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (customerSearch !== "") {
      filterCustomer(customerSearch);
    } else clearFilterCustomer();

    // eslint-disable-next-line
  }, [customerSearch]);
  useEffect(() => {
    if (creditorSearch !== "") {
      filterCreditors(creditorSearch);
    } else clearFilterCreditors();

    // eslint-disable-next-line
  }, [creditorSearch]);

  let receive = 0;
  let pay = 0;

  const onCustomerChange = e => {
    setCustomerSearch(e.target.value);
  };
  const onCreditorChange = e => {
    setCreditorSearch(e.target.value);
  };

  customers &&
    customers.length > 0 &&
    customers.forEach(customer => (receive += customer.due));

  creditors &&
    creditors.length > 0 &&
    creditors.forEach(creditor => (pay += creditor.due));

  return (
    <Fragment>
      <div className="offset-lg-2 col-lg-10 offset-md-2 col-md-10 offset-sm-2 col-sm-10 content">
        <Heading heading="Accounts" icon={user ? user.icon : ""} />
        <div className="accounts">
          <div className="stats">
            <div className="customer">
              <StatsAccordian
                name="customer"
                label={`You'll Receive \u20B9${receive}`}
                data={customer ? customer : customers}
                search={customerSearch}
                filterFunction={filterCustomer}
                clearFilterFunction={clearFilterCustomer}
                filtered={customer ? customer : customers}
                searchState={customerSearch}
                onChange={onCustomerChange}
              />
            </div>
            <div className="stats-seperator"></div>
            <div className="creditor">
              <StatsAccordian
                name="creditor"
                label={`You'll Pay \u20B9${pay}`}
                data={creditor ? creditor : creditors}
                filterFunction={filterCreditors}
                clearFilterFunction={clearFilterCreditors}
                filtered={creditor ? creditor : creditors}
                searchState={creditorSearch}
                onChange={onCreditorChange}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  purchase: state.transaction.purchase,
  sales: state.transaction.sales
});

export default connect(mapStateToProps, {
  loadUser,
  filterCustomer,
  clearFilterCustomer,
  filterCreditors,
  clearFilterCreditors,
  getCreditors,
  getCustomers
})(Accounts);
