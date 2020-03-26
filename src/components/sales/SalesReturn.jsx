import React, { useState, useEffect, Fragment } from "react";
import { Input } from "../common/Input";
import { Select } from "../common/Select";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import {
  getSales,
  getSalesUsingProduct,
  addSalesReturn,
  clearSalesErrors,
  clearMsg
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
  msg,
  getSales,
  getSalesUsingProduct,
  addSalesReturn,
  Alert,
  clearMsg,
  clearSalesErrors
}) => {
  const [formData, setFormData] = useState({
    price: "",
    productId: "",
    salesId: "",
    quantity: "",
    setAlert: {
      productId: { alert: false, msg: "" },
      salesId: false,
      productName: false,
      price: false
    }
  });
  const { price, productId, salesId, quantity, setAlert } = formData;

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
            setAlert: { ...setAlert, productId: { alert: false, msg: "" } }
          });
          if (productId && salesId) {
            // setFormData({ ...formData, purchaseId: "" });
            salesUsingProduct.filter(
              p =>
                p._id === salesId &&
                setFormData({
                  ...formData,
                  quantity: p.quantity
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
    if (msg) {
      Alert(msg, "info");
      clearMsg();
      setFormData({
        ...formData,
        price: "",
        productId: "",
        salesId: "",
        setAlert: {
          productId: { alert: false, msg: "" },
          salesId: false,
          productName: false,
          price: false
        }
      });
    }

    //eslint-disable-next-line
  }, [productId, salesId, error, msg]);

  useEffect(() => {
    if (saleReturn) {
      let options = [];
      saleReturn.forEach(product => {
        let option = {};
        option.key = `${product.productName} - \u20B9 ${product.perPieceSellingPrice}`;
        option.value = product._id;
        option.text = `${product.productName} - \u20B9 ${product.perPieceSellingPrice}`;

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
    }
  };

  const onProductChange = (e, { value }) => {
    setFormData({ ...formData, productId: value });
  };

  const onSaleChange = (e, { value }) => {
    setFormData({ ...formData, salesId: value });
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

      setLoading(false);
    }
  };

  const inititalProductOptions = () => {
    let options = [];
    products.forEach(product => {
      let option = {};
      option.key = `${product.productName} - \u20B9 ${product.perPieceSellingPrice}`;
      option.value = product._id;
      option.text = `${product.productName} - \u20B9 ${product.perPieceSellingPrice}`;

      options.push(option);
    });
    return options;
  };

  const initialSalesOptions = () => {
    let options = [];

    salesUsingProduct.forEach(sales => {
      let option = {};
      option.key = `${sales.customer.name} - ${convertDate(
        sales.date
      )}${Math.random()}`;
      option.value = sales._id;
      option.text = `${sales.customer.name} - ${convertDate(sales.date)}`;

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
            <Select
              label="Product*"
              options={inititalProductOptions()}
              id="productId"
              value={productId}
              first={true}
              alert={setAlert.productId.alert}
              alertMsg={setAlert.productId.msg}
              onChange={onProductChange}
            />
          )}
          {productId && salesUsingProduct.length > 0 && (
            <Fragment>
              <Select
                label="Sales*"
                options={initialSalesOptions()}
                id="salesId"
                value={salesId}
                first={true}
                alert={setAlert.salesId}
                alertMsg="Choose a sale"
                onChange={onSaleChange}
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
  msg: state.transaction.msg,
  alert: state.alert
});

export default connect(mapStateToProps, {
  getSales,
  getSalesUsingProduct,
  addSalesReturn,
  Alert,
  clearMsg,
  clearSalesErrors
})(SalesReturn);
