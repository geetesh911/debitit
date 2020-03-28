import React, { useEffect, useState, Fragment } from "react";
import { connect } from "react-redux";
import { clearMsg } from "../../actions/salesAction";
import { getProducts } from "../../actions/purchaseAction";
import { addDrawings, clearOthersError } from "../../actions/othersAction";
import { Select } from "../common/Select";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { setAlert as Alert } from "./../../actions/alertAction";
import { SelectMultiple } from "./../common/SelectMultiple";

const Drawings = ({
  purchase: { products },
  auth: { user },
  sales: { customers, bill },
  others: { msg, error },
  getProducts,
  addDrawings,
  clearOthersError,
  Alert,
  clearMsg
}) => {
  const [formData, setFormData] = useState({
    quantity: "",
    amount: "",
    name: "",
    product: [],
    setAlert: {
      product: false,
      name: false,
      amount: false
    }
  });

  const [loading, setLoading] = useState(false);

  const { quantity, name, amount, product, setAlert } = formData;

  useEffect(() => {
    getProducts();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error === "Enough stock is not available") {
      Alert(error, "danger");
      clearOthersError();
    }
    if (msg) {
      Alert(msg, "info");
      clearMsg();
      console.log("called");
      setFormData({
        ...formData,
        quantity: "",
        name: "",
        amount: "",
        product: [],
        setAlert: {
          product: false,
          name: false,
          amount: false
        }
      });
    }

    // eslint-disable-next-line
  }, [error, msg]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onProductChange = (e, { value }) => {
    setFormData({
      ...formData,
      product: value
    });
  };

  const onNameChange = (e, { value }) => {
    setFormData({
      ...formData,
      name: value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const q = quantity.split(",");

    if (name === "stock" && product.length <= 0) {
      setFormData({ ...formData, setAlert: { ...setAlert, product: true } });
    } else if (name === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, name: true } });
    } else if (name === "cash" && amount === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, amount: true } });
    } else if (name === "stock" && product.length !== q.length) {
      Alert("Product and Quantity dont match", "danger");
    } else {
      let soldProducts = [];
      for (let i = 0; i < product.length; i++) {
        let p = {};
        p.productId = JSON.parse(product[i])._id;
        p.productName = JSON.parse(product[i]).productName;
        p.price = JSON.parse(product[i]).perPieceCost;
        p.quantity = q[i].trim();
        p.total = p.price * p.quantity;
        soldProducts.push(p);
      }

      await addDrawings({
        name,
        amount,
        products: soldProducts
      });
    }
    setLoading(false);
  };

  const inititalProductOptions = () => {
    let options = [];
    products.forEach(product => {
      let option = {};
      option.key = `${product.productName} - \u20B9 ${
        product.perPieceCost
      }${Math.random()}`;
      option.value = JSON.stringify(product);
      option.text = `${product.productName} - \u20B9 ${product.perPieceCost}`;

      options.push(option);
    });
    return options;
  };

  return (
    <div className="sale-new-content">
      <div className="heading">Drawings</div>
      <div className="sale-form">
        <form onSubmit={onSubmit}>
          <Select
            label="Name"
            options={[
              { key: "cash", value: "cash", text: "cash" },
              { key: "stock", value: "stock", text: "stock" }
            ]}
            id="name"
            value={name}
            onChange={onNameChange}
          />
          {products && name === "stock" && (
            <Fragment>
              <SelectMultiple
                label="Product*"
                options={inititalProductOptions()}
                id="product"
                value={product}
                first={true}
                alert={setAlert.product}
                alertMsg="Choose a product"
                onChange={onProductChange}
              />
              <Input
                name="quantity"
                label="Quantity*"
                value={quantity}
                min="1"
                onChange={onChange}
                helperText="Seperate each product quantity by comma"
              />
            </Fragment>
          )}
          {name === "cash" && (
            <Input
              name="amount"
              label="Amount*"
              value={amount}
              min="1"
              onChange={onChange}
              type="number"
              alert={setAlert.amount}
              alertMsg="Amount is required"
            />
          )}
          <SaveButton label="Add" loading={loading} />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  purchase: state.transaction.purchase,
  sales: state.transaction.sales,
  others: state.others
});

export default connect(mapStateToProps, {
  addDrawings,
  getProducts,
  Alert,
  clearOthersError,
  clearMsg
})(Drawings);
