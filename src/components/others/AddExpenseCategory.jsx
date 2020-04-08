import React, { useState, useEffect } from "react";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import {
  addExpenseCategories,
  clearOthersMsg,
  clearOthersError
} from "../../actions/othersAction";
import { setAlert as Alert } from "./../../actions/alertAction";
import { Select } from "./../common/Select";

const AddExpenseCategory = ({
  addExpenseCategories,
  clearOthersError,
  clearOthersMsg,
  Alert,
  others: { msg, error }
}) => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    payment: "",
    setAlert: {
      name: false,
      payment: false,
      amount: false
    }
  });

  const [loading, setLoading] = useState(false);

  const { name, amount, payment, setAlert } = formData;

  useEffect(() => {
    if (msg) {
      Alert(msg, "info");
      clearOthersMsg();
      setFormData({
        ...formData,
        name: "",
        amount: "",
        payment: "",
        setAlert: { name: false, amount: false, payment: false }
      });
    }

    if (error === "Enough Cash is not available") {
      Alert(error, "danger");
      clearOthersError();
    }
    if (error === "Enough amount is not available in bank") {
      Alert(error, "danger");
      clearOthersError();
    }

    // eslint-disable-next-line
  }, [msg, error]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    await addExpenseCategories({
      name,
      amount,
      payment
    });

    setLoading(false);
  };

  const onPaymentChange = (e, { value }) => {
    setFormData({ ...formData, payment: value });
  };

  return (
    <div className="sales-new-content">
      <div className="heading">Add New Expense</div>
      <div className="sales-form">
        <form onSubmit={onSubmit}>
          <Input
            name="name"
            label="Expense Name*"
            value={name}
            onChange={onChange}
            alert={setAlert.name}
            alertMsg="Expense name is required"
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
          <Input
            name="amount"
            label="Amount*"
            value={amount}
            onChange={onChange}
            type="number"
            min="1"
            alert={setAlert.amount}
            alertMsg="Amount is required"
          />
          <SaveButton label="Add" loading={loading} />
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  others: state.others,
  msg: state.transaction.msg
});

export default connect(mapStateToProps, {
  addExpenseCategories,
  clearOthersMsg,
  clearOthersError,
  Alert
})(AddExpenseCategory);
