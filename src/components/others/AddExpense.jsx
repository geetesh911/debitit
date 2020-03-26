import React, { useState, useEffect, Fragment } from "react";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import {
  addExpense,
  getExpenseCategories,
  getExpenseCategory,
  clearOthersMsg
} from "../../actions/othersAction";
import { setAlert as Alert } from "../../actions/alertAction";
import { Select } from "../common/Select";

const AddExpense = ({
  others: { categories, msg },
  Alert,
  addExpense,
  getExpenseCategory,
  getExpenseCategories,
  clearOthersMsg
}) => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    expenseId: "",
    disabled: false,
    setAlert: {
      expenseId: false,
      name: false,
      amount: false
    }
  });
  const { name, amount, expenseId, setAlert } = formData;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getExpenseCategories();
    if (msg) {
      Alert(msg, "info");
      clearOthersMsg();
      setFormData({
        ...formData,
        expenseId: "",
        name: "",
        amount: "",
        setAlert: { name: false, amount: false }
      });
    }

    //eslint-disable-next-line
  }, [msg]);

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

  const onSubmit = async e => {
    e.preventDefault();

    if (expenseId === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, expenseId: true } });
    } else {
      setLoading(true);
      await addExpense(
        {
          name,
          amount
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
      <div className="heading">Add Expense</div>
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
  Alert
})(AddExpense);
