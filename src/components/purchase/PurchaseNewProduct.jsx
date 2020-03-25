import React, { useState, useEffect } from "react";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { connect } from "react-redux";
import {
  addNewPurchase,
  getCreditors,
  addNewProduct
} from "../../actions/purchaseAction";
import { SaveButton } from "../common/SaveButton";
import { clearMsg } from "./../../actions/salesAction";
import { setAlert as Alert } from "./../../actions/alertAction";

const PurchaseNewProduct = ({
  purchase: { creditors },
  msg,
  clearMsg,
  Alert,
  addNewPurchase,
  getCreditors
}) => {
  const [formData, setFormData] = useState({
    productName: "",
    payment: "cash",
    quantity: "",
    perPieceCost: "",
    perPieceSellingPrice: "",
    otherExpenses: "0",
    creditorId: "",
    setAlert: {
      productName: false,
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
        payment: "cash",
        quantity: "",
        perPieceCost: "",
        perPieceSellingPrice: "",
        otherExpenses: "0",
        creditorId: "",
        setAlert: {
          productName: false,
          creditorId: false,
          perPieceCost: false,
          perPieceSellingPrice: false,
          otherExpenses: false
        },
        showCreditors: false
      });
    }

    // eslint-disable-next-line
  }, [payment, msg]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    if (payment === "credit" && creditorId === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, creditorId: true } });
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
      option.name = creditor.name;
      option.value = creditor._id;

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
            options={["cash", "credit"]}
            id="payment"
            value={payment}
            onChange={onChange}
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
              onChange={onChange}
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
  Alert,
  clearMsg
})(PurchaseNewProduct);
