import {
  // creditors
  ADD_CREDITOR,
  ADD_CREDITOR_FAILED,
  GET_CREDITORS,
  GET_CREDITORS_FAILED,
  GET_CREDITOR,
  GET_CREDITOR_FAILED,
  DELETE_CREDITOR,
  DELETE_CREDITOR_FAILED,
  EDIT_CREDITOR,
  EDIT_CREDITOR_FAILED,

  // purchase
  GET_PURCHASE,
  GET_PURCHASE_FAILED,
  GET_PURCHASE_USING_PRODUCTNAME,
  GET_PURCHASE_USING_PRODUCTNAME_FAILED,
  ADD_PURCHASE_RETURN,
  ADD_PURCHASE_RETURN_FAILED,

  // products
  GET_PRODUCTS,
  GET_PRODUCTS_FAILED,
  GET_PRODUCT,
  GET_PRODUCT_FAILED,
  EDIT_PRODUCT,
  EDIT_PRODUCT_FAILED,
  ADD_NEW_PRODUCT,
  ADD_NEW_PRODUCT_FAILED,
  DELETE_PRODUCT,
  DELETE_PRODUCT_FAILED,

  // errors
  CLEAR_ERRORS,

  // filter purchase
  FILTER_CARDS,
  CLEAR_FILTER_CARDS,
  FILTER_PURCHASE_EXISTING_PRODUCT,
  CLEAR_FILTER_PURCHASE_EXISTING_PRODUCT,
  SAVE_NEW_PURCHASE,
  SAVE_NEW_PURCHASE_FAILED,
  SAVE_EXISTING_PURCHASE,
  SAVE_EXISTING_PURCHASE_FAILED,

  // filter products
  FILTER_EDIT_PRODUCT,
  CLEAR_FILTER_EDIT_PRODUCT,
  FILTER_DELETE_PRODUCT,
  CLEAR_FILTER_DELETE_PRODUCT,
  FILTER_PURCHASE_RETURN,
  CLEAR_FILTER_PURCHASE_RETURN,
  FILTER_PURCHASE,
  CLEAR_FILTER_PURCHASE,

  // customers
  GET_CUSTOMERS,
  GET_CUSTOMERS_FAILED,
  GET_CUSTOMER,
  GET_CUSTOMER_FAILED,
  ADD_CUSTOMER,
  ADD_CUSTOMER_FAILED,
  EDIT_CUSTOMER,
  EDIT_CUSTOMER_FAILED,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_FAILED,

  // sales
  GET_SALES,
  GET_SALES_FAILED,
  ADD_SALES,
  ADD_SALES_FAILED,
  ADD_SALES_RETURN,
  ADD_SALES_RETURN_FAILED,
  GET_SALES_USING_PRODUCTNAME,
  GET_SALES_USING_PRODUCTNAME_FAILED,

  // sales error
  CLEAR_SALES_ERRORS,

  // sales filter
  FILTER_ADD_SALES,
  CLEAR_FILTER_ADD_SALES,
  FILTER_SALES_RETURN,
  CLEAR_FILTER_SALES_RETURN,
  FILTER_CUSTOMER,
  CLEAR_FILTER_CUSTOMER
} from "../actions/types";

