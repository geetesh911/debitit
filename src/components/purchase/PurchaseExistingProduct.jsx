import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getProducts,
  addExistingPurchase,
  clearErrors
} from "../../actions/purchaseAction";
import { Select } from "../common/Select";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { clearMsg } from "./../../actions/salesAction";
import { setAlert as Alert } from "./../../actions/alertAction";

const PurchaseExistingProduct = ({
  purchase: {
    products,
    creditors,
    error,
    filtered: { purchaseExistingProduct }
  },
  msg,
  clearMsg,
  Alert,
  getProducts,
  addExistingPurchase
}) => {
  const [formData, setFormData] = useState({
    payment: "",
    quantity: "",
    perPieceCost: "",
    perPieceSellingPrice: "",
    otherExpenses: "0",
    creditorId: "",
    product: "",
    setAlert: {
      product: false,
      creditorId: false,
      payment: false,
      perPieceCost: false,
      perPieceSellingPrice: false,
      otherExpenses: false
    },
    showCreditors: false
  });

  const [loading, setLoading] = useState(false);

  const {
    payment,
    quantity,
    perPieceCost,
    perPieceSellingPrice,
    creditorId,
    otherExpenses,
    product,
    setAlert,
    showCreditors
  } = formData;

  useEffect(() => {
    getProducts();
    if (error === "Enough Cash is not available") {
      Alert(error, "danger");
      clearErrors();
    }

    // eslint-disable-next-line
  }, [purchaseExistingProduct, error]);

  useEffect(() => {
    if (payment === "credit")
      setFormData({
        ...formData,
        showCreditors: true
        // creditorId: creditors[0]._id
      });
    if (payment === "cash") {
      setFormData({ ...formData, showCreditors: false, creditorId: "" });
    }
    // eslint-disable-next-line
  }, [payment]);

  useEffect(() => {
    if (msg) {
      Alert(msg, "info");
      clearMsg();
      setFormData({
        ...formData,
        payment: "",
        quantity: "",
        perPieceCost: "",
        perPieceSellingPrice: "",
        otherExpenses: "0",
        creditorId: "",
        product: "",
        setAlert: {
          product: false,
          creditorId: false,
          payment: false,
          perPieceCost: false,
          perPieceSellingPrice: false,
          otherExpenses: false
        },
        showCreditors: false
      });
    }
    // eslint-disable-next-line
  }, [msg]);

  const onChange = e => {
    if (
      e.target.name === "perPieceCost" ||
      e.target.name === "perPieceSellingPrice"
    ) {
      setFormData({
        ...formData,
        perPieceCost: perPieceCost || "",
        perPieceSellingPrice: perPieceSellingPrice || ""
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onPaymentChange = (e, { value }) => {
    setFormData({ ...formData, payment: value });
  };

  const onCreditorChange = (e, { value }) => {
    setFormData({ ...formData, creditorId: value });
  };

  const onProductChange = (e, { value }) => {
    const productData = value
      ? JSON.parse(value)
      : { perPieceCost: "", perPieceSellingPrice: "" };
    setFormData({
      ...formData,
      product: value,
      perPieceCost: productData.perPieceCost,
      perPieceSellingPrice: productData.perPieceSellingPrice
    });
  };
  const onSubmit = async e => {
    e.preventDefault();

    setLoading(true);
    if (product.length <= 0) {
      setFormData({ ...formData, setAlert: { ...setAlert, product: true } });
    } else if (payment === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, payment: true } });
    } else if (payment === "credit" && creditorId === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, creditorId: true } });
    } else {
      if (creditorId.length > 0) {
        await addExistingPurchase({
          productName: JSON.parse(product).productName,
          productId: JSON.parse(product)._id,
          payment,
          quantity: parseInt(quantity),
          perPieceCost: parseInt(perPieceCost),
          otherExpenses: parseInt(otherExpenses),
          creditorId,
          perPieceSellingPrice: parseInt(perPieceSellingPrice)
        });
      } else {
        await addExistingPurchase({
          productName: JSON.parse(product).productName,
          productId: JSON.parse(product)._id,
          payment,
          quantity: parseInt(quantity),
          perPieceCost: parseInt(perPieceCost),
          otherExpenses: parseInt(otherExpenses),
          perPieceSellingPrice: parseInt(perPieceSellingPrice)
        });
      }
    }
    setLoading(false);
  };

  const creditorsOptions = () => {
    let options = [];
    creditors.forEach(creditor => {
      let option = {};

      option.name = creditor.name;
      option.value = creditor._id;
      option.text = creditor.name;

      options.push(option);
    });
    return options;
  };

  const inititalProductOptions = () => {
    let options = [];
    products.forEach(product => {
      let option = {};
      option.key = `${product.productName} - \u20B9 ${product.perPieceSellingPrice}`;
      option.value = JSON.stringify(product);
      option.text = `${product.productName} - \u20B9 ${product.perPieceSellingPrice}`;

      options.push(option);
    });
    return options;
  };

  return (
    <div className="purchase-new-content">
      <div className="heading">Add a Purchase</div>
      <div className="purchase-form">
        <form onSubmit={onSubmit}>
          {products && (
            <Select
              label="Product*"
              options={inititalProductOptions()}
              id="product"
              value={product}
              placeholder="Select..."
              first={true}
              alert={setAlert.product}
              alertMsg="Choose a product"
              onChange={onProductChange}
            />
          )}
          <Select
            label="Payment Method"
            options={[
              { key: "cash", value: "cash", text: "cash" },
              { key: "credit", value: "credit", text: "credit" }
            ]}
            id="payment"
            placeholder="Select..."
            value={payment}
            alert={setAlert.payment}
            alertMsg="Choose a payment method"
            onChange={onPaymentChange}
          />
          {showCreditors && creditors && (
            <Select
              label="Creditor*"
              options={creditorsOptions()}
              id="creditorId"
              value={creditorId}
              first={true}
              placeholder="Select..."
              alert={setAlert.creditorId}
              alertMsg="Choose a creditor"
              onChange={onCreditorChange}
            />
          )}
          <Input
            name="quantity"
            label="Quantity*"
            type="number"
            value={quantity}
            min="1"
            onChange={onChange}
          />
          <Input
            name="perPieceCost"
            label="Per Piece Cost"
            type="number"
            value={perPieceCost}
            min="1"
            onChange={onChange}
            alert={setAlert.perPieceCost}
            alertMsg="Cost price is required"
          />
          <Input
            name="perPieceSellingPrice"
            label="Per Piece Selling Price"
            type="number"
            value={perPieceSellingPrice}
            min="1"
            onChange={onChange}
            alert={setAlert.perPieceSellingPrice}
            alertMsg="Selling price is required"
          />
          <Input
            name="otherExpenses"
            label="Other Expenses"
            type="number"
            value={otherExpenses}
            min="0"
            onChange={onChange}
          />
          <SaveButton label="Add" loading={loading} />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  purchase: state.transaction.purchase,
  msg: state.transaction.msg
});

export default connect(mapStateToProps, {
  addExistingPurchase,
  getProducts,
  clearMsg,
  clearErrors,
  Alert
})(PurchaseExistingProduct);
