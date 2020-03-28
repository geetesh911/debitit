import React, { useState, useEffect } from "react";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { connect } from "react-redux";
import {
  addNewPurchase,
  getCreditors,
  addNewProduct,
  clearErrors
} from "../../actions/purchaseAction";
import { SaveButton } from "../common/SaveButton";
import { clearMsg } from "./../../actions/salesAction";
import { setAlert as Alert } from "./../../actions/alertAction";

const PurchaseNewProduct = ({
  purchase: { creditors, error },
  msg,
  clearMsg,
  Alert,
  addNewPurchase,
  getCreditors
}) => {
  const [formData, setFormData] = useState({
    productName: "",
    payment: "",
    quantity: "",
    perPieceCost: "",
    perPieceSellingPrice: "",
    otherExpenses: "0",
    creditorId: "",
    setAlert: {
      productName: false,
      payment: false,
      creditorId: false,
      perPieceCost: false,
      perPieceSellingPrice: false,
      otherExpenses: false
    },
    showCreditors: false
  });

  const [loading, setLoading] = useState(false);

  const {
    productName,
    payment,
    quantity,
    perPieceCost,
    perPieceSellingPrice,
    otherExpenses,
    creditorId,
    setAlert,
    showCreditors
  } = formData;

  useEffect(() => {
    getCreditors();
    if (error === "Enough Cash is not available") {
      Alert(error, "danger");
      clearErrors();
    }

    if (payment === "credit")
      setFormData({
        ...formData,
        showCreditors: true
        // creditorId: creditors[0]._id
      });
    if (payment === "cash") {
      setFormData({ ...formData, showCreditors: false, creditorId: "" });
    }
    if (msg) {
      Alert(msg, "info");
      clearMsg();
      setFormData({
        ...formData,
        productName: "",
        payment: "",
        quantity: "",
        perPieceCost: "",
        perPieceSellingPrice: "",
        otherExpenses: "0",
        creditorId: "",
        setAlert: {
          productName: false,
          payment: false,
          creditorId: false,
          perPieceCost: false,
          perPieceSellingPrice: false,
          otherExpenses: false
        },
        showCreditors: false
      });
    }

    // eslint-disable-next-line
  }, [payment, msg, error]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onPaymentChange = (e, { value }) => {
    setFormData({ ...formData, payment: value });
  };

  const onCreditorChange = (e, { value }) => {
    setFormData({ ...formData, creditorId: value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    if (payment === "credit" && creditorId === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, creditorId: true } });
    } else if (payment === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, payment: true } });
    } else {
      if (creditorId.length > 0) {
        await addNewPurchase({
          productName,
          payment,
          quantity: parseInt(quantity),
          perPieceCost: parseInt(perPieceCost),
          otherExpenses: parseInt(otherExpenses),
          creditorId,
          newPur: true,
          perPieceSellingPrice: parseInt(perPieceSellingPrice)
        });
      } else {
        await addNewPurchase({
          productName,
          payment,
          quantity: parseInt(quantity),
          perPieceCost: parseInt(perPieceCost),
          newPur: true,
          perPieceSellingPrice: parseInt(perPieceSellingPrice),
          otherExpenses: parseInt(otherExpenses)
        });
      }
    }

    setLoading(false);
  };

  const creditorsOptions = () => {
    let options = [];
    creditors.forEach(creditor => {
      let option = {};
      option.key = creditor.name;
      option.value = creditor._id;
      option.text = creditor.name;

      options.push(option);
    });
    return options;
  };

  return (
    <div className="purchase-new-content">
      <div className="heading">Add new purchase</div>
      <div className="purchase-form">
        <form onSubmit={onSubmit}>
          <Input
            name="productName"
            label="Product Name*"
            value={productName}
            onChange={onChange}
            alert={setAlert.productName}
            alertMsg="Product name is required"
          />
          <Select
            label="Payment Method"
            options={[
              { key: "cash", value: "cash", text: "cash" },
              { key: "credit", value: "credit", text: "credit" }
            ]}
            id="payment"
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
            alert={setAlert.quantity}
            alertMsg="Quantity is required"
          />
          <Input
            name="perPieceCost"
            label="Per Piece Cost*"
            type="number"
            value={perPieceCost}
            min="1"
            onChange={onChange}
            alert={setAlert.perPieceCost}
            alertMsg="Cost Price is required"
          />
          <Input
            name="perPieceSellingPrice"
            label="Per Piece Selling Price*"
            type="number"
            value={perPieceSellingPrice}
            min="1"
            onChange={onChange}
            alert={setAlert.perPieceSellingPrice}
            alertMsg="Selling Price is required"
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
  addNewPurchase,
  getCreditors,
  addNewProduct,
  clearErrors,
  Alert,
  clearMsg
})(PurchaseNewProduct);
