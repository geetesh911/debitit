import React, { useState, useEffect, Fragment } from "react";
import { Input } from "../common/Input";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import { getProduct, editProduct } from "../../actions/purchaseAction";
import { clearMsg } from "./../../actions/salesAction";
import { setAlert as Alert } from "../../actions/alertAction";
import { Select } from "../common/Select";

const EditProduct = ({
  purchase: {
    products,
    filtered: { editProducts }
  },
  msg,
  Alert,
  clearMsg,
  getProduct,
  editProduct
}) => {
  const [formData, setFormData] = useState({
    productName: "",
    perPieceCost: "",
    perPieceSellingPrice: "",
    productId: "",
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
    setAlert
  } = formData;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (msg) {
      Alert(msg, "info");
      clearMsg();
      setFormData({
        ...formData,
        productId: "",
        productName: "",
        perPieceCost: "",
        perPieceSellingPrice: "",
        setAlert: { name: false, contact: false }
      });
    }

    //eslint-disable-next-line
  }, [msg]);

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
            perPieceSellingPrice: p.perPieceSellingPrice
          })
      );
    }
    //eslint-disable-next-line
  }, [productId]);

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onProductChange = (e, { value }) => {
    setFormData({
      ...formData,
      productId: value
    });
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

  return (
    <div className="purchase-new-content">
      <div className="heading">Edit Product</div>
      <div className="purchase-form">
        <form onSubmit={onSubmit}>
          {products && (
            <Select
              label="Product*"
              options={inititalProductOptions()}
              id="productId"
              value={productId}
              first={true}
              alert={setAlert.productId}
              alertMsg="Choose a product"
              onChange={onProductChange}
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
  purchase: state.transaction.purchase,
  msg: state.transaction.msg
});

export default connect(mapStateToProps, {
  getProduct,
  editProduct,
  Alert,
  clearMsg
})(EditProduct);