const initialState = {
  purchase: {
    purchases: [],
    products: [],
    product: [],
    filtered: {
      productDetails: null,
      purchaseExistingProduct: null,
      editProducts: null,
      deleteProducts: null,
      purchaseReturn: null,
      purchase: null
    },
    purchaseUsingProduct: [],
    purchaseReturn: [],
    error: null,
    creditors: [],
    creditor: []
  },
  sales: {
    customers: [],
    customer: [],
    sales: [],
    filtered: {
      addSale: null,
      saleReturn: null,
      sale: null
    },
    salesUsingProduct: [],
    salesReturn: [],
    error: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    // ----------------------------------------------PURCHASE----------------------------------------------

    // creditors
    case GET_CREDITORS:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          creditors: action.payload
        }
      };
    case GET_CREDITOR:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          creditor: action.payload
        }
      };
    case ADD_CREDITOR:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          creditors: [action.payload, ...state.purchase.creditors]
        }
      };
    case EDIT_CREDITOR:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          creditors: state.purchase.creditors.map(creditor => {
            if (creditor._id === action.payload._id) {
              return (creditor = action.payload);
            } else {
              return creditor;
            }
          }),
          creditor:
            state.purchase.creditor._id === action.payload._id
              ? action.payload
              : state.purchase.creditor
        }
      };
    case DELETE_CREDITOR:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          creditors: state.purchase.creditors.filter(
            creditor => creditor._id !== action.payload
          )
        }
      };

    // products
    case GET_PRODUCTS:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          products: action.payload
        }
      };
    case GET_PRODUCT:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          product: action.payload
        }
      };
    case ADD_NEW_PRODUCT:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          products: [action.payload, ...state.purchase.products]
        }
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          products: state.purchase.products.map(product => {
            if (product._id === action.payload._id) {
              return (product = action.payload);
            } else {
              return product;
            }
          }),
          product:
            state.purchase.product._id === action.payload._id
              ? action.payload
              : state.purchase.product
        }
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          products: state.purchase.products.filter(
            product => product._id !== action.payload
          )
        }
      };
    case FILTER_CARDS:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          filtered: {
            ...state.purchase.filtered,
            productDetails: state.purchase.products.filter(product => {
              const regex = new RegExp(`${action.payload}`, "gi");
              return product.productName.match(regex);
            })
          }
        }
      };

    // filters
    case FILTER_PURCHASE_EXISTING_PRODUCT:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          filtered: {
            ...state.purchase.filtered,
            purchaseExistingProduct: state.purchase.products.filter(product => {
              const regex = new RegExp(`${action.payload}`, "gi");
              return product.productName.match(regex);
            })
          }
        }
      };
    case FILTER_EDIT_PRODUCT:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          filtered: {
            ...state.purchase.filtered,
            editProducts: state.purchase.products.filter(product => {
              const regex = new RegExp(`${action.payload}`, "gi");
              return product.productName.match(regex);
            })
          }
        }
      };
    case FILTER_DELETE_PRODUCT:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          filtered: {
            ...state.purchase.filtered,
            deleteProducts: state.purchase.products.filter(product => {
              const regex = new RegExp(`${action.payload}`, "gi");
              return product.productName.match(regex);
            })
          }
        }
      };
    case FILTER_PURCHASE:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          filtered: {
            ...state.purchase.filtered,
            purchase: state.purchase.purchaseUsingProduct.filter(purchase => {
              const regex = new RegExp(`${action.payload}`, "gi");
              return (
                purchase.creditor.name.match(regex) ||
                purchase.creditor.contact.match(regex)
              );
            })
          }
        }
      };
    case FILTER_PURCHASE_RETURN:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          filtered: {
            ...state.purchase.filtered,
            purchaseReturn: state.purchase.products.filter(product => {
              const regex = new RegExp(`${action.payload}`, "gi");
              return product.productName.match(regex);
            })
          }
        }
      };
    case CLEAR_FILTER_CARDS:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          filtered: { ...state.purchase.filtered, productDetails: null }
        }
      };
    case CLEAR_FILTER_PURCHASE_EXISTING_PRODUCT:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          filtered: {
            ...state.purchase.filtered,
            purchaseExistingProduct: null
          }
        }
      };
    case CLEAR_FILTER_EDIT_PRODUCT:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          filtered: { ...state.purchase.filtered, editProducts: null }
        }
      };
    case CLEAR_FILTER_DELETE_PRODUCT:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          filtered: { ...state.purchase.filtered, deleteProducts: null }
        }
      };
    case CLEAR_FILTER_PURCHASE_RETURN:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          filtered: { ...state.purchase.filtered, purchaseReturn: null }
        }
      };
    case CLEAR_FILTER_PURCHASE:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          filtered: { ...state.purchase.filtered, purchase: null }
        }
      };

    // purchase
    case GET_PURCHASE:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          purchases: action.payload
        }
      };
    case GET_PURCHASE_USING_PRODUCTNAME:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          purchaseUsingProduct: action.payload
        }
      };
    case SAVE_NEW_PURCHASE:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          purchases: [action.payload.newPurchase, ...state.purchase.purchases],
          products: [action.payload.newProduct, ...state.purchase.products]
        }
      };
    case SAVE_EXISTING_PURCHASE:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          purchases: [action.payload.res, ...state.purchase.purchases],
          products: state.purchase.products.map(product => {
            if (product._id === action.payload.productId) {
              return {
                ...product,
                numberInStock:
                  product.numberInStock + action.payload.res.quantity
              };
            } else {
              return product;
            }
          })
        }
      };
    case ADD_PURCHASE_RETURN:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          purchaseReturn: action.payload.res,
          products: state.purchase.products.map(product => {
            if (product._id === action.payload.productId)
              return {
                ...product,
                numberInStock:
                  product.numberInStock - action.payload.res.quantity
              };
            else return product;
          })
        }
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          error: null
        }
      };

    // failed
    case SAVE_NEW_PURCHASE_FAILED:
    case SAVE_EXISTING_PURCHASE_FAILED:
    case GET_CREDITORS_FAILED:
    case GET_CREDITOR_FAILED:
    case ADD_CREDITOR_FAILED:
    case EDIT_CREDITOR_FAILED:
    case DELETE_CREDITOR_FAILED:
    case GET_PURCHASE_FAILED:
    case GET_PRODUCTS_FAILED:
    case GET_PRODUCT_FAILED:
    case ADD_NEW_PRODUCT_FAILED:
    case EDIT_PRODUCT_FAILED:
    case DELETE_PRODUCT_FAILED:
    case GET_PURCHASE_USING_PRODUCTNAME_FAILED:
    case ADD_PURCHASE_RETURN_FAILED:
      return {
        ...state,
        purchase: {
          ...state.purchase,
          error: action.payload
        }
      };

    // -------------------------------------------SALES-----------------------------------------------

    // customers
    case GET_CUSTOMERS:
      return {
        ...state,
        sales: {
          ...state.sales,
          customers: action.payload
        }
      };
    case GET_CUSTOMER:
      return {
        ...state,
        sales: {
          ...state.sales,
          customer: action.payload
        }
      };
    case ADD_CUSTOMER:
      return {
        ...state,
        sales: {
          ...state.sales,
          customers: [action.payload, ...state.sales.customers]
        }
      };
    case EDIT_CUSTOMER:
      return {
        ...state,
        sales: {
          ...state.sales,
          customers: state.customers.map(customer => {
            if (customer._id === action.payload._id) {
              return (customer = action.payload);
            } else {
              return customer;
            }
          }),
          customer:
            state.customer._id === action.payload._id
              ? action.payload
              : state.customer
        }
      };
    case DELETE_CUSTOMER:
      return {
        ...state,
        sales: {
          ...state.sales,
          customers: state.customers.filter(
            customer => customer._id !== action.payload
          )
        }
      };

    // sales
    case GET_SALES:
      return {
        ...state,
        sales: {
          ...state.sales,
          sales: action.payload
        }
      };
    case ADD_SALES:
      return {
        ...state,
        sales: {
          ...state.sales,
          sales: [action.payload.res, ...state.sales.sales]
        },
        purchase: {
          ...state.purchase,
          products: state.purchase.products.map(product => {
            if (product._id === action.payload.productId)
              return {
                ...product,
                numberInStock:
                  product.numberInStock - action.payload.res.quantity
              };
            else return product;
          })
        }
      };
    case ADD_SALES_RETURN:
      return {
        ...state,
        sales: {
          ...state.sales,
          salesReturn: action.payload.res,
          products: state.purchase.products.map(product => {
            if (product._id === action.payload.productId)
              return {
                ...product,
                numberInStock:
                  product.numberInStock - action.payload.res.quantity
              };
            else return product;
          })
        }
      };
    case GET_SALES_USING_PRODUCTNAME:
      return {
        ...state,
        sales: {
          ...state.sales,
          salesUsingProduct: action.payload
        }
      };

    // filter sales
    case FILTER_ADD_SALES:
      return {
        ...state,
        sales: {
          ...state.sales,
          filtered: {
            ...state.sales.filtered,
            addSale: state.purchase.products.filter(product => {
              const regex = new RegExp(`${action.payload}`, "gi");
              return product.productName.match(regex);
            })
          }
        }
      };
    case CLEAR_FILTER_ADD_SALES:
      return {
        ...state,
        sales: {
          ...state.sales,
          filtered: { ...state.sales.filtered, addSale: null }
        }
      };
    case FILTER_SALES_RETURN:
      return {
        ...state,
        sales: {
          ...state.sales,
          filtered: {
            ...state.sales.filtered,
            saleReturn: state.purchase.products.filter(product => {
              const regex = new RegExp(`${action.payload}`, "gi");
              return product.productName.match(regex);
            })
          }
        }
      };
    case CLEAR_FILTER_SALES_RETURN:
      return {
        ...state,
        sales: {
          ...state.sales,
          filtered: { ...state.sales.filtered, saleReturn: null }
        }
      };
    case FILTER_CUSTOMER:
      return {
        ...state,
        sales: {
          ...state.sales,
          filtered: {
            ...state.sales.filtered,
            sale: state.sales.salesUsingProduct.filter(sale => {
              const regex = new RegExp(`${action.payload}`, "gi");
              return (
                sale.customer.name.match(regex) ||
                sale.customer.mobile.match(regex)
              );
            })
          }
        }
      };
    case CLEAR_FILTER_CUSTOMER:
      return {
        ...state,
        sales: {
          ...state.sales,
          filtered: { ...state.sales.filtered, sale: null }
        }
      };

    // error
    case CLEAR_SALES_ERRORS:
      return {
        ...state,
        sales: {
          ...state.sales,
          error: null
        }
      };

    // failed
    case GET_CUSTOMER_FAILED:
    case GET_CUSTOMERS_FAILED:
    case ADD_CUSTOMER_FAILED:
    case EDIT_CUSTOMER_FAILED:
    case DELETE_CUSTOMER_FAILED:
    case ADD_SALES_FAILED:
    case ADD_SALES_RETURN_FAILED:
    case GET_SALES_USING_PRODUCTNAME_FAILED:
    case GET_SALES_FAILED:
      return {
        ...state,
        sales: {
          ...state.sales,
          error: action.payload
        }
      };
    default:
      return state;
  }
};
