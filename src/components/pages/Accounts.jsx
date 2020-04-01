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
import { StatsAccordian } from "../common/StatsAccordian";
import { getCashData } from "./../../actions/accountsAction";
import { CashBook } from "../Accounts/CashBook";

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
  accounts: { cash },
  loadUser,
  getCreditors,
  filterCreditors,
  clearFilterCreditors,
  filterCustomer,
  clearFilterCustomer,
  getCustomers,
  getCashData
}) => {
  const [customerSearch, setCustomerSearch] = useState("");
  const [creditorSearch, setCreditorSearch] = useState("");

  useEffect(() => {
    loadUser();
    getCustomers();
    getCreditors();
    getCashData();

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
                label={`You'll Receive`}
                netAmount={`\u20B9${receive}`}
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
                label={`You'll Pay`}
                netAmount={`\u20B9${pay}`}
                data={creditor ? creditor : creditors}
                filterFunction={filterCreditors}
                clearFilterFunction={clearFilterCreditors}
                filtered={creditor ? creditor : creditors}
                searchState={creditorSearch}
                onChange={onCreditorChange}
              />
            </div>
          </div>
          <CashBook cash={cash} />
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  purchase: state.transaction.purchase,
  sales: state.transaction.sales,
  accounts: state.accounts
});

export default connect(mapStateToProps, {
  loadUser,
  filterCustomer,
  clearFilterCustomer,
  filterCreditors,
  clearFilterCreditors,
  getCreditors,
  getCustomers,
  getCashData
})(Accounts);
