import React, { useState, useEffect, Fragment } from "react";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import { getCreditor, editCreditor } from "../../actions/purchaseAction";
import { Select } from "../common/Select";

const EditCreditor = ({
  purchase: { creditors },
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

    //eslint-disable-next-line
  }, [creditorId]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (creditorId === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, creditorId: true } });
    } else {
      setLoading(true);
      await editCreditor({ name, contact }, creditorId);
      setFormData({
        ...formData,
        creditorId: "",
        name: "",
        contact: "",
        setAlert: { name: false, contact: false }
      });
      setLoading(false);
    }
  };

  const creditorsOptions = () => {
    let options = [];
    creditors.forEach(creditor => {
      let option = {};
      option.name = creditor.name;
      option.value = creditor._id;

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
              onChange={onChange}
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
  purchase: state.transaction.purchase
});

export default connect(mapStateToProps, {
  getCreditor,
  editCreditor
})(EditCreditor);
