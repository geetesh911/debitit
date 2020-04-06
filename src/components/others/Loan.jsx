import React, { useState, useEffect } from "react";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { connect } from "react-redux";
import {
  addLoan,
  clearOthersMsg,
  clearOthersError
} from "../../actions/othersAction";
import { SaveButton } from "../common/SaveButton";
import { setAlert as Alert } from "./../../actions/alertAction";

const Loan = ({
  others: { msg, error },
  clearOthersMsg,
  clearOthersError,
  Alert,
  addLoan
}) => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    payment: "",
    interestRate: "",
    time: "",
    otherExpenses: "0",
    setAlert: {
      name: false,
      payment: false,
      interestRate: false,
      time: false,
      amount: false,
      otherExpenses: false
    }
  });

  const [loading, setLoading] = useState(false);

  const {
    name,
    amount,
    payment,
    interestRate,
    time,
    otherExpenses,
    setAlert
  } = formData;

  useEffect(() => {
    if (error === "Enough Cash is not available") {
      Alert(error, "danger");
      clearOthersError();
    }

    if (msg) {
      Alert(msg, "info");
      clearOthersMsg();
      setFormData({
        ...formData,
        name: "",
        payment: "",
        interestRate: "",
        time: "",
        amount: "",
        otherExpenses: "0",
        setAlert: {
          name: false,
          payment: false,
          interestRate: false,
          time: false,
          amount: false,
          otherExpenses: false
        }
      });
    }

    // eslint-disable-next-line
  }, [msg, error]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onPaymentChange = (e, { value }) => {
    setFormData({ ...formData, payment: value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    if (name === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, name: true } });
    } else if (payment === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, payment: true } });
    } else if (interestRate === "") {
      setFormData({
        ...formData,
        setAlert: { ...setAlert, interestRate: true }
      });
    } else if (time === "") {
      setFormData({
        ...formData,
        setAlert: { ...setAlert, time: true }
      });
    } else {
      await addLoan({
        name,
        payment,
        interestRate,
        time,
        amount: parseInt(amount),
        otherExpenses: parseInt(otherExpenses)
      });
    }

    setLoading(false);
  };

  return (
    <div className="others-new-content">
      <div className="heading">Add loan</div>
      <div className="others-form">
        <form onSubmit={onSubmit}>
          <Input
            name="name"
            label="Loan Source*"
            value={name}
            onChange={onChange}
            alert={setAlert.name}
            alertMsg="Loan source is required"
          />
          <Select
            label="Payment Method"
            options={[{ key: "cash", value: "cash", text: "cash" }]}
            id="payment"
            value={payment}
            alert={setAlert.payment}
            alertMsg="Choose a payment method"
            onChange={onPaymentChange}
          />
          <Input
            name="interestRate"
            label="Interest Rate*"
            type="number"
            value={interestRate}
            min="0"
            step="0.01"
            onChange={onChange}
            alert={setAlert.interestRate}
            alertMsg="Interest Rate is required"
          />
          <Input
            name="time"
            label="Time (in months)*"
            type="number"
            value={time}
            min="0"
            onChange={onChange}
            alert={setAlert.time}
            alertMsg="Time is required"
          />
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
  addLoan,
  Alert,
  clearOthersMsg,
  clearOthersError
})(Loan);
