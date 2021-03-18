import { combineReducers } from "redux";
import { ADD_FILTER_PRODUCT, ADD_PRODUCT_LIST } from "../action/actionTypes";

const initialState = {
  products: [],
  search: [],
  filterProducts: [],
  isFilter: false,
  isSearch: false,
  filter: [],
};
export default function products(state = initialState, action) {
  switch (action.type) {
    case ADD_PRODUCT_LIST:
      //   console.log(action.products, "reducer prodcuts");
      return {
        products: action.products,
        filterProducts: action.products,
        isFilter: false,
        isSearch: false,
      };
    case ADD_FILTER_PRODUCT:
      return {
        ...state,
        filterProducts: action.filter,
        isFilter: true,
      };
    default:
      return state;
  }
}
