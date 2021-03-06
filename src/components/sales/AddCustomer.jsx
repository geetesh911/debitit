import React, { useState, useEffect } from "react";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import {
  addCustomer,
  clearMsg,
  clearSalesErrors
} from "../../actions/salesAction";
import { setAlert as Alert } from "./../../actions/alertAction";

const AddCustomer = ({
  sales: { error },
  addCustomer,
  clearMsg,
  clearSalesErrors,
  Alert,
  msg
}) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    setAlert: {
      name: false,
      mobile: false
    }
  });

  const [loading, setLoading] = useState(false);

  const { name, mobile, setAlert } = formData;

  useEffect(() => {
    if (error === "Customer already exist") {
      Alert(error, "danger");
      clearSalesErrors();
    }

    if (msg) {
      Alert(msg, "info");
      clearMsg();
      setFormData({
        ...formData,
        name: "",
        mobile: "",
        setAlert: { name: false, mobile: false }
      });
    }

    // eslint-disable-next-line
  }, [msg, error]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    await addCustomer({
      name,
      mobile
    });

    setLoading(false);
  };

  return (
    <div className="sales-new-content">
      <div className="heading">Add a Customer</div>
      <div className="sales-form">
        <form onSubmit={onSubmit}>
          <Input
            name="name"
            label="Customer Name*"
            value={name}
            onChange={onChange}
            alert={setAlert.name}
            alertMsg="Customer name is required"
          />
          <Input
            name="mobile"
            label="Customer Mobile*"
            value={mobile}
            onChange={onChange}
            minLength="10"
            maxLength="10"
            alert={setAlert.mobile}
            alertMsg="Customer mobile is required"
          />
          <SaveButton label="Add" loading={loading} />
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
  addCustomer,
  clearMsg,
  clearSalesErrors,
  Alert
})(AddCustomer);
