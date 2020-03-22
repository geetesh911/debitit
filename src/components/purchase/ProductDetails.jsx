import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { filterProduct, clearFilterCards } from "../../actions/purchaseAction";
import { setAlert as Alert } from "../../actions/alertAction";
import { Input } from "../common/Input";
import { VerticalTable } from "../common/VerticalTable";
import { SaveButton } from "../common/SaveButton";

const ProductDetails = ({
  purchase: {
    products,
    filtered: { productDetails }
  },
  filterProduct,
  clearFilterCards,
  Alert
}) => {
  const [formData, setFormData] = useState({
    search: "",
    showCards: false,
    setAlert: {
      productId: false,
      productName: false,
      perPieceSellingPrice: false,
      numberInStock: false,
      search: false
    }
  });
  const { search, showCards, setAlert } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (productDetails && productDetails.length === 0) {
      Alert("No product Found with the given name", "info");
    }
    //eslint-disable-next-line
  }, [productDetails]);

  const onSubmit = async e => {
    e.preventDefault();

    if (search !== "") {
      setFormData({ ...formData, showCards: true });
      await filterProduct(search);
    } else {
      setFormData({
        ...formData,
        showCards: false
      });
      clearFilterCards();
    }
  };

  return (
    <div className="purchase-new-content">
      <div className="heading">Product Details</div>
      <div className="purchase-form">
        <form onSubmit={onSubmit}>
          {products && (
            <Input
              name="search"
              label="Product"
              value={search}
              min="1"
              onChange={onChange}
              alert={setAlert.search}
              alertMsg="Product is required"
            />
          )}
          <SaveButton label="Get Product" />
          {showCards &&
            productDetails &&
            productDetails.map(product => (
              <VerticalTable
                key={product._id}
                data={[
                  {
                    heading: "Product Name",
                    data: [product.productName]
                  },
                  {
                    heading: "Stock",
                    data: [
                      `${product.numberInStock} ${
                        product.numberInStock > 1 ? "units" : "unit"
                      }`
                    ]
                  },
                  {
                    heading: "Price",
                    data: [`\u20B9 ${product.perPieceSellingPrice}`]
                  }
                ]}
              />
            ))}
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  purchase: state.purchase
});

export default connect(mapStateToProps, {
  filterProduct,
  clearFilterCards,
  Alert
})(ProductDetails);
