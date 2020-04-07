import React, { useState, useEffect, Fragment } from "react";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import {
  addExpense,
  getExpenseCategories,
  getExpenseCategory,
  clearOthersMsg,
  clearOthersError
} from "../../actions/othersAction";
import { setAlert as Alert } from "../../actions/alertAction";
import { Select } from "../common/Select";

const AddExpense = ({
  others: { categories, msg, error },
  Alert,
  addExpense,
  getExpenseCategory,
  getExpenseCategories,
  clearOthersMsg,
  clearOthersError
}) => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    payment: "",
    expenseId: "",
    disabled: false,
    setAlert: {
      expenseId: false,
      name: false,
      payment: false,
      amount: false
    }
  });
  const { name, payment, amount, expenseId, setAlert } = formData;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getExpenseCategories();

    if (error === "Enough Cash is not available") {
      Alert(error, "danger");
      clearOthersError();
    }
    if (error === "Enough amount is not available in bank") {
      Alert(error, "danger");
      clearOthersError();
    }

    if (msg) {
      Alert(msg, "info");
      clearOthersMsg();
      setFormData({
        ...formData,
        expenseId: "",
        name: "",
        amount: "",
        payment: "",
        setAlert: { name: false, payment: false, amount: false }
      });
    }

    //eslint-disable-next-line
  }, [error, msg]);

  useEffect(() => {
    if (expenseId) {
      getExpenseCategory(expenseId);
      categories.filter(
        c =>
          c._id === expenseId &&
          setFormData({
            ...formData,
            name: c.name
          })
      );
    } else {
      setFormData({ ...formData, disabled: false });
    }

    //eslint-disable-next-line
  }, [expenseId]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onExpenseChange = (e, { value }) => {
    setFormData({ ...formData, expenseId: value });
  };

  const onPaymentChange = (e, { value }) => {
    setFormData({ ...formData, payment: value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (expenseId === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, expenseId: true } });
    } else if (payment === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, payment: true } });
    } else {
      setLoading(true);
      await addExpense(
        {
          name,
          amount,
          payment
        },
        expenseId
      );

      setLoading(false);
    }
  };

  const expenseOptions = () => {
    let options = [];
    categories.forEach(category => {
      let option = {};
      option.key = `${category.name}`;
      option.value = category._id;
      option.text = `${category.name}`;

      options.push(option);
    });
    return options;
  };

  return (
    <div className="others-new-content">
      <div className="heading">Add an Expense</div>
      <div className="others-form">
        <form onSubmit={onSubmit}>
          {categories && (
            <Select
              label="Expense*"
              options={expenseOptions()}
              id="expenseId"
              value={expenseId}
              first={true}
              alert={setAlert.expenseId}
              alertMsg="Choose an Expense"
              onChange={onExpenseChange}
            />
          )}
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
          {expenseId && (
            <Fragment>
              <Input
                name="amount"
                label="Amount"
                value={amount}
                onChange={onChange}
                type="number"
                min="1"
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
  others: state.others
});

export default connect(mapStateToProps, {
  addExpense,
  getExpenseCategories,
  getExpenseCategory,
  clearOthersMsg,
  clearOthersError,
  Alert
})(AddExpense);
