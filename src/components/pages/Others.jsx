import React, { useEffect } from "react";
import { Heading } from "./../common/Heading";
import { RouteSideNav } from "../common/RouteSideNav";
import { MobileAccordian } from "../common/MobileAccordian";
import { logout, loadUser } from "../../actions/authAction";
import { clearTransactionState } from "./../../actions/salesAction";
import { connect } from "react-redux";
import AddExpenseCategory from "../others/AddExpenseCategory";
import EditExpenseCategory from "../others/EditExpenseCategory";
import DeleteExpenseCategory from "../others/DeleteExpenseCategory";
import AddExpense from "../others/AddExpense";
import Drawings from "../others/Drawings";
import NewAsset from "../others/NewAsset";
import ExistingAsset from "../others/ExistingAsset";
import Loan from "../others/Loan";
import LoanPayment from "../others/LoanPayment";

const Others = ({
  auth: { user },
  logout,
  clearTransactionState,
  loadUser
}) => {
  const handleLogOut = () => {
    logout();
    clearTransactionState();
  };

  useEffect(() => {
    loadUser();

    // eslint-disable-next-line
  }, []);
  return (
    <div className="offset-lg-2 col-lg-10 offset-md-2 col-md-10 offset-sm-2 col-sm-10 content">
      <Heading heading="Others" icon={user ? user.icon : ""} />
      <div className="others">
        <div className="row nav-row">
          <div className="col-lg-4 col-md-4 col-sm-12 side-nav-col">
            <MobileAccordian
              options={[
                {
                  heading: "Expenses",
                  arr: [
                    {
                      heading: "Add Existing Expense",
                      body: <AddExpense />,
                      name: "add_expenses"
                    },
                    {
                      heading: "Add New Expense",
                      body: <AddExpenseCategory />,
                      name: "add_new_expense"
                    },
                    {
                      heading: "Edit Expense Category",
                      body: <EditExpenseCategory />,
                      name: "edit_expense_category"
                    },
                    {
                      heading: "Delete Expense Category",
                      body: <DeleteExpenseCategory />,
                      name: "delete_expense_category"
                    }
                  ]
                },
                {
                  heading: "Assets",
                  seperator: true,
                  arr: [
                    {
                      heading: "Add New Asset",
                      body: <NewAsset />,
                      name: "new_asset"
                    },
                    {
                      heading: "Add Existing Asset",
                      body: <ExistingAsset />,
                      name: "existing_asset"
                    }
                  ]
                },
                {
                  heading: "Liabilities",
                  seperator: true,
                  arr: [
                    {
                      heading: "Add Loan",
                      body: <Loan />,
                      name: "add_loan"
                    },
                    {
                      heading: "Pay Loan",
                      body: <LoanPayment />,
                      name: "pay_loan"
                    }
                  ]
                },
                {
                  heading: "Others",
                  seperator: true,
                  arr: [
                    {
                      heading: "Drawings",
                      body: <Drawings />,
                      name: "drawings"
                    }
                  ]
                },
                {
                  seperator: true,
                  other: [
                    {
                      heading: "Logout",
                      name: "logout",
                      onClick: handleLogOut
                    }
                  ]
                }
              ]}
            />
            <RouteSideNav
              options={[
                {
                  heading: "Expenses",
                  firstOption: {
                    name: "sidetab-add-expenses",
                    label: "Add Existing Expenses"
                  },
                  otherOptions: [
                    {
                      name: "sidetab-add-new-expense",
                      label: "Add New Expense"
                    },
                    {
                      name: "sidetab-edit-expense-category",
                      label: "Edit Expense Category"
                    },
                    {
                      name: "sidetab-delete-expense-category",
                      label: "Delete Expense Category"
                    }
                  ],
                  firstActive: true
                },
                {
                  heading: "Assets",
                  seperator: true,
                  firstOption: {
                    name: "sidetab-new-asset",
                    label: "Add New Asset"
                  },
                  otherOptions: [
                    {
                      name: "sidetab-existing-asset",
                      label: "Add Existing Asset"
                    }
                  ]
                },
                {
                  heading: "Liabilities",
                  seperator: true,
                  firstOption: {
                    name: "sidetab-add-loan",
                    label: "Add Loan"
                  },
                  otherOptions: [
                    {
                      name: "sidetab-pay-loan",
                      label: "Pay Loan"
                    }
                  ]
                },
                {
                  heading: "Others",
                  seperator: true,
                  firstOption: {
                    name: "sidetab-drawings",
                    label: "Drawings"
                  }
                },
                {
                  seperator: true,
                  other: {
                    name: "sidetab-logout",
                    label: "Logout",
                    onClick: handleLogOut
                  }
                }
              ]}
            />
          </div>
          <div className="col-lg-8 col-md-8 col-sm-12 side-content-col">
            <div className="side-content">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="sidetab-add-expenses"
                  role="tabpanel"
                  aria-labelledby="add-expenses-tab"
                >
                  <AddExpense />
                </div>
                <div
                  className="tab-pane fade"
                  id="sidetab-add-new-expense"
                  role="tabpanel"
                  aria-labelledby="add-new-expense-tab"
                >
                  <AddExpenseCategory />
                </div>
                <div
                  className="tab-pane fade"
                  id="sidetab-edit-expense-category"
                  role="tabpanel"
                  aria-labelledby="edit-expense-category-tab"
                >
                  <EditExpenseCategory />
                </div>
                <div
                  className="tab-pane fade"
                  id="sidetab-delete-expense-category"
                  role="tabpanel"
                  aria-labelledby="delete-expense-category-tab"
                >
                  <DeleteExpenseCategory />
                </div>
                <div
                  className="tab-pane fade"
                  id="sidetab-new-asset"
                  role="tabpanel"
                  aria-labelledby="new-asset-tab"
                >
                  <NewAsset />
                </div>
                <div
                  className="tab-pane fade"
                  id="sidetab-existing-asset"
                  role="tabpanel"
                  aria-labelledby="existing-asset-tab"
                >
                  <ExistingAsset />
                </div>
                <div
                  className="tab-pane fade"
                  id="sidetab-add-loan"
                  role="tabpanel"
                  aria-labelledby="add-loan-tab"
                >
                  <Loan />
                </div>
                <div
                  className="tab-pane fade"
                  id="sidetab-pay-loan"
                  role="tabpanel"
                  aria-labelledby="pay-loan-tab"
                >
                  <LoanPayment />
                </div>
                <div
                  className="tab-pane fade"
                  id="sidetab-drawings"
                  role="tabpanel"
                  aria-labelledby="drawings-tab"
                >
                  <Drawings />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  logout,
  clearTransactionState,
  loadUser
})(Others);
