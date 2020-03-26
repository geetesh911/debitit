import React, { useState, useEffect } from "react";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import { Select } from "../common/Select";
import {
  deleteExpenseCategory,
  clearOthersMsg
} from "./../../actions/othersAction";
import { setAlert as Alert } from "./../../actions/alertAction";

const DeleteCustomer = ({
  others: { categories, msg },
  clearOthersMsg,
  deleteExpenseCategory
}) => {
  const [formData, setFormData] = useState({
    categoryId: "",
    setAlert: {
      categoryId: false
    }
  });
  const { categoryId, setAlert } = formData;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (msg) {
      Alert(msg, "info");
      clearOthersMsg();
      setFormData({
        ...formData,
        categoryId: "",
        setAlert: { categoryId: false }
      });
    }

    // eslint-disable-next-line
  }, [msg]);

  const onExpenseChange = (e, { value }) => {
    setFormData({ ...formData, categoryId: value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (categoryId === "")
      setFormData({ ...formData, setAlert: { ...setAlert, categoryId: true } });
    else {
      setLoading(true);

      await deleteExpenseCategory(categoryId);

      setLoading(false);
    }
  };

  const categoriesOptions = () => {
    let options = [];
    categories.forEach(category => {
      let option = {};
      option.key = category.name;
      option.value = category._id;
      option.text = category.name;

      options.push(option);
    });
    return options;
  };

  return (
    <div className="sales-new-content">
      <div className="heading">Delete Expense Category</div>
      <div className="sales-form">
        <form onSubmit={onSubmit}>
          {categories && (
            <Select
              label="Category*"
              options={categoriesOptions()}
              id="categoryId"
              value={categoryId}
              first={true}
              alert={setAlert.categoryId}
              alertMsg="Choose a category"
              onChange={onExpenseChange}
            />
          )}
          <SaveButton label="Delete" loading={loading} />
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  others: state.others
});

export default connect(mapStateToProps, {
  deleteExpenseCategory,
  clearOthersMsg,
  Alert
})(DeleteCustomer);
