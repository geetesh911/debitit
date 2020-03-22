import React, { useState } from "react";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import { Select } from "../common/Select";
import { deleteCreditor } from "./../../actions/purchaseAction";

const DeleteCreditor = ({ purchase: { creditors }, deleteCreditor }) => {
  const [formData, setFormData] = useState({
    creditorId: "",
    setAlert: {
      creditorId: false
    }
  });
  const { creditorId, setAlert } = formData;

  const [loading, setLoading] = useState(false);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (creditorId === "")
      setFormData({ ...formData, setAlert: { ...setAlert, creditorId: true } });
    else {
      setLoading(true);

      await deleteCreditor(creditorId);

      setLoading(false);

      setFormData({
        ...formData,
        creditorId: "",
        setAlert: { creditorId: false }
      });
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
      <div className="heading">Delete Creditor</div>
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
          <SaveButton label="Delete" loading={loading} />
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  purchase: state.purchase
});

export default connect(mapStateToProps, {
  deleteCreditor
})(DeleteCreditor);
