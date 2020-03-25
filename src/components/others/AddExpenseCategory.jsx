import React, { useState, useEffect } from "react";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import {
  addExpenseCategories,
  clearOthersMsg
} from "../../actions/othersAction";
import { setAlert as Alert } from "./../../actions/alertAction";

const AddCustomer = ({
  addExpenseCategories,
  clearOthersMsg,
  Alert,
  others: { msg }
}) => {
  const [formData, setFormData] = useState({
    name: "",
    setAlert: {
      name: false
    }
  });

  const [loading, setLoading] = useState(false);

  const { name, setAlert } = formData;

  useEffect(() => {
    if (msg) {
      Alert(msg, "info");
      clearOthersMsg();
      setFormData({
        ...formData,
        name: "",
        setAlert: { name: false }
      });
    }

    // eslint-disable-next-line
  }, [msg]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    await addExpenseCategories({
      name
    });

    setLoading(false);
  };

  return (
    <div className="sales-new-content">
      <div className="heading">Add Expense Type</div>
      <div className="sales-form">
        <form onSubmit={onSubmit}>
          <Input
            name="name"
            label="Category Name*"
            value={name}
            onChange={onChange}
            alert={setAlert.name}
            alertMsg="Category name is required"
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
  Alert
})(AddCustomer);
