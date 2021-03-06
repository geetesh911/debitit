import React, { useState, useEffect, Fragment } from "react";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import { getCreditor, editCreditor } from "../../actions/purchaseAction";
import { Select } from "../common/Select";
import { clearMsg } from "./../../actions/salesAction";
import { setAlert as Alert } from "../../actions/alertAction";

const EditCreditor = ({
  purchase: { creditors },
  msg,
  clearMsg,
  Alert,
  getCreditor,
  editCreditor
}) => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    creditorId: "",
    setAlert: {
      creditorId: false,
      name: false,
      contact: false
    }
  });
  const { name, contact, creditorId, setAlert } = formData;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (creditorId) {
      getCreditor(creditorId);
      creditors.filter(
        c =>
          c._id === creditorId &&
          setFormData({ ...formData, name: c.name, contact: c.contact })
      );
    }

    if (msg) {
      Alert(msg, "info");
      clearMsg();
      setFormData({
        ...formData,
        creditorId: "",
        name: "",
        contact: "",
        setAlert: { name: false, contact: false }
      });
    }

    //eslint-disable-next-line
  }, [creditorId, msg]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCreditorChange = (e, { value }) => {
    setFormData({ ...formData, creditorId: value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (creditorId === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, creditorId: true } });
    } else {
      setLoading(true);
      await editCreditor({ name, contact }, creditorId);

      setLoading(false);
    }
  };

  const creditorsOptions = () => {
    let options = [];
    creditors.forEach(creditor => {
      let option = {};
      option.key = creditor.name;
      option.value = creditor._id;
      option.text = creditor.name;

      options.push(option);
    });
    return options;
  };

  return (
    <div className="purchase-new-content">
      <div className="heading">Edit Creditor</div>
      <div className="purchase-form">
        <form onSubmit={onSubmit}>
          {creditors && (
            <Select
              label="Creditor*"
              options={creditorsOptions()}
              id="creditorId"
              value={creditorId}
              first={true}
              alert={setAlert.creditorId}
              alertMsg="Choose a creditor"
              onChange={onCreditorChange}
            />
          )}
          {creditorId && (
            <Fragment>
              <Input
                name="name"
                label="Creditor Name"
                value={name}
                onChange={onChange}
                alert={setAlert.name}
                alertMsg="Creditor name is required"
              />
              <Input
                name="contact"
                label="Creditor Mobile"
                value={contact}
                onChange={onChange}
                minLength="10"
                maxLength="10"
                alert={setAlert.contact}
                alertMsg="Creditor mobile is required"
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
  purchase: state.transaction.purchase,
  msg: state.transaction.msg
});

export default connect(mapStateToProps, {
  getCreditor,
  editCreditor,
  Alert,
  clearMsg
})(EditCreditor);
