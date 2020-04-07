import React, { useState, useEffect } from "react";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { connect } from "react-redux";
import { getCreditors } from "../../actions/purchaseAction";
import {
  addExistingAsset,
  getAssets,
  clearOthersMsg,
  clearOthersError
} from "../../actions/othersAction";
import { SaveButton } from "../common/SaveButton";
import { setAlert as Alert } from "./../../actions/alertAction";

const ExistingAsset = ({
  purchase: { creditors },
  others: { msg, error, assets },
  clearOthersMsg,
  clearOthersError,
  Alert,
  addExistingAsset,
  getAssets,
  getCreditors
}) => {
  const [formData, setFormData] = useState({
    assetId: "",
    payment: "",
    amount: "",
    otherExpenses: "0",
    creditorId: "",
    setAlert: {
      assetId: false,
      payment: false,
      creditorId: false,
      amount: false,
      otherExpenses: false
    },
    showCreditors: false
  });

  const [loading, setLoading] = useState(false);

  const {
    assetId,
    payment,
    amount,
    otherExpenses,
    creditorId,
    setAlert,
    showCreditors
  } = formData;

  useEffect(() => {
    getCreditors();
    getAssets();
    if (error === "Enough Cash is not available") {
      Alert(error, "danger");
      clearOthersError();
    }
    if (error === "Enough amount is not available in bank") {
      Alert(error, "danger");
      clearOthersError();
    }

    if (payment === "credit")
      setFormData({
        ...formData,
        showCreditors: true
        // creditorId: creditors[0]._id
      });
    if (payment === "cash" || payment === "bank") {
      setFormData({ ...formData, showCreditors: false, creditorId: "" });
    }
    if (msg) {
      Alert(msg, "info");
      clearOthersMsg();
      setFormData({
        ...formData,
        assetId: "",
        payment: "",
        amount: "",
        otherExpenses: "0",
        creditorId: "",
        setAlert: {
          assetId: false,
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

  const onAssetChange = (e, { value }) => {
    setFormData({ ...formData, assetId: value });
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
        await addExistingAsset(
          {
            otherExpenses: parseInt(otherExpenses),
            creditorId,
            payment,
            amount: parseInt(amount)
          },
          assetId
        );
      } else {
        await addExistingAsset(
          {
            amount: parseInt(amount),
            payment,
            otherExpenses: parseInt(otherExpenses)
          },
          assetId
        );
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

  const assetsOptions = () => {
    let options = [];
    assets.forEach(asset => {
      let option = {};
      option.key = asset.name;
      option.value = asset._id;
      option.text = asset.name;

      options.push(option);
    });
    return options;
  };

  return (
    <div className="others-new-content">
      <div className="heading">Add existing asset</div>
      <div className="others-form">
        <form onSubmit={onSubmit}>
          <Select
            label="Asset*"
            options={assetsOptions()}
            id="assetId"
            value={assetId}
            first={true}
            alert={setAlert.assetId}
            alertMsg="Choose an Asset"
            onChange={onAssetChange}
          />
          <Select
            label="Payment Method"
            options={[
              { key: "cash", value: "cash", text: "cash" },
              { key: "bank", value: "bank", text: "bank" },
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
  addExistingAsset,
  getAssets,
  Alert,
  clearOthersMsg,
  clearOthersError
})(ExistingAsset);
