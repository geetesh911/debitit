import React, { useState } from "react";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import { addCustomer } from "../../actions/salesAction";

const AddCustomer = ({ addCustomer }) => {
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

    setFormData({
      ...formData,
      name: "",
      mobile: "",
      setAlert: { name: false, mobile: false }
    });
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
  sales: state.transaction.sales
});

export default connect(mapStateToProps, {
  addCustomer
})(AddCustomer);
