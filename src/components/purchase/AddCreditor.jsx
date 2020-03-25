import React, { useState, useEffect } from "react";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import { addCreditor } from "../../actions/purchaseAction";
import { clearMsg } from "./../../actions/salesAction";
import { setAlert as Alert } from "./../../actions/alertAction";

const AddCreditor = ({ msg, Alert, addCreditor, clearMsg }) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    setAlert: {
      name: false,
      contact: false
    }
  });

  const [loading, setLoading] = useState(false);

  const { name, contact, setAlert } = formData;

  useEffect(() => {
    if (msg) {
      Alert(msg, "info");
      clearMsg();
      setFormData({
        ...formData,
        name: "",
        contact: "",
        setAlert: { name: false, contact: false }
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

    await addCreditor({
      name,
      contact
    });

    setLoading(false);
  };

  return (
    <div className="purchase-new-content">
      <div className="heading">Add a Creditor</div>
      <div className="purchase-form">
        <form onSubmit={onSubmit}>
          <Input
            name="name"
            label="Creditor Name*"
            value={name}
            onChange={onChange}
            alert={setAlert.name}
            alertMsg="Creditor name is required"
          />
          <Input
            name="contact"
            label="Creditor Mobile*"
            value={contact}
            onChange={onChange}
            minLength="10"
            maxLength="10"
            alert={setAlert.contact}
            alertMsg="Creditor mobile is required"
          />
          <SaveButton label="Add" loading={loading} />
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  purchase: state.transaction.purchase,
  msg: state.transaction.msg
});

export default connect(mapStateToProps, {
  addCreditor,
  clearMsg,
  Alert
})(AddCreditor);
