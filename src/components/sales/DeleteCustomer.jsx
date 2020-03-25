import React, { useState, useEffect } from "react";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import { Select } from "../common/Select";
import { deleteCustomer, clearMsg } from "./../../actions/salesAction";
import { setAlert as Alert } from "./../../actions/alertAction";

const DeleteCustomer = ({
  sales: { customers },
  msg,
  clearMsg,
  deleteCustomer
}) => {
  const [formData, setFormData] = useState({
    customerId: "",
    setAlert: {
      customerId: false
    }
  });
  const { customerId, setAlert } = formData;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (msg) {
      Alert(msg, "info");
      clearMsg();
      setFormData({
        ...formData,
        customerId: "",
        setAlert: { customerId: false }
      });
    }

    // eslint-disable-next-line
  }, [msg]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (customerId === "")
      setFormData({ ...formData, setAlert: { ...setAlert, customerId: true } });
    else {
      setLoading(true);

      await deleteCustomer(customerId);

      setLoading(false);
    }
  };

  const customersOptions = () => {
    let options = [];
    customers.forEach(customer => {
      let option = {};
      option.name = customer.name;
      option.value = customer._id;

      options.push(option);
    });
    return options;
  };

  return (
    <div className="sales-new-content">
      <div className="heading">Delete Customer</div>
      <div className="sales-form">
        <form onSubmit={onSubmit}>
          {customers && (
            <Select
              label="Customer*"
              options={customersOptions()}
              id="customerId"
              value={customerId}
              first={true}
              alert={setAlert.customerId}
              alertMsg="Choose a customer"
              onChange={onChange}
            />
          )}
          <SaveButton label="Delete" loading={loading} />
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  sales: state.transaction.sales,
  msg: state.transaction.msg
});

export default connect(mapStateToProps, {
  deleteCustomer,
  clearMsg,
  Alert
})(DeleteCustomer);
