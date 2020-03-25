import React, { useState, useEffect, Fragment } from "react";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import {
  getExpenseCategories,
  editExpenseCategory,
  clearOthersMsg
} from "../../actions/othersAction";
import { Select } from "../common/Select";
import { setAlert as Alert } from "./../../actions/alertAction";

const EditCustomer = ({
  others: { categories, msg },
  getExpenseCategories,
  editExpenseCategory,
  clearOthersMsg
}) => {
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    setAlert: {
      categoryId: false,
      name: false
    }
  });
  const { name, categoryId, setAlert } = formData;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getExpenseCategories();
    if (categoryId) {
      categories.filter(
        c => c._id === categoryId && setFormData({ ...formData, name: c.name })
      );
    }
    if (msg) {
      Alert(msg, "info");
      clearOthersMsg();
      setFormData({
        ...formData,
        categoryId: "",
        name: "",
        setAlert: { name: false }
      });
    }

    //eslint-disable-next-line
  }, [categoryId, msg]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (categoryId === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, categoryId: true } });
    } else {
      setLoading(true);
      await editExpenseCategory({ name }, categoryId);

      setLoading(false);
    }
  };

  const categoriesOptions = () => {
    let options = [];
    categories.forEach(category => {
      let option = {};
      option.name = category.name;
      option.value = category._id;

      options.push(option);
    });
    return options;
  };

  return (
    <div className="others-new-content">
      <div className="heading">Edit Expense Type</div>
      <div className="others-form">
        <form onSubmit={onSubmit}>
          {categories && (
            <Select
              label="Categories*"
              options={categoriesOptions()}
              id="categoryId"
              value={categoryId}
              first={true}
              alert={setAlert.categoryId}
              alertMsg="Choose a category"
              onChange={onChange}
            />
          )}
          {categoryId && (
            <Fragment>
              <Input
                name="name"
                label="Customer Name"
                value={name}
                onChange={onChange}
                alert={setAlert.name}
                alertMsg="Category name is required"
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
  others: state.others
});

export default connect(mapStateToProps, {
  getExpenseCategories,
  editExpenseCategory,
  clearOthersMsg,
  Alert
})(EditCustomer);
