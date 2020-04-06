import React, { useState, useEffect } from "react";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { connect } from "react-redux";
import {
  payLoan,
  getLoans,
  clearOthersMsg,
  clearOthersError
} from "../../actions/othersAction";
import { SaveButton } from "../common/SaveButton";
import { setAlert as Alert } from "./../../actions/alertAction";

const LoanPayment = ({
  others: { msg, error, loans },
  clearOthersMsg,
  clearOthersError,
  Alert,
  payLoan,
  getLoans
}) => {
  const [formData, setFormData] = useState({
    loanId: "",
    payment: "",
    amount: "",
    otherExpenses: "0",
    setAlert: {
      loanId: false,
      payment: false,
      amount: false,
      otherExpenses: false
    }
  });

  const [loading, setLoading] = useState(false);

  const { loanId, payment, amount, otherExpenses, setAlert } = formData;

  useEffect(() => {
    getLoans();
    if (error === "Enough Cash is not available") {
      Alert(error, "danger");
      clearOthersError();
    }
    if (error === "Amount can't be greater than loan amount") {
      Alert(error, "danger");
      clearOthersError();
    }

    if (msg) {
      Alert(msg, "info");
      clearOthersMsg();
      setFormData({
        ...formData,
        loanId: "",
        payment: "",
        amount: "",
        otherExpenses: "0",
        setAlert: {
          loanId: false,
          payment: false,
          amount: false,
          otherExpenses: false
        }
      });
    }

    // eslint-disable-next-line
  }, [msg, error]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onPaymentChange = (e, { value }) => {
    setFormData({ ...formData, payment: value });
  };

  const onLoanChange = (e, { value }) => {
    setFormData({ ...formData, loanId: value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    if (loanId === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, loanId: true } });
    } else if (amount === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, amount: true } });
    } else if (payment === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, payment: true } });
    } else {
      await payLoan(
        {
          amount: parseInt(amount),
          otherExpenses: parseInt(otherExpenses)
        },
        loanId
      );
    }

    setLoading(false);
  };

  const loanOptions = () => {
    let options = [];
    loans.forEach(loan => {
      let option = {};
      option.key = loan.name;
      option.value = loan._id;
      option.text = loan.name;

      options.push(option);
    });
    return options;
  };

  return (
    <div className="others-new-content">
      <div className="heading">Pay Loan</div>
      <div className="others-form">
        <form onSubmit={onSubmit}>
          <Select
            label="Loan*"
            options={loanOptions()}
            id="loanId"
            value={loanId}
            first={true}
            alert={setAlert.loanId}
            alertMsg="Choose a Loan"
            onChange={onLoanChange}
          />
          <Select
            label="Payment Method"
            options={[{ key: "cash", value: "cash", text: "cash" }]}
            id="payment"
            value={payment}
            alert={setAlert.payment}
            alertMsg="Choose a payment method"
            onChange={onPaymentChange}
          />
          <Input
            name="amount"
            label="Amount*"
            type="number"
            value={amount}
            min="1"
            onChange={onChange}
            alert={setAlert.amount}
            alertMsg="Amount is required"
          />
          <Input
            name="otherExpenses"
            label="Other Expenses"
            type="number"
            value={otherExpenses}
            min="0"
            onChange={onChange}
          />
          <SaveButton label="Add" loading={loading} />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  purchase: state.transaction.purchase,
  others: state.others
});

export default connect(mapStateToProps, {
  payLoan,
  getLoans,
  Alert,
  clearOthersMsg,
  clearOthersError
})(LoanPayment);
