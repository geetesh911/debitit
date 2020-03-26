import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  addSales,
  clearSalesErrors,
  clearMsg
} from "../../actions/salesAction";
import { getProducts } from "../../actions/purchaseAction";
import { Select } from "../common/Select";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { setAlert as Alert } from "./../../actions/alertAction";
import { SelectMultiple } from "./../common/SelectMultiple";

const AddSales = ({
  purchase: { products },
  sales: { customers, error },
  msg,
  getProducts,
  addSales,
  clearSalesErrors,
  Alert,
  clearMsg
}) => {
  const [formData, setFormData] = useState({
    payment: "",
    quantity: "",
    price: "",
    otherExpenses: "0",
    customerId: "",
    product: [],
    setAlert: {
      product: false,
      customerId: false,
      price: false,
      otherExpenses: false
    },
    showCustomers: false
  });

  const [loading, setLoading] = useState(false);

  const {
    payment,
    quantity,
    price,
    customerId,
    otherExpenses,
    product,
    setAlert,
    showCustomers
  } = formData;

  useEffect(() => {
    getProducts();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (payment === "credit")
      setFormData({
        ...formData,
        showCustomers: true
        // customerId: creditors[0]._id
      });
    if (payment === "cash") {
      setFormData({ ...formData, showCustomers: false, customerId: "" });
    }
    // eslint-disable-next-line
  }, [payment]);

  useEffect(() => {
    if (error === "Enough stock is not available") {
      Alert(error, "danger");
      clearSalesErrors();
    }
    if (msg) {
      Alert(msg, "info");
      clearMsg();
      setFormData({
        ...formData,
        payment: "",
        quantity: "",
        price: "",
        otherExpenses: "0",
        customerId: "",
        product: "",
        setAlert: {
          product: false,
          customerId: false,
          price: false,
          otherExpenses: false
        },
        showCustomers: false
      });
    }

    // eslint-disable-next-line
  }, [error, msg]);

  const onChange = e => {
    if (e.target.name === "price") {
      setFormData({
        ...formData,

        price: price || ""
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    if (e.target.name === "product") {
    }
  };

  const onProductChange = (e, { value }) => {
    setFormData({
      ...formData,
      product: value
    });
  };

  const onPaymentChange = (e, { value }) => {
    setFormData({
      ...formData,
      payment: value
    });
  };

  const onCustomerChange = (e, { value }) => {
    setFormData({ ...formData, customerId: value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    const q = quantity.split(",");

    if (product.length <= 0) {
      setFormData({ ...formData, setAlert: { ...setAlert, product: true } });
    } else if (payment === "credit" && customerId === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, customerId: true } });
    } else if (product.length !== q.length) {
      Alert("Product and Quantity dont match", "danger");
    } else {
      let soldProducts = [];
      for (let i = 0; i < product.length; i++) {
        let p = {};
        p.productId = JSON.parse(product[i])._id;
        p.productName = JSON.parse(product[i]).productName;
        p.price = JSON.parse(product[i]).perPieceSellingPrice;
        p.quantity = q[i].trim();
        p.total = p.price * p.quantity;
        soldProducts.push(p);
      }
      if (customerId.length > 0) {
        await addSales(
          {
            soldProducts,
            payment,
            otherExpenses: parseInt(otherExpenses),
            customerId
          },
          products
        );
      } else {
        await addSales(
          {
            soldProducts,
            payment,
            otherExpenses: parseInt(otherExpenses)
          },
          products
        );
      }
    }
    setLoading(false);
  };

  const customersOptions = () => {
    let options = [];
    customers.forEach(customer => {
      let option = {};

      option.key = customer.name;
      option.value = customer._id;
      option.text = customer.name;

      options.push(option);
    });
    return options;
  };

  const inititalProductOptions = () => {
    let options = [];
    products.forEach(product => {
      let option = {};
      option.key = `${product.productName} - \u20B9 ${
        product.perPieceSellingPrice
      }${Math.random()}`;
      option.value = JSON.stringify(product);
      option.text = `${product.productName} - \u20B9 ${product.perPieceSellingPrice}`;

      options.push(option);
    });
    return options;
  };

  return (
    <div className="sale-new-content">
      <div className="heading">Add a Sale</div>
      <div className="sale-form">
        <form onSubmit={onSubmit}>
          {products && (
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
          )}
          <Select
            label="Payment Method"
            options={[
              { key: "cash", value: "cash", text: "cash" },
              { key: "credit", value: "credit", text: "credit" }
            ]}
            id="payment"
            value={payment}
            onChange={onPaymentChange}
          />
          {showCustomers && customers && (
            <Select
              label="Customer*"
              options={customersOptions()}
              id="customerId"
              value={customerId}
              first={true}
              alert={setAlert.customerId}
              alertMsg="Choose a customer"
              onChange={onCustomerChange}
            />
          )}
          <Input
            name="quantity"
            label="Quantity*"
            value={quantity}
            min="1"
            onChange={onChange}
            helperText="Seperate each product quantity by comma"
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
  sales: state.transaction.sales,
  msg: state.transaction.msg
});

export default connect(mapStateToProps, {
  addSales,
  getProducts,
  clearSalesErrors,
  Alert,
  clearMsg
})(AddSales);
