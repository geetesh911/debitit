import React, { useState, useEffect, Fragment } from "react";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import {
  getCreditor,
  gavePayment,
  clearErrors
} from "../../actions/purchaseAction";
import { Select } from "../common/Select";
import { clearMsg } from "./../../actions/salesAction";
import { setAlert as Alert } from "../../actions/alertAction";

const GavePayment = ({
  purchase: { creditors, error },
  msg,
  clearMsg,
  clearErrors,
  Alert,
  getCreditor,
  gavePayment
}) => {
  const [formData, setFormData] = useState({
    amount: "",
    payment: "",
    creditorId: "",
    setAlert: {
      creditorId: false,
      payment: false,
      amount: false
    }
  });
  const { amount, payment, creditorId, setAlert } = formData;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (creditorId) {
      getCreditor(creditorId);
    }
    if (error === "Enough Cash is not available") {
      Alert(error, "danger");
      clearErrors();
    }
    if (error === "Enough amount is not available in bank") {
      Alert(error, "danger");
      clearErrors();
    }
    if (msg) {
      Alert(msg, "info");
      clearMsg();
      setFormData({
        ...formData,
        creditorId: "",
        amount: "",
        payment: "",
        setAlert: { name: false, payment: false, amount: false }
      });
    }

    //eslint-disable-next-line
  }, [creditorId, error, msg]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCreditorsChange = (e, { value }) => {
    setFormData({ ...formData, creditorId: value });
  };

  const onPaymentChange = (e, { value }) => {
    setFormData({
      ...formData,
      payment: value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (creditorId === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, creditorId: true } });
    } else if (amount === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, amount: true } });
    } else if (payment === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, payment: true } });
    } else {
      setLoading(true);
      await gavePayment({ amount, creditorId, payment }, creditorId);

      setLoading(false);
    }
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
      <div className="heading">Gave Payment</div>
      <div className="purchase-form">
        <form onSubmit={onSubmit}>
          {creditors && (
            <Select
              label="Creditor*"
              options={creditorsOptions()}
              id="creditorId"
              value={creditorId}
              first={true}
              alert={setAlert.creditorId}
              alertMsg="Choose a creditor"
              onChange={onCreditorsChange}
            />
          )}
          {creditorId && (
            <Fragment>
              <Select
                label="Payment Method"
                options={[
                  { key: "cash", value: "cash", text: "cash" },
                  { key: "bank", value: "bank", text: "bank" }
                ]}
                id="payment"
                value={payment}
                onChange={onPaymentChange}
              />
              <Input
                name="amount"
                label="Amount*"
                value={amount}
                onChange={onChange}
                alert={setAlert.amount}
                alertMsg="Amount is required"
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
  msg: state.transaction.msg
});

export default connect(mapStateToProps, {
  getCreditor,
  gavePayment,
  Alert,
  clearMsg,
  clearErrors
})(GavePayment);
