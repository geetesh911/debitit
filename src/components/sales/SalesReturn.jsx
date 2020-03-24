import React, { useState, useEffect, Fragment } from "react";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import {
  getSales,
  getSalesUsingProduct,
  addSalesReturn,
  filterSalesReturn,
  clearFilterSalesReturn,
  filterCustomer,
  clearFilterCustomer,
  clearSalesErrors
} from "../../actions/salesAction";
import { setAlert as Alert } from "./../../actions/alertAction";
import convertDate from "./../../utils/convertDate";

const SalesReturn = ({
  purchase: { products },
  sales: {
    salesUsingProduct,
    filtered: { saleReturn, sale },
    error
  },
  getSales,
  getSalesUsingProduct,
  addSalesReturn,
  filterSalesReturn,
  filterCustomer,
  clearFilterSalesReturn,
  clearFilterCustomer,
  Alert,
  clearSalesErrors
}) => {
  const [formData, setFormData] = useState({
    price: "",
    productId: "",
    salesId: "",
    quantity: "",
    search: "",
    searchCustomer: "",
    productOptions: null,
    salesOptions: null,
    disabled: false,
    disabledSearchCustomer: false,
    setAlert: {
      productId: { alert: false, msg: "" },
      salesId: false,
      productName: false,
      price: false
    }
  });
  const {
    price,
    productId,
    salesId,
    quantity,
    search,
    searchCustomer,
    productOptions,
    salesOptions,
    disabled,
    disabledSearchCustomer,
    setAlert
  } = formData;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productId) {
      setFormData({ ...formData, quantity: "" });
      getSales();
      products.filter(async p => {
        if (p._id === productId) {
          setLoading(true);
          await getSalesUsingProduct(p.productName);
          setFormData({
            ...formData,
            productName: p.productName,
            price: p.perPieceSellingPrice,
            quantity: "",
            // purchaseId: "",
            disabled: true,
            search: "",
            setAlert: { ...setAlert, productId: { alert: false, msg: "" } }
          });
          if (productId && salesId) {
            // setFormData({ ...formData, purchaseId: "" });
            salesUsingProduct.filter(
              p =>
                p._id === salesId &&
                setFormData({
                  ...formData,
                  quantity: p.quantity,
                  searchCustomer: "",
                  disabledSearchCustomer: true
                })
            );
          }
          setLoading(false);
        }
      });
    } else {
      setFormData({
        ...formData,
        price: "",
        productId: "",
        salesId: "",
        quantity: "",
        disabled: false,
        disabledSearchCustomer: false,
        setAlert: {
          productId: { alert: false, msg: "" },
          salesId: false,
          productName: false,
          perPieceCost: false
        }
      });
    }

    if (error === "Cannot return more than sold") {
      Alert(error, "danger");
      clearSalesErrors();
    }

    //eslint-disable-next-line
  }, [productId, salesId, error]);

  useEffect(() => {
    if (saleReturn) {
      let options = [];
      saleReturn.forEach(product => {
        let option = {};
        option.name = `${product.productName} - \u20B9 ${product.perPieceSellingPrice}`;
        option.value = product._id;

        options.push(option);
      });
      setFormData({ ...formData, productOptions: options });
    }
    if (!saleReturn) {
      setFormData({ ...formData, productOptions: null });
    }

    // eslint-disable-next-line
  }, [saleReturn]);

  useEffect(() => {
    if (sale) {
      let options = [];
      sale.forEach(s => {
        let option = {};
        option.name = `${s.customer.name} - ${convertDate(s.date)}`;
        option.value = s._id;

        options.push(option);
      });
      setFormData({ ...formData, salesOptions: options });
    }
    if (!sale) {
      setFormData({ ...formData, salesOptions: null });
    }

    // eslint-disable-next-line
  }, [sale]);

  const onChange = e => {
    if (e.target.name === "price") {
      setFormData({
        ...formData,
        price: price || ""
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      if (e.target.name === "productId") {
        setFormData({ ...formData, productId: e.target.value, salesId: "" });
      }
      if (e.target.name === "search" && e.target.value !== "") {
        filterSalesReturn(e.target.value);
      } else clearFilterSalesReturn();
      if (e.target.name === "searchCustomer" && e.target.value !== "") {
        filterCustomer(e.target.value);
      } else clearFilterCustomer();
    }
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (productId === "") {
      setFormData({
        ...formData,
        setAlert: {
          ...setAlert,
          productId: { alert: true, msg: "Choose a product" }
        }
      });
    } else if (salesUsingProduct.length <= 0) {
      setFormData({
        ...formData,
        setAlert: {
          ...setAlert,
          productId: {
            alert: true,
            msg: "No credit sales available with this product"
          }
        }
      });
    } else if (salesId === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, salesId: true } });
    } else {
      setLoading(true);
      await addSalesReturn({
        productId,
        salesId,
        quantity: parseInt(quantity),
        price
      });
      setFormData({
        ...formData,
        price: "",
        productId: "",
        salesId: "",
        search: "",
        searchCustomer: "",
        disabled: false,
        disabledSearchCustomer: false,
        setAlert: {
          productId: { alert: false, msg: "" },
          salesId: false,
          productName: false,
          price: false
        }
      });
      setLoading(false);
    }
  };

  const inititalProductOptions = () => {
    let options = [];
    products.forEach(product => {
      let option = {};
      option.name = `${product.productName} - \u20B9 ${product.perPieceSellingPrice}`;
      option.value = product._id;

      options.push(option);
    });
    return options;
  };

  const initialSalesOptions = () => {
    let options = [];
    // setFormData({ ...setFormData, salesId: "" });
    salesUsingProduct.forEach(sales => {
      let option = {};
      option.name = `${sales.customer.name} - ${convertDate(sales.date)}`;
      option.value = sales._id;

      options.push(option);
    });
    return options;
  };

  return (
    <div className="sales-new-content">
      <div className="heading">Sales Return</div>
      <div className="sales-form">
        <form onSubmit={onSubmit}>
          {products && (
            <Input
              name="search"
              id="salesReturnSearch"
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
              id="productId"
              value={productId}
              first={true}
              alert={setAlert.productId.alert}
              alertMsg={setAlert.productId.msg}
              onChange={onChange}
            />
          )}
          {productId && salesUsingProduct.length > 0 && (
            <Fragment>
              <Input
                name="searchCustomer"
                id="customerSearch"
                label="Search Customer"
                value={searchCustomer}
                min="1"
                disabled={disabledSearchCustomer}
                onChange={onChange}
                helperText="Filter customer by name or mobile"
                required={false}
              />
              <Select
                label="Sales*"
                options={salesOptions ? salesOptions : initialSalesOptions()}
                id="salesId"
                value={salesId}
                first={true}
                alert={setAlert.salesId}
                alertMsg="Choose a sale"
                onChange={onChange}
              />
              {salesId && (
                <Input
                  name="quantity"
                  label="Quantity*"
                  value={quantity}
                  onChange={onChange}
                  type="number"
                  min="1"
                  alert={setAlert.quantity}
                  alertMsg="Quantity is required"
                />
              )}
              <Input
                name="price"
                label="Price"
                value={price}
                onChange={onChange}
                type="number"
                min="1"
                alert={setAlert.price}
                alertMsg="Price is required"
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
  sales: state.transaction.sales,
  purchase: state.transaction.purchase,
  alert: state.alert
});

export default connect(mapStateToProps, {
  getSales,
  getSalesUsingProduct,
  addSalesReturn,
  filterSalesReturn,
  clearFilterSalesReturn,
  filterCustomer,
  clearFilterCustomer,
  Alert,
  clearSalesErrors
})(SalesReturn);
