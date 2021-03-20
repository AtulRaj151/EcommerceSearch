import { combineReducers } from "redux";
import {
  ADD_FILTER_PRODUCT_BY_BRAND,
  ADD_FILTER_PRODUCT_BY_CATEGORY,
  ADD_PRODUCT_LIST,
} from "../action/actionTypes";

const initialState = {
  products: [],
  search: [],
  brands: [],
  category: [],
  filter: [],
  price: [],
  isFilter: false,
  isSearch: false,
};
export default function products(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_LIST:
      //   console.log(action.products, "reducer prodcuts");
      return {
        products: action.products,
        isFilter: false,
        isSearch: false,
      };
    case ADD_FILTER_PRODUCT_BY_BRAND:
      return {
        ...state,
        brands: action.filter,
      };
    case ADD_FILTER_PRODUCT_BY_CATEGORY:
      return {
        ...state,
        category: action.filter,
      };
    case "ADD_FILTER_BY_PRICE":
      return {
        ...state,
        price: action.price,
      };
    case "APPEND_FILTER_LIST":
      return {
        ...state,
        filter: action.products,
        isFilter: true,
      };
    case "SEARCH_PRODUCTS":
      return {
        ...state,
        search: action.text,
        isSearch: true,
      };

    default:
      return state;
  }
}
