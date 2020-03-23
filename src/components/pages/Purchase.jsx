import React from "react";
import { Heading } from "./../common/Heading";
import { RouteSideNav } from "../common/RouteSideNav";
import PurchaseNewProduct from "../purchase/PurchaseNewProduct";
import PurchaseExistingProduct from "../purchase/PurchaseExistingProduct";
import { MobileAccordian } from "../common/MobileAccordian";
import AddCreditor from "./../purchase/AddCreditor";
import EditCreditor from "../purchase/EditCreditor";
import DeleteCreditor from "../purchase/DeleteCreditor";
import EditProduct from "../purchase/EditProduct";
import DeleteProduct from "../purchase/DeleteProduct";
import PurchaseReturn from "./../purchase/PurchaseReturn";
import ProductDetails from "../purchase/ProductDetails";

export const Purchase = () => {
  return (
    <div className="offset-lg-2 col-lg-10 offset-md-2 col-md-10 offset-sm-2 col-sm-10 content">
      <Heading heading="Purchase" />
      <div className="purchase">
        <div className="row nav-row">
          <div className="col-lg-4 col-md-4 col-sm-12 side-nav-col">
            <MobileAccordian
              options={[
                {
                  heading: "Add Purchase",
                  arr: [
                    {
                      heading: "New Product",
                      body: <PurchaseNewProduct />,
                      name: "new"
                    },
                    {
                      heading: "Existing Product",
                      body: <PurchaseExistingProduct />,
                      name: "existing"
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
                  heading: "Creditors",
                  seperator: true,
                  arr: [
                    {
                      heading: "Add a Creditor",
                      body: <AddCreditor />,
                      name: "new_creditor"
                    },
                    {
                      heading: "Edit Creditor",
                      body: <EditCreditor />,
                      name: "edit_creditor"
                    },
                    {
                      heading: "Delete Creditor",
                      body: <DeleteCreditor />,
                      name: "delete_creditor"
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
                  heading: "Add Purchase",
                  firstOption: { name: "sidetab-new", label: "New Product" },
                  otherOptions: [
                    { name: "sidetab-existing", label: "Existing Product" }
                  ],
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
                  heading: "Creditors",
                  seperator: true,
                  firstOption: {
                    name: "sidetab-new-creditor",
                    label: "Add New Creditor"
                  },
                  otherOptions: [
                    { name: "sidetab-edit-creditor", label: "Edit Creditor" },
                    {
                      name: "sidetab-delete-creditor",
                      label: "Delete Creditor"
                    }
                  ]
                },
                {
                  heading: "Purchase Return",
                  seperator: true,
                  firstOption: {
                    name: "sidetab-purchase-return",
                    label: "Purchase Return"
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
                  id="sidetab-new"
                  role="tabpanel"
                  aria-labelledby="new-tab"
                >
                  <PurchaseNewProduct />
                </div>
                <div
                  className="tab-pane fade"
                  id="sidetab-existing"
                  role="tabpanel"
                  aria-labelledby="existing-tab"
                >
                  <PurchaseExistingProduct />
                </div>
                <div
                  className="tab-pane fade show"
                  id="sidetab-new-creditor"
                  role="tabpanel"
                  aria-labelledby="new-creditor-tab"
                >
                  <AddCreditor />
                </div>
                <div
                  className="tab-pane fade show"
                  id="sidetab-edit-creditor"
                  role="tabpanel"
                  aria-labelledby="edit-creditor-tab"
                >
                  <EditCreditor />
                </div>
                <div
                  className="tab-pane fade show"
                  id="sidetab-delete-creditor"
                  role="tabpanel"
                  aria-labelledby="delete-creditor-tab"
                >
                  <DeleteCreditor />
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
