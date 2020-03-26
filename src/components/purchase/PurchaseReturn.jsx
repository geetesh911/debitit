import React, { useState, useEffect, Fragment } from "react";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import {
  getPurchases,
  getPurchaseUsingProduct,
  addPurchaseReturn
} from "../../actions/purchaseAction";
import { setAlert as Alert } from "./../../actions/alertAction";
import { clearErrors } from "./../../actions/purchaseAction";
import convertDate from "./../../utils/convertDate";
import { clearMsg } from "./../../actions/salesAction";

const PurchaseReturn = ({
  purchase: { products, purchaseUsingProduct, error },
  msg,
  clearMsg,
  getPurchases,
  getPurchaseUsingProduct,
  addPurchaseReturn,
  Alert,
  clearErrors
}) => {
  const [formData, setFormData] = useState({
    perPieceCost: "",
    productId: "",
    purchaseId: "",
    quantity: "",
    setAlert: {
      productId: { alert: false, msg: "" },
      purchaseId: false,
      productName: false,
      perPieceCost: false
    }
  });
  const { perPieceCost, productId, purchaseId, quantity, setAlert } = formData;

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
            setAlert: { ...setAlert, productId: { alert: false, msg: "" } }
          });
          if (productId && purchaseId) {
            // setFormData({ ...formData, purchaseId: "" });
            purchaseUsingProduct.filter(
              p =>
                p._id === purchaseId &&
                setFormData({
                  ...formData,
                  quantity: p.quantity
                })
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
      setFormData({
        ...formData,
        perPieceCost: "",
        perPieceSellingPrice: "",
        productId: "",
        purchaseId: "",
        setAlert: {
          productId: { alert: false, msg: "" },
          purchaseId: false,
          productName: false,
          perPieceCost: false
        }
      });
    }

    //eslint-disable-next-line
  }, [productId, purchaseId, error]);

  const onChange = e => {
    if (e.target.name === "perPieceCost") {
      setFormData({
        ...formData,
        perPieceCost: perPieceCost || ""
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onProductChange = (e, { value }) => {
    setFormData({
      ...formData,
      productId: value
    });
  };

  const onPurchaseChange = (e, { value }) => {
    setFormData({
      ...formData,
      purchaseId: value
    });
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

      setLoading(false);
    }
  };

  const inititalProductOptions = () => {
    let options = [];
    products.forEach(product => {
      let option = {};
      option.key = `${product.productName} - \u20B9 ${product.perPieceSellingPrice}`;
      option.value = product._id;
      option.text = `${product.productName} - \u20B9 ${product.perPieceSellingPrice}`;

      options.push(option);
    });
    return options;
  };

  const initialPurchaseOptions = () => {
    let options = [];
    // setFormData({ ...setFormData, purchaseId: "" });
    purchaseUsingProduct.forEach(purchase => {
      let option = {};
      option.key = `${purchase.creditor.name} - ${convertDate(
        purchase.date
      )}${Math.random()}`;
      option.value = purchase._id;
      option.text = `${purchase.creditor.name} - ${convertDate(purchase.date)}`;

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
            <Fragment>
              <Select
                label="Product*"
                options={inititalProductOptions()}
                id="productId"
                value={productId}
                first={true}
                alert={setAlert.productId.alert}
                alertMsg={setAlert.productId.msg}
                onChange={onProductChange}
              />
            </Fragment>
          )}
          {productId && purchaseUsingProduct.length > 0 && (
            <Fragment>
              <Select
                label="Purchase*"
                options={initialPurchaseOptions()}
                id="purchaseId"
                value={purchaseId}
                first={true}
                alert={setAlert.purchaseId}
                alertMsg="Choose a purchase"
                onChange={onPurchaseChange}
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
  msg: state.transaction.msg,
  alert: state.alert
});

export default connect(mapStateToProps, {
  getPurchases,
  getPurchaseUsingProduct,
  addPurchaseReturn,
  Alert,
  clearMsg,
  clearErrors
})(PurchaseReturn);
