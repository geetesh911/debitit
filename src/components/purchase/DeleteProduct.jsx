import React, { useState, useEffect } from "react";
import { SaveButton } from "../common/SaveButton";
import { connect } from "react-redux";
import { Select } from "../common/Select";
import { deleteProduct } from "./../../actions/purchaseAction";
import { clearMsg } from "./../../actions/salesAction";
import { setAlert as Alert } from "./../../actions/alertAction";

const DeleteProduct = ({
  purchase: { products },
  msg,
  Alert,
  clearMsg,
  deleteProduct
}) => {
  const [formData, setFormData] = useState({
    productId: "",
    setAlert: {
      productId: false
    }
  });
  const { productId, setAlert } = formData;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (msg) {
      Alert(msg, "info");
      clearMsg();

      setFormData({
        ...formData,
        productId: "",
        setAlert: { productId: false }
      });
    }

    //eslint-disable-next-line
  }, [msg]);

  const onProductChange = (e, { value }) => {
    setFormData({
      ...formData,
      productId: value
    });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (productId === "")
      setFormData({ ...formData, setAlert: { ...setAlert, productId: true } });
    else {
      setLoading(true);

      await deleteProduct(productId);

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
      <div className="heading">Delete product</div>
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
          <SaveButton label="Delete" loading={loading} />
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
  deleteProduct,
  Alert,
  clearMsg
})(DeleteProduct);
