import React, { useState, useEffect, Fragment } from "react";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import {
  getProduct,
  editProduct,
  filterEditProduct,
  clearEditProductFilter
} from "../../actions/purchaseAction";
import { Select } from "../common/Select";

const EditProduct = ({
  purchase: {
    products,
    filtered: { editProducts }
  },
  getProduct,
  editProduct,
  filterEditProduct,
  clearEditProductFilter
}) => {
  const [formData, setFormData] = useState({
    productName: "",
    perPieceCost: "",
    perPieceSellingPrice: "",
    productId: "",
    search: "",
    disabled: false,
    productOptions: null,
    setAlert: {
      productId: false,
      productName: false,
      perPieceCost: false,
      perPieceSellingPrice: false
    }
  });
  const {
    productName,
    perPieceCost,
    perPieceSellingPrice,
    productId,
    productOptions,
    search,
    disabled,
    setAlert
  } = formData;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editProducts) {
      let options = [];
      editProducts.forEach(product => {
        let option = {};
        option.name = `${product.productName} - \u20B9 ${product.perPieceSellingPrice}`;
        option.value = product._id;

        options.push(option);
      });
      setFormData({ ...formData, productOptions: options });
    }
    if (!editProducts) {
      setFormData({ ...formData, productOptions: null });
    }

    //eslint-disable-next-line
  }, [editProducts]);

  useEffect(() => {
    if (productId) {
      getProduct(productId);
      products.filter(
        p =>
          p._id === productId &&
          setFormData({
            ...formData,
            productName: p.productName,
            perPieceCost: p.perPieceCost,
            perPieceSellingPrice: p.perPieceSellingPrice,
            disabled: true
          })
      );
    } else {
      setFormData({ ...formData, disabled: false });
    }

    //eslint-disable-next-line
  }, [productId]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "search" && e.target.value !== "") {
      filterEditProduct(e.target.value);
    } else clearEditProductFilter();
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (productId === "") {
      setFormData({ ...formData, setAlert: { ...setAlert, productId: true } });
    } else {
      setLoading(true);
      await editProduct(
        {
          productName,
          perPieceCost: parseInt(perPieceCost),
          perPieceSellingPrice: parseInt(perPieceSellingPrice)
        },
        productId
      );
      setFormData({
        ...formData,
        productId: "",
        productName: "",
        perPieceCost: "",
        perPieceSellingPrice: "",
        disabled: false,
        search: "",
        setAlert: { name: false, contact: false }
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

  return (
    <div className="purchase-new-content">
      <div className="heading">Edit Product</div>
      <div className="purchase-form">
        <form onSubmit={onSubmit}>
          {products && (
            <Input
              name="search"
              label="Search Product"
              value={search}
              disabled={disabled}
              min="1"
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
          {productId && (
            <Fragment>
              <Input
                name="productName"
                label="Product Name"
                value={productName}
                onChange={onChange}
                alert={setAlert.productName}
                alertMsg="Product name is required"
              />
              <Input
                name="perPieceCost"
                label="per Piece Cost"
                value={perPieceCost}
                onChange={onChange}
                type="number"
                min="1"
                alert={setAlert.perPieceCost}
                alertMsg="Cost price is required"
              />
              <Input
                name="perPieceSellingPrice"
                label="Per Piece Selling Price"
                value={perPieceSellingPrice}
                onChange={onChange}
                type="number"
                min="1"
                alert={setAlert.perPieceSellingPrice}
                alertMsg="Selling price is required"
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
  purchase: state.purchase
});

export default connect(mapStateToProps, {
  getProduct,
  editProduct,
  filterEditProduct,
  clearEditProductFilter
})(EditProduct);
