import React, { useState, useEffect } from "react";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { connect } from "react-redux";
import { getCreditors } from "../../actions/purchaseAction";
import {
  addNewAsset,
  clearOthersMsg,
  clearOthersError
} from "../../actions/othersAction";
import { SaveButton } from "../common/SaveButton";
import { setAlert as Alert } from "./../../actions/alertAction";

const NewAsset = ({
  purchase: { creditors },
  others: { msg, error },
  clearOthersMsg,
  clearOthersError,
  Alert,
  addNewAsset,
  getCreditors
}) => {
  const [formData, setFormData] = useState({
    name: "",
    payment: "",
    amount: "",
    otherExpenses: "0",
    creditorId: "",
    setAlert: {
      name: false,
      payment: false,
      creditorId: false,
      amount: false,
      otherExpenses: false
    },
    showCreditors: false
  });

  const [loading, setLoading] = useState(false);

  const {
    name,
    payment,
    amount,
    otherExpenses,
    creditorId,
    setAlert,
    showCreditors
  } = formData;

  useEffect(() => {
    getCreditors();
    if (error === "Enough Cash is not available") {
      Alert(error, "danger");
      clearOthersError();
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
      clearOthersMsg();
      setFormData({
        ...formData,
        name: "",
        payment: "",
        amount: "",
        otherExpenses: "0",
        creditorId: "",
        setAlert: {
          name: false,
          payment: false,
          creditorId: false,
          amount: false,
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
        await addNewAsset({
          name,
          payment,
          otherExpenses: parseInt(otherExpenses),
          creditorId,
          amount: parseInt(amount)
        });
      } else {
        await addNewAsset({
          name,
          payment,
          amount: parseInt(amount),
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
    <div className="others-new-content">
      <div className="heading">Add new asset</div>
      <div className="others-form">
        <form onSubmit={onSubmit}>
          <Input
            name="name"
            label="Asset Name*"
            value={name}
            onChange={onChange}
            alert={setAlert.name}
            alertMsg="Asset name is required"
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
            name="amount"
            label="Amount*"
            type="number"
            value={amount}
            min="1"
            onChange={onChange}
            alert={setAlert.amount}
            alertMsg="Amount is required"
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
  others: state.others
});

export default connect(mapStateToProps, {
  getCreditors,
  addNewAsset,
  Alert,
  clearOthersMsg,
  clearOthersError
})(NewAsset);
