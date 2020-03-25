import React, { useEffect } from "react";
import { Heading } from "./../common/Heading";
import { RouteSideNav } from "../common/RouteSideNav";
import { MobileAccordian } from "../common/MobileAccordian";
import AddSales from "../sales/AddSales";
import { logout, loadUser } from "../../actions/authAction";
import { clearTransactionState } from "./../../actions/salesAction";
import { connect } from "react-redux";

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
                      body: <AddSales />,
                      name: "add_expenses"
                    }
                  ]
                },
                {
                  // heading: "Other Expenses",
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
                  <AddSales />
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
