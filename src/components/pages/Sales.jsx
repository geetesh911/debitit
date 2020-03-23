import React from "react";
import { Heading } from "./../common/Heading";
import { RouteSideNav } from "../common/RouteSideNav";
import { MobileAccordian } from "../common/MobileAccordian";
import EditProduct from "../purchase/EditProduct";
import DeleteProduct from "../purchase/DeleteProduct";
import PurchaseReturn from "./../purchase/PurchaseReturn";
import ProductDetails from "../purchase/ProductDetails";
import AddCustomer from "../sales/AddCustomer";
import EditCustomer from "../sales/EditCustomer";
import DeleteCustomer from "../sales/DeleteCustomer";
import AddSales from "../sales/AddSales";

export const Sales = () => {
  return (
    <div className="offset-lg-2 col-lg-10 offset-md-2 col-md-10 offset-sm-2 col-sm-10 content">
      <Heading heading="Sales" />
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
                  heading: "Products",
                  seperator: true,
                  arr: [
                    {
                      heading: "Product Details",
                      body: <ProductDetails />,
                      name: "product_details"
                    },
                    {
                      heading: "Edit Product",
                      body: <EditProduct />,
                      name: "edit_product"
                    },
                    {
                      heading: "Delete Product",
                      body: <DeleteProduct />,
                      name: "delete_product"
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
                  heading: "Purcahse Return",
                  seperator: true,
                  arr: [
                    {
                      heading: "Purcahse Return",
                      body: <PurchaseReturn />,
                      name: "purchase_return"
                    }
                  ]
                }
              ]}
            />
            <RouteSideNav
              options={[
                {
                  heading: "Add Sale",
                  firstOption: { name: "sidetab-add-sale", label: "Add Sale" },
                  firstActive: true
                },

                {
                  heading: "Products",
                  seperator: true,
                  firstOption: {
                    name: "sidetab-product-details",
                    label: "Product Details"
                  },
                  otherOptions: [
                    {
                      name: "sidetab-edit-product",
                      label: "Edit Product"
                    },
                    {
                      name: "sidetab-delete-product",
                      label: "Delete Product"
                    }
                  ]
                },
                {
                  heading: "Customers",
                  seperator: true,
                  firstOption: {
                    name: "sidetab-new-customer",
                    label: "Add New Customer"
                  },
                  otherOptions: [
                    { name: "sidetab-edit-customer", label: "Edit Customer" },
                    {
                      name: "sidetab-delete-customer",
                      label: "Delete Customer"
                    }
                  ]
                },
                {
                  heading: "Purchase Return",
                  seperator: true,
                  firstOption: {
                    name: "sidetab-purchase-return",
                    label: "PurchaseReturn"
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
                  id="sidetab-product-details"
                  role="tabpanel"
                  aria-labelledby="product-details-tab"
                >
                  <ProductDetails />
                </div>
                <div
                  className="tab-pane fade show"
                  id="sidetab-edit-product"
                  role="tabpanel"
                  aria-labelledby="edit-product-tab"
                >
                  <EditProduct />
                </div>
                <div
                  className="tab-pane fade show"
                  id="sidetab-delete-product"
                  role="tabpanel"
                  aria-labelledby="delete-product-tab"
                >
                  <DeleteProduct />
                </div>
                <div
                  className="tab-pane fade show"
                  id="sidetab-purchase-return"
                  role="tabpanel"
                  aria-labelledby="purchase-return-tab"
                >
                  <PurchaseReturn />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
