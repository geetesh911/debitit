import React, { useState, useEffect } from "react";
import { SaveButton } from "../common/SaveButton";
import { Input } from "./../common/Input";
import { connect } from "react-redux";
import { Select } from "../common/Select";
import {
  deleteProduct,
  filterDeleteProduct,
  clearDeleteProductFilter
} from "./../../actions/purchaseAction";

const DeleteProduct = ({
  purchase: {
    products,
    filtered: { deleteProducts }
  },
  deleteProduct,
  filterDeleteProduct,
  clearDeleteProductFilter
}) => {
  const [formData, setFormData] = useState({
    productId: "",
    search: "",
    disabled: false,
    productOptions: null,
    setAlert: {
      productId: false
    }
  });
  const { productId, search, productOptions, disabled, setAlert } = formData;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (deleteProducts) {
      let options = [];
      deleteProducts.forEach(product => {
        let option = {};
        option.name = `${product.productName} - \u20B9 ${product.perPieceSellingPrice}`;
        option.value = product._id;

        options.push(option);
      });
      setFormData({ ...formData, productOptions: options });
    }
    if (!deleteProducts) {
      setFormData({ ...formData, productOptions: null });
    }

    //eslint-disable-next-line
  }, [deleteProducts]);

  useEffect(() => {
    if (productId)
      setFormData({
        ...formData,
        disabled: true
      });
    else {
      setFormData({ ...formData, disabled: false });
    }
    //eslint-disable-next-line
  }, [productId]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "search" && e.target.value !== "") {
      filterDeleteProduct(e.target.value);
    } else clearDeleteProductFilter();
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (productId === "")
      setFormData({ ...formData, setAlert: { ...setAlert, productId: true } });
    else {
      setLoading(true);

      await deleteProduct(productId);

      setLoading(false);

      setFormData({
        ...formData,
        productId: "",
        search: "",
        disabled: false,
        setAlert: { productId: false }
      });
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

  return (
    <div className="purchase-new-content">
      <div className="heading">Delete product</div>
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
              id="productId"
              value={productId}
              first={true}
              alert={setAlert.productId}
              alertMsg="Choose a product"
              onChange={onChange}
            />
          )}
          <SaveButton label="Delete" loading={loading} />
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  purchase: state.transaction.purchase
});

export default connect(mapStateToProps, {
  deleteProduct,
  filterDeleteProduct,
  clearDeleteProductFilter
})(DeleteProduct);
