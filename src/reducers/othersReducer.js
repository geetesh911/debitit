import {
  GET_CATEGORY,
  GET_CATEGORY_FAILED,
  GET_CATEGORIES,
  GET_CATEGORIES_FAILED,
  ADD_CATEGORY,
  ADD_CATEGORY_FAILED,
  EDIT_CATEGORY,
  EDIT_CATEGORY_FAILED,
  DELETE_CATEGORY,
  DELETE_CATEGORY_FAILED,
  GET_EXPENSES,
  GET_EXPENSES_FAILED,
  ADD_EXPENSE,
  ADD_EXPENSE_FAILED,
  ADD_DRAWINGS,
  ADD_DRAWINGS_FAILED,
  CLEAR_OTHERS_MSG,
  CLEAR_OTHERS_ERROR
} from "../actions/types";

const initialState = {
  category: null,
  categories: [],
  expenses: [],
  drawings: [],
  msg: null,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [action.payload.newCategory, ...state.categories],
        expenses: [action.payload.newExpense, ...state.expenses],
        msg: "Category and Expense Added"
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(category => {
          if (category._id === action.payload._id) {
            return (category = action.payload);
          } else {
            return category;
          }
        }),
        msg: "Category Updated"
      };
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          category => category._id !== action.payload
        ),
        msg: "Category Deleted"
      };
    case CLEAR_OTHERS_MSG:
      return {
        ...state,
        msg: null
      };

    case GET_EXPENSES:
      return {
        ...state,
        expenses: action.payload
      };
    case ADD_EXPENSE:
      return {
        ...state,
        expenses: [action.payload, ...state.expenses],
        msg: "Expense Added"
      };
    case ADD_DRAWINGS:
      return {
        ...state,
        drawings: [action.payload, ...state.expenses],
        msg: "Drawings Added"
      };

    case CLEAR_OTHERS_ERROR:
      return {
        ...state,
        error: null
      };

    case GET_CATEGORY_FAILED:
    case GET_CATEGORIES_FAILED:
    case ADD_CATEGORY_FAILED:
    case EDIT_CATEGORY_FAILED:
    case DELETE_CATEGORY_FAILED:
    case GET_EXPENSES_FAILED:
    case ADD_EXPENSE_FAILED:
    case ADD_DRAWINGS_FAILED:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};
