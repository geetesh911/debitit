import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  addSales,
  clearSalesErrors,
  filterAddSales,
  clearFilterAddSales
} from "../../actions/salesAction";
import { getProducts } from "../../actions/purchaseAction";
import { Select } from "../common/Select";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { setAlert as Alert } from "./../../actions/alertAction";

const AddSales = ({
  purchase: { products },
  sales: {
    customers,
    error,
    filtered: { addSale }
  },
  getProducts,
  addSales,
  filterAddSales,
  clearFilterAddSales,
  clearSalesErrors,
  Alert
}) => {
  const [formData, setFormData] = useState({
    payment: "cash",
    quantity: "",
    price: "",
    otherExpenses: "0",
    customerId: "",
    product: "",
    search: "",
    disabled: false,
    productOptions: null,
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
    search,
    disabled,
    setAlert,
    productOptions,
    showCustomers
  } = formData;

  useEffect(() => {
    getProducts();

    if (addSale) {
      let options = [];
      addSale.forEach(product => {
        let option = {};
        option.name = `${product.productName} - \u20B9 ${product.perPieceSellingPrice}`;
        option.value = JSON.stringify(product);

        options.push(option);
      });
      setFormData({ ...formData, productOptions: options });
    }
    if (!addSale) {
      setFormData({ ...formData, productOptions: null });
    }

    // eslint-disable-next-line
  }, [addSale]);

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
    if (product)
      setFormData({
        ...formData,
        disabled: true,
        search: ""
      });
    else {
      setFormData({ ...formData, disabled: false });
    }

    if (error === "Enough stock is not available") {
      console.log("run");
      Alert(error, "danger");
      clearSalesErrors();
    }

    // eslint-disable-next-line
  }, [product, error]);

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
      const productData = e.target.value
        ? JSON.parse(e.target.value)
        : { price: "" };
      setFormData({
        ...formData,
        product: e.target.value,

        price: productData.perPieceSellingPrice
      });
    }
    if (e.target.name === "search" && e.target.value !== "") {
      filterAddSales(e.target.value);
    } else {
      clearFilterAddSales();
    }
  };

  const onSubmit = async e => {
    e.preventDefault();

    setLoading(true);

    if (product.length <= 0) {
      setFormData({ ...formData, setAlert: { ...setAlert, product: true } });
    } else if (payment === "credit" && customerId === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, customerId: true } });
    } else {
      if (customerId.length > 0) {
        await addSales(
          {
            productName: JSON.parse(product).productName,
            productId: JSON.parse(product)._id,
            payment,
            quantity: parseInt(quantity),
            otherExpenses: parseInt(otherExpenses),
            customerId,
            price: parseInt(price)
          },
          products
        );
      } else {
        await addSales(
          {
            productName: JSON.parse(product).productName,
            productId: JSON.parse(product)._id,
            payment,
            quantity: parseInt(quantity),

            otherExpenses: parseInt(otherExpenses),
            price: parseInt(price)
          },
          products
        );
      }
      setFormData({
        ...formData,
        payment: "cash",
        quantity: "",
        price: "",
        otherExpenses: "0",
        customerId: "",
        product: "",
        search: "",
        disabled: false,
        productOptions: null,
        setAlert: {
          product: false,
          customerId: false,
          price: false,
          otherExpenses: false
        },
        showCustomers: false
      });
    }
    setLoading(false);
  };

  const customersOptions = () => {
    let options = [];
    customers.forEach(customer => {
      let option = {};

      option.name = customer.name;
      option.value = customer._id;

      options.push(option);
    });
    return options;
  };

  const inititalProductOptions = () => {
    let options = [];
    products.forEach(product => {
      let option = {};
      option.name = `${product.productName} - \u20B9 ${product.perPieceSellingPrice}`;
      option.value = JSON.stringify(product);

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
            <Input
              name="search"
              label="Search Product"
              value={search}
              min="1"
              disabled={disabled}
              onChange={onChange}
              helperText="Filter products by name"
              required={false}
            />
          )}
          {products && (
            <Select
              label="Product*"
              options={
                productOptions ? productOptions : inititalProductOptions()
              }
              id="product"
              value={product}
              first={true}
              alert={setAlert.product}
              alertMsg="Choose a product"
              onChange={onChange}
            />
          )}
          <Select
            label="Payment Method"
            options={["cash", "credit"]}
            id="payment"
            value={payment}
            onChange={onChange}
          />
          {showCustomers && customers && (
            <Select
              label="Creditor*"
              options={customersOptions()}
              id="customerId"
              value={customerId}
              first={true}
              alert={setAlert.customerId}
              alertMsg="Choose a creditor"
              onChange={onChange}
            />
          )}
          <Input
            name="quantity"
            label="Quantity*"
            type="number"
            value={quantity}
            min="1"
            onChange={onChange}
          />
          <Input
            name="price"
            label="Price"
            type="number"
            value={price}
            min="1"
            onChange={onChange}
            alert={setAlert.price}
            alertMsg="Price is required"
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
  sales: state.transaction.sales
});

export default connect(mapStateToProps, {
  addSales,
  getProducts,
  filterAddSales,
  clearFilterAddSales,
  clearSalesErrors,
  Alert
})(AddSales);
