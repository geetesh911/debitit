import React, { useState, useEffect, Fragment } from "react";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import {
  getPurchases,
  getPurchaseUsingProduct,
  addPurchaseReturn,
  filterPurcahseReturn,
  clearPurchaseReturnFilter
} from "../../actions/purchaseAction";
import { setAlert as Alert } from "./../../actions/alertAction";
import { clearErrors } from "./../../actions/purchaseAction";
import convertDate from "./../../utils/convertDate";

const PurchaseReturn = ({
  purchase: {
    products,
    purchaseUsingProduct,
    error,
    filtered: { purchaseReturn }
  },
  getPurchases,
  getPurchaseUsingProduct,
  addPurchaseReturn,
  filterPurcahseReturn,
  clearPurchaseReturnFilter,
  Alert,
  clearErrors
}) => {
  const [formData, setFormData] = useState({
    perPieceCost: "",
    productId: "",
    purchaseId: "",
    quantity: "",
    search: "",
    productOptions: null,
    disabled: false,
    setAlert: {
      productId: { alert: false, msg: "" },
      purchaseId: false,
      productName: false,
      perPieceCost: false
    }
  });
  const {
    perPieceCost,
    productId,
    purchaseId,
    quantity,
    search,
    productOptions,
    disabled,
    setAlert
  } = formData;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) {
      setFormData({ ...formData, quantity: "" });
      getPurchases();
      products.filter(async p => {
        if (p._id === productId) {
          setLoading(true);
          await getPurchaseUsingProduct(p.productName);
          setFormData({
            ...formData,
            productName: p.productName,
            perPieceCost: p.perPieceCost,
            quantity: "",
            // purchaseId: "",
            disabled: true,
            setAlert: { ...setAlert, productId: { alert: false, msg: "" } }
          });
          if (productId && purchaseId) {
            // setFormData({ ...formData, purchaseId: "" });
            purchaseUsingProduct.filter(
              p =>
                p._id === purchaseId &&
                setFormData({ ...formData, quantity: p.quantity })
            );
          }
          setLoading(false);
        }
      });
    } else {
      setFormData({
        ...formData,
        perPieceCost: "",
        perPieceSellingPrice: "",
        productId: "",
        purchaseId: "",
        quantity: "",
        disabled: false,
        setAlert: {
          productId: { alert: false, msg: "" },
          purchaseId: false,
          productName: false,
          perPieceCost: false
        }
      });
    }

    if (error === "Cannot return more than purchased") {
      Alert(error, "danger");
      clearErrors();
    }

    //eslint-disable-next-line
  }, [productId, purchaseId, error]);

  useEffect(() => {
    if (purchaseReturn) {
      let options = [];
      purchaseReturn.forEach(product => {
        let option = {};
        option.name = `${product.productName} - \u20B9 ${product.perPieceSellingPrice}`;
        option.value = product._id;

        options.push(option);
      });
      setFormData({ ...formData, productOptions: options });
    }
    if (!purchaseReturn) {
      setFormData({ ...formData, productOptions: null });
    }

    // eslint-disable-next-line
  }, [purchaseReturn]);

  const onChange = e => {
    if (e.target.name === "perPieceCost") {
      setFormData({
        ...formData,
        perPieceCost: perPieceCost || ""
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      if (e.target.name === "productId") {
        setFormData({ ...formData, productId: e.target.value, purchaseId: "" });
      }
      if (e.target.name === "search" && e.target.value !== "") {
        filterPurcahseReturn(e.target.value);
      } else clearPurchaseReturnFilter();
    }
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (productId === "") {
      setFormData({
        ...formData,
        setAlert: {
          ...setAlert,
          productId: { alert: true, msg: "Choose a product" }
        }
      });
    } else if (purchaseUsingProduct.length <= 0) {
      setFormData({
        ...formData,
        setAlert: {
          ...setAlert,
          productId: {
            alert: true,
            msg: "No credit purchase available with this product"
          }
        }
      });
    } else if (purchaseId === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, purchaseId: true } });
    } else {
      setLoading(true);
      await addPurchaseReturn({
        productId,
        purchaseId,
        quantity: parseInt(quantity),
        perPieceCost
      });
      setFormData({
        ...formData,
        perPieceCost: "",
        perPieceSellingPrice: "",
        productId: "",
        purchaseId: "",
        search: "",
        disabled: false,
        setAlert: {
          productId: { alert: false, msg: "" },
          purchaseId: false,
          productName: false,
          perPieceCost: false
        }
      });
      setLoading(false);
    }
  };

  const inititalProductOptions = () => {
    let options = [];
    products.forEach(product => {
      let option = {};
      option.name = `${product.productName} - \u20B9 ${product.perPieceSellingPrice}`;
      option.value = product._id;

      options.push(option);
    });
    return options;
  };

  const purchaseOptions = () => {
    let options = [];
    // setFormData({ ...setFormData, purchaseId: "" });
    purchaseUsingProduct.forEach(purchase => {
      let option = {};
      option.name = `${purchase.productName} => ${convertDate(purchase.date)}`;
      option.value = purchase._id;

      options.push(option);
    });
    return options;
  };

  return (
    <div className="purchase-new-content">
      <div className="heading">Return a Purchase</div>
      <div className="purchase-form">
        <form onSubmit={onSubmit}>
          {products && (
            <Input
              name="search"
              id="purchaseReturnSearch"
              label="Search Product"
              value={search}
              min="1"
              disabled={disabled}
              onChange={onChange}
              helperText="Filter products by name"
              required={false}
            />
          )}
          {products && (
            <Select
              label="Product*"
              options={
                productOptions ? productOptions : inititalProductOptions()
              }
              id="productId"
              value={productId}
              first={true}
              alert={setAlert.productId.alert}
              alertMsg={setAlert.productId.msg}
              onChange={onChange}
            />
          )}
          {productId && purchaseUsingProduct.length > 0 && (
            <Fragment>
              <Select
                label="Purchase*"
                options={purchaseOptions()}
                id="purchaseId"
                value={purchaseId}
                first={true}
                alert={setAlert.purchaseId}
                alertMsg="Choose a purchase"
                onChange={onChange}
              />
              {purchaseId && (
                <Input
                  name="quantity"
                  label="Quantity*"
                  value={quantity}
                  onChange={onChange}
                  type="number"
                  min="1"
                  alert={setAlert.quantity}
                  alertMsg="Quantity is required"
                />
              )}
              <Input
                name="perPieceCost"
                label="per Piece Cost"
                value={perPieceCost}
                onChange={onChange}
                type="number"
                min="1"
                alert={setAlert.perPieceCost}
                alertMsg="Cost price is required"
              />
            </Fragment>
          )}
          <SaveButton label="Save Changes" loading={loading} />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  purchase: state.transaction.purchase,
  alert: state.alert
});

export default connect(mapStateToProps, {
  getPurchases,
  getPurchaseUsingProduct,
  addPurchaseReturn,
  filterPurcahseReturn,
  clearPurchaseReturnFilter,
  Alert,
  clearErrors
})(PurchaseReturn);
