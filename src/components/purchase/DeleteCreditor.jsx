import React, { useState, useEffect } from "react";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import { Select } from "../common/Select";
import { deleteCreditor } from "./../../actions/purchaseAction";
import { clearMsg } from "./../../actions/salesAction";
import { setAlert as Alert } from "./../../actions/alertAction";

const DeleteCreditor = ({
  purchase: { creditors },
  msg,
  clearMsg,
  Alert,
  deleteCreditor
}) => {
  const [formData, setFormData] = useState({
    creditorId: "",
    setAlert: {
      creditorId: false
    }
  });
  const { creditorId, setAlert } = formData;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (msg) {
      Alert(msg, "info");
      clearMsg();
      setFormData({
        ...formData,
        creditorId: "",
        setAlert: { creditorId: false }
      });
    }

    // eslint-disable-next-line
  }, [msg]);

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
  purchase: state.transaction.purchase,
  msg: state.transaction.msg
});

export default connect(mapStateToProps, {
  deleteCreditor,
  clearMsg,
  Alert
})(DeleteCreditor);
