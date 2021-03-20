import {
  ADD_PRODUCT_LIST,
  ADD_FILTER_PRODUCT_BY_BRAND,
  ADD_FILTER_PRODUCT_BY_CATEGORY,
} from "./actionTypes";
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
export function search(text, products) {
  return function (dispatch) {
    let search = products.filter((product) => product.brand == text);
    dispatch(searchProducts(search));
  };
}
export function searchProducts(text) {
  return {
    type: "SEARCH_PRODUCTS",
    text,
  };
}

export function addFilterProduct(brand, category, price, products) {
  console.log(brand, price, category);
  return function (dispatch) {
    let Brand = filterProduct(products, brand, "brand");
    let Category = filterProduct(Brand, category, "category");
    let Price = filterProductUsingPrice(Category, price, "price");
    console.log(Brand, Category, Price, "here is results");
    dispatch(appendFilter(Price));
  };
}

export function appendFilter(products) {
  return {
    type: "APPEND_FILTER_LIST",
    products,
  };
}
function filterProductUsingPrice(list, filter, value) {
  if (filter == undefined || filter.length == 0) {
    return list;
  }
  let found = list.filter((item) => {
    if (item[value] >= filter[0] && item[value] <= filter[1]) {
      return true;
    }
  });

  return found;
}
function filterProduct(list, filter, value) {
  if (filter == undefined || filter.length == 0) {
    return list;
  }
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
  return found;
}

export function filterValueByBrand(filter) {
  return function (dispatch) {
    //   console.log("list item = ", filter, "value = ", value);
    //   let found = list.filter((item) => {
    //     // console.log("item", item[value], "filter", filter);
    //     for (let i = 0; i < filter.length; i++) {
    //       //   console.log("item", item[value], "filter = ", filter[i]);
    //       if (item[value] === filter[i]) {
    //         return true;
    //       }
    //     }
    //   });
    //   console.log("found", found);

    dispatch(addFilterByBrand(filter));
  };
}
export function filterValueByCategory(filter) {
  return function (dispatch) {
    // console.log("list item = ", filter, "value = ", value);
    // let found = list.filter((item) => {
    //   // console.log("item", item[value], "filter", filter);
    //   for (let i = 0; i < filter.length; i++) {
    //     //   console.log("item", item[value], "filter = ", filter[i]);
    //     if (item[value] === filter[i]) {
    //       return true;
    //     }
    //   }
    // });
    // console.log("found", found);
    dispatch(addFilterByCategory(filter));
  };
}

export function filterValueByPrice(value) {
  return function (dispatch) {
    dispatch(addFilterByPrice(value));
  };
}

export function addFilterByBrand(filter) {
  return {
    type: ADD_FILTER_PRODUCT_BY_BRAND,
    filter,
  };
}
export function addFilterByCategory(filter) {
  return {
    type: ADD_FILTER_PRODUCT_BY_CATEGORY,
    filter,
  };
}
export function addFilterByPrice(value) {
  return {
    type: "ADD_FILTER_BY_PRICE",
    price: value,
  };
}
export function addProducts(products) {
  return {
    type: ADD_PRODUCT_LIST,
    products,
  };
}
