import React, { useState, useEffect, Fragment } from "react";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import { getCustomers, editCustomer } from "../../actions/salesAction";
import { Select } from "../common/Select";

const EditCustomer = ({ sales: { customers }, getCustomers, editCustomer }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    customerId: "",
    setAlert: {
      customerId: false,
      name: false,
      mobile: false
    }
  });
  const { name, mobile, customerId, setAlert } = formData;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCustomers();
    if (customerId) {
      customers.filter(
        c =>
          c._id === customerId &&
          setFormData({ ...formData, name: c.name, mobile: c.mobile })
      );
    }

    //eslint-disable-next-line
  }, [customerId]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (customerId === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, customerId: true } });
    } else {
      setLoading(true);
      await editCustomer({ name, mobile }, customerId);
      setFormData({
        ...formData,
        customerId: "",
        name: "",
        mobile: "",
        setAlert: { name: false, mobile: false }
      });
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
      <div className="heading">Edit Customer</div>
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
          {customerId && (
            <Fragment>
              <Input
                name="name"
                label="Customer Name"
                value={name}
                onChange={onChange}
                alert={setAlert.name}
                alertMsg="Customer name is required"
              />
              <Input
                name="mobile"
                label="Customer Mobile"
                value={mobile}
                onChange={onChange}
                minLength="10"
                maxLength="10"
                alert={setAlert.mobile}
                alertMsg="Customer mobile is required"
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
  sales: state.transaction.sales
});

export default connect(mapStateToProps, {
  getCustomers,
  editCustomer
})(EditCustomer);
