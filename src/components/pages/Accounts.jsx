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
import { getAssets, getDrawings } from "./../../actions/othersAction";
import {
  getCashData,
  getRangeCashData,
  getBankData,
  getRangeBankData
} from "./../../actions/accountsAction";
import { StatsAccordian } from "../common/StatsAccordian";
import { CashBook } from "../Accounts/CashBook";
import Account from "./../common/Account";
import { TrialBalance } from "./../Accounts/TrialBalance";
import { getNetCash } from "./../../utils/getNetCash";

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
  accounts: { cash, rangeCash, bank, rangeBank },
  others: { assets, drawings },
  loadUser,
  getCreditors,
  filterCreditors,
  clearFilterCreditors,
  filterCustomer,
  clearFilterCustomer,
  getCustomers,
  getCashData,
  getBankData,
  getAssets,
  getRangeBankData,
  getRangeCashData,
  getDrawings
}) => {
  const [customerSearch, setCustomerSearch] = useState("");
  const [creditorSearch, setCreditorSearch] = useState("");

  useEffect(() => {
    loadUser();
    getCustomers();
    getCreditors();
    getCashData();
    getBankData();
    getAssets();
    getDrawings();

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

  const netRangeCash = getNetCash(rangeCash);
  const netRangeBank = getNetCash(rangeBank);
  const netCash = getNetCash(cash);
  const netBank = getNetCash(bank);

  let asset = [];
  assets.length > 0 &&
    assets.map(a => {
      let arr = {};
      arr.name = a.name;
      arr.type = "dr";
      arr.amount = a.amount;

      return asset.push(arr);
    });

  let drawingsAmount = 0;
  drawings.length > 0 && drawings.forEach(d => (drawingsAmount += d.amount));

  const trialBalanceData = [
    { name: "Cash", type: "dr", amount: netCash },
    { name: "Bank", type: "dr", amount: netBank },
    { name: "Debtors", type: "dr", amount: receive },
    { name: "Creditors", type: "cr", amount: pay },
    { name: "Drawings", type: "dr", amount: drawingsAmount }
  ];

  assets.length > 0 && asset.forEach(a => trialBalanceData.push(a));

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

          <Account
            heading="Cash A/c"
            seperator={true}
            netBalance={netRangeCash}
            range={true}
            func={getRangeCashData}
            netHeading="Net Balance"
            data={rangeCash}
            component={<CashBook cash={rangeCash} balance={netRangeCash} />}
          />
          <Account
            heading="Bank A/c"
            seperator={true}
            netBalance={netRangeBank}
            range={true}
            func={getRangeBankData}
            netHeading="Net Balance"
            data={rangeBank}
            component={<CashBook cash={rangeBank} balance={netRangeBank} />}
          />
          <Account
            heading="Trial Balance"
            asAt={`31/03/${new Date().getFullYear()}`}
            netBalance={netCash}
            netHeading="Total"
            component={<TrialBalance data={trialBalanceData} />}
          />
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  purchase: state.transaction.purchase,
  sales: state.transaction.sales,
  accounts: state.accounts,
  others: state.others
});

export default connect(mapStateToProps, {
  loadUser,
  filterCustomer,
  clearFilterCustomer,
  filterCreditors,
  clearFilterCreditors,
  getCreditors,
  getCustomers,
  getCashData,
  getRangeCashData,
  getBankData,
  getRangeBankData,
  getAssets,
  getDrawings
})(Accounts);
