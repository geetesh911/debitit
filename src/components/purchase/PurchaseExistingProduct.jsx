import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getProducts,
  addExistingPurchase,
  filterExistingPurchase,
  clearFilterExistingPurchase
} from "../../actions/purchaseAction";
import { Select } from "../common/Select";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { clearMsg } from "./../../actions/salesAction";
import { setAlert as Alert } from "./../../actions/alertAction";

const PurchaseExistingProduct = ({
  purchase: {
    products,
    creditors,
    filtered: { purchaseExistingProduct }
  },
  msg,
  clearMsg,
  Alert,
  getProducts,
  addExistingPurchase,
  filterExistingPurchase,
  clearFilterExistingPurchase
}) => {
  const [formData, setFormData] = useState({
    payment: "cash",
    quantity: "",
    perPieceCost: "",
    perPieceSellingPrice: "",
    otherExpenses: "0",
    creditorId: "",
    product: "",
    search: "",
    disabled: false,
    productOptions: null,
    setAlert: {
      product: false,
      creditorId: false,
      perPieceCost: false,
      perPieceSellingPrice: false,
      otherExpenses: false
    },
    showCreditors: false
  });

  const [loading, setLoading] = useState(false);

  const {
    payment,
    quantity,
    perPieceCost,
    perPieceSellingPrice,
    creditorId,
    otherExpenses,
    product,
    search,
    disabled,
    setAlert,
    productOptions,
    showCreditors
  } = formData;

  useEffect(() => {
    getProducts();

    if (purchaseExistingProduct) {
      let options = [];
      purchaseExistingProduct.forEach(product => {
        let option = {};
        option.name = `${product.productName} - \u20B9 ${product.perPieceSellingPrice}`;
        option.value = JSON.stringify(product);

        options.push(option);
      });
      setFormData({ ...formData, productOptions: options });
    }
    if (!purchaseExistingProduct) {
      setFormData({ ...formData, productOptions: null });
    }

    // eslint-disable-next-line
  }, [purchaseExistingProduct]);

  useEffect(() => {
    if (payment === "credit")
      setFormData({
        ...formData,
        showCreditors: true
        // creditorId: creditors[0]._id
      });
    if (payment === "cash") {
      setFormData({ ...formData, showCreditors: false, creditorId: "" });
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
    if (msg) {
      Alert(msg, "info");
      clearMsg();
      setFormData({
        ...formData,
        payment: "cash",
        quantity: "",
        perPieceCost: "",
        perPieceSellingPrice: "",
        otherExpenses: "0",
        creditorId: "",
        product: "",
        search: "",
        disabled: false,
        productOptions: null,
        setAlert: {
          product: false,
          creditorId: false,
          perPieceCost: false,
          perPieceSellingPrice: false,
          otherExpenses: false
        },
        showCreditors: false
      });
    }
    // eslint-disable-next-line
  }, [product, msg]);

  const onChange = e => {
    if (
      e.target.name === "perPieceCost" ||
      e.target.name === "perPieceSellingPrice"
    ) {
      setFormData({
        ...formData,
        perPieceCost: perPieceCost || "",
        perPieceSellingPrice: perPieceSellingPrice || ""
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    if (e.target.name === "product") {
      const productData = e.target.value
        ? JSON.parse(e.target.value)
        : { perPieceCost: "", perPieceSellingPrice: "" };
      setFormData({
        ...formData,
        product: e.target.value,
        perPieceCost: productData.perPieceCost,
        perPieceSellingPrice: productData.perPieceSellingPrice
      });
    }
    if (e.target.name === "search" && e.target.value !== "") {
      filterExistingPurchase(e.target.value);
    } else {
      clearFilterExistingPurchase();
    }
  };

  const onSubmit = async e => {
    e.preventDefault();

    setLoading(true);
    if (product.length <= 0) {
      setFormData({ ...formData, setAlert: { ...setAlert, product: true } });
    } else if (payment === "credit" && creditorId === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, creditorId: true } });
    } else {
      if (creditorId.length > 0) {
        await addExistingPurchase({
          productName: JSON.parse(product).productName,
          productId: JSON.parse(product)._id,
          payment,
          quantity: parseInt(quantity),
          perPieceCost: parseInt(perPieceCost),
          otherExpenses: parseInt(otherExpenses),
          creditorId,
          perPieceSellingPrice: parseInt(perPieceSellingPrice)
        });
      } else {
        await addExistingPurchase({
          productName: JSON.parse(product).productName,
          productId: JSON.parse(product)._id,
          payment,
          quantity: parseInt(quantity),
          perPieceCost: parseInt(perPieceCost),
          otherExpenses: parseInt(otherExpenses),
          perPieceSellingPrice: parseInt(perPieceSellingPrice)
        });
      }
    }
    setLoading(false);
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
    <div className="purchase-new-content">
      <div className="heading">Add a Purchase</div>
      <div className="purchase-form">
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
          {showCreditors && creditors && (
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
          <Input
            name="quantity"
            label="Quantity*"
            type="number"
            value={quantity}
            min="1"
            onChange={onChange}
          />
          <Input
            name="perPieceCost"
            label="Per Piece Cost"
            type="number"
            value={perPieceCost}
            min="1"
            onChange={onChange}
            alert={setAlert.perPieceCost}
            alertMsg="Cost price is required"
          />
          <Input
            name="perPieceSellingPrice"
            label="Per Piece Selling Price"
            type="number"
            value={perPieceSellingPrice}
            min="1"
            onChange={onChange}
            alert={setAlert.perPieceSellingPrice}
            alertMsg="Selling price is required"
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
  msg: state.transaction.msg
});

export default connect(mapStateToProps, {
  addExistingPurchase,
  getProducts,
  filterExistingPurchase,
  clearFilterExistingPurchase,
  clearMsg,
  Alert
})(PurchaseExistingProduct);
