import React, { useState, useEffect, Fragment } from "react";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import { getCreditor, gavePayment } from "../../actions/purchaseAction";
import { Select } from "../common/Select";
import { clearMsg } from "./../../actions/salesAction";
import { setAlert as Alert } from "../../actions/alertAction";

const GavePayment = ({
  purchase: { creditors },
  msg,
  clearMsg,
  Alert,
  getCreditor,
  gavePayment
}) => {
  const [formData, setFormData] = useState({
    amount: "",
    creditorId: "",
    setAlert: {
      creditorId: false,
      amount: false
    }
  });
  const { amount, creditorId, setAlert } = formData;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (creditorId) {
      getCreditor(creditorId);
    }

    if (msg) {
      Alert(msg, "info");
      clearMsg();
      setFormData({
        ...formData,
        creditorId: "",
        amount: "",
        setAlert: { name: false, amount: false }
      });
    }

    //eslint-disable-next-line
  }, [creditorId, msg]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCreditorsChange = (e, { value }) => {
    setFormData({ ...formData, creditorId: value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (creditorId === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, creditorId: true } });
    } else if (amount === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, amount: true } });
    } else {
      setLoading(true);
      await gavePayment({ amount, creditorId }, creditorId);

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
      <div className="heading">Gave Payment</div>
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
              onChange={onCreditorsChange}
            />
          )}
          {creditorId && (
            <Fragment>
              <Input
                name="amount"
                label="Amount*"
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
  purchase: state.transaction.purchase,
  msg: state.transaction.msg
});

export default connect(mapStateToProps, {
  getCreditor,
  gavePayment,
  Alert,
  clearMsg
})(GavePayment);
