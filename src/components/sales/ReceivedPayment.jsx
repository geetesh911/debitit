import React, { useState, useEffect, Fragment } from "react";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import {
  getCustomers,
  receivedPayment,
  clearMsg
} from "../../actions/salesAction";
import { Select } from "../common/Select";
import { setAlert as Alert } from "./../../actions/alertAction";

const ReceivedPayment = ({
  sales: { customers },
  msg,
  getCustomers,
  clearMsg,
  receivedPayment
}) => {
  const [formData, setFormData] = useState({
    amount: "",
    source: "",
    customerId: "",
    setAlert: {
      customerId: false,
      amount: false,
      source: false
    }
  });
  const { amount, source, customerId, setAlert } = formData;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCustomers();
    if (msg) {
      Alert(msg, "info");
      clearMsg();
      setFormData({
        ...formData,
        customerId: "",
        amount: "",
        setAlert: { name: false, mobile: false }
      });
    }

    //eslint-disable-next-line
  }, [customerId, msg]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCustomerChange = (e, { value }) => {
    setFormData({ ...formData, customerId: value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (customerId === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, customerId: true } });
    } else if (amount === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, amount: true } });
    } else if (source === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, source: true } });
    } else {
      setLoading(true);
      await receivedPayment({ amount, customerId, source });

      setLoading(false);
    }
  };

  const onSourceChange = (e, { value }) => {
    setFormData({ ...formData, source: value });
  };

  const customersOptions = () => {
    let options = [];
    customers.forEach(customer => {
      let option = {};
      option.key = customer.name;
      option.value = customer._id;
      option.text = customer.name;

      options.push(option);
    });
    return options;
  };

  return (
    <div className="sales-new-content">
      <div className="heading">Received Payment</div>
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
              onChange={onCustomerChange}
            />
          )}
          {customerId && (
            <Fragment>
              <Select
                label="Source"
                options={[
                  { key: "cash", value: "cash", text: "cash" },
                  { key: "bank", value: "bank", text: "bank" }
                ]}
                id="source"
                value={source}
                alert={setAlert.source}
                alertMsg="Choose a source method"
                onChange={onSourceChange}
              />
              <Input
                name="amount"
                label="Amount*"
                type="number"
                min="1"
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
  sales: state.transaction.sales,
  msg: state.transaction.msg
});

export default connect(mapStateToProps, {
  getCustomers,
  receivedPayment,
  clearMsg,
  Alert
})(ReceivedPayment);
