import React, { useEffect, Fragment } from "react";
import { Heading } from "./../common/Heading";
import { RouteSideNav } from "../common/RouteSideNav";
import { MobileAccordian } from "../common/MobileAccordian";
import AddCustomer from "../sales/AddCustomer";
import EditCustomer from "../sales/EditCustomer";
import DeleteCustomer from "../sales/DeleteCustomer";
import AddSales from "../sales/AddSales";
import SalesReturn from "../sales/SalesReturn";
import { connect } from "react-redux";
import { loadUser } from "./../../actions/authAction";
import ReceivedPayment from "../sales/ReceivedPayment";
import { MainLoader } from "../common/MainLoader";

const Sales = ({ auth: { user }, loadUser }) => {
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);
  return (
    <div className="offset-lg-2 col-lg-10 offset-md-2 col-md-10 offset-sm-2 col-sm-10 content">
      {user ? (
        <Fragment>
          <Heading heading="Sales" icon={user ? user.icon : ""} />
          <div className="sales">
            <div className="row nav-row">
              <div className="col-lg-4 col-md-4 col-sm-12 side-nav-col">
                <MobileAccordian
                  options={[
                    {
                      heading: "Add Sale",
                      arr: [
                        {
                          heading: "Add Sale",
                          body: <AddSales />,
                          name: "add_sale"
                        }
                      ]
                    },
                    {
                      heading: "Customers",
                      seperator: true,
                      arr: [
                        {
                          heading: "Add a Customer",
                          body: <AddCustomer />,
                          name: "new_customer"
                        },
                        {
                          heading: "Received Payment",
                          body: <ReceivedPayment />,
                          name: "received_payment"
                        },
                        {
                          heading: "Edit Customer",
                          body: <EditCustomer />,
                          name: "edit_customer"
                        },
                        {
                          heading: "Delete Customer",
                          body: <DeleteCustomer />,
                          name: "delete_customer"
                        }
                      ]
                    },

                    {
                      heading: "Sales Return",
                      seperator: true,
                      arr: [
                        {
                          heading: "Sales Return",
                          body: <SalesReturn />,
                          name: "sales_return"
                        }
                      ]
                    }
                  ]}
                />
                <RouteSideNav
                  options={[
                    {
                      heading: "Add Sale",
                      firstOption: {
                        name: "sidetab-add-sale",
                        label: "Add Sale"
                      },
                      firstActive: true
                    },
                    {
                      heading: "Customers",
                      seperator: true,
                      firstOption: {
                        name: "sidetab-new-customer",
                        label: "Add New Customer"
                      },
                      otherOptions: [
                        {
                          name: "sidetab-received-payment",
                          label: "Received Payment"
                        },
                        {
                          name: "sidetab-edit-customer",
                          label: "Edit Customer"
                        },
                        {
                          name: "sidetab-delete-customer",
                          label: "Delete Customer"
                        }
                      ]
                    },
                    {
                      heading: "Sales Return",
                      seperator: true,
                      firstOption: {
                        name: "sidetab-sales-return",
                        label: "Sales Return"
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
                      id="sidetab-add-sale"
                      role="tabpanel"
                      aria-labelledby="add-sale-tab"
                    >
                      <AddSales />
                    </div>
                    <div
                      className="tab-pane fade show"
                      id="sidetab-new-customer"
                      role="tabpanel"
                      aria-labelledby="new-customer-tab"
                    >
                      <AddCustomer />
                    </div>
                    <div
                      className="tab-pane fade show"
                      id="sidetab-received-payment"
                      role="tabpanel"
                      aria-labelledby="received-payment-tab"
                    >
                      <ReceivedPayment />
                    </div>
                    <div
                      className="tab-pane fade show"
                      id="sidetab-edit-customer"
                      role="tabpanel"
                      aria-labelledby="edit-customer-tab"
                    >
                      <EditCustomer />
                    </div>
                    <div
                      className="tab-pane fade show"
                      id="sidetab-delete-customer"
                      role="tabpanel"
                      aria-labelledby="delete-customer-tab"
                    >
                      <DeleteCustomer />
                    </div>
                    <div
                      className="tab-pane fade show"
                      id="sidetab-sales-return"
                      role="tabpanel"
                      aria-labelledby="sales-return-tab"
                    >
                      <SalesReturn />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <MainLoader />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  loadUser
})(Sales);
