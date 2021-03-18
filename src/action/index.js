import { ADD_PRODUCT_LIST, ADD_FILTER_PRODUCT } from "./actionTypes";
// fetch the movie from api using any search query
export function fetchProduct() {
  const url = `https://my-json-server.typicode.com/AtulRaj151/ecommerce-data/db`;
  //   here it returns dispact the movie into reducer
  return function (dispatch) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log("movies = ", data);

        //dispatch an action
        // dispatch ({ type:'AdD_SEARCH_RESULT,movie})
        dispatch(addProducts(data.products));
      });
  };
}

export function filterValue(list, filter, value) {
  return function (dispatch) {
    console.log("list item = ", filter, "value = ", value);
    let found = list.filter((item) => {
      // console.log("item", item[value], "filter", filter);
      for (let i = 0; i < filter.length; i++) {
        //   console.log("item", item[value], "filter = ", filter[i]);
        if (item[value] === filter[i]) {
          return true;
        }
      }
    });
    console.log("found", found);
    dispatch(addFilter(found));
  };
}
export function addFilter(filter) {
  return {
    type: ADD_FILTER_PRODUCT,
    filter,
  };
}
export function addProducts(products) {
  return {
    type: ADD_PRODUCT_LIST,
    products,
  };
}
