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
                  heading: "Other Expenses",
                  arr: [
                    {
                      heading: "Add Expenses",
                      body: <AddExpense />,
                      name: "add_expenses"
                    }
                  ]
                },
                {
                  seperator: true,
                  heading: "Expense Category",
                  arr: [
                    {
                      heading: "Add Expense Category",
                      body: <AddExpenseCategory />,
                      name: "add_expense_category"
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
                  heading: "Other Expenses",
                  firstOption: {
                    name: "sidetab-add-expenses",
                    label: "Add Expenses"
                  },
                  firstActive: true
                },
                {
                  heading: "Expense Category",
                  seperator: true,
                  firstOption: {
                    name: "sidetab-add-expense-category",
                    label: "Add Expense Category"
                  },
                  otherOptions: [
                    {
                      name: "sidetab-edit-expense-category",
                      label: "Edit Expense Category"
                    },
                    {
                      name: "sidetab-delete-expense-category",
                      label: "Delete Expense Category"
                    }
                  ]
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
                  id="sidetab-add-expense-category"
                  role="tabpanel"
                  aria-labelledby="add-expense-category-tab"
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
