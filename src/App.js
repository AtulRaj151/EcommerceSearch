import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ProductCard from "./Components/ProductCard";
import React from "react";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";

import SearchBar from "./Components/SearchBar";
import FilterProducts from "./Components/FilterProducts/FilterProductsByBrands";
import FilterProductByCategory from "./Components/FilterProducts/FilterProductByCategory";
import FilterProductsByPrice from "./Components/FilterProducts/FilterProductsByPrice";
import data from "./data.json";
import { fetchProduct, filterValue } from "./action";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: 3,
      LoadingState: false,
    };
  }

  getDataFromBrand = (brand) => {
    const { isSearch, products, search } = this.props;
    if (isSearch) {
      // search
      let data = filterValue(search, brand, "brand");
    } else {
      // products
      let data = filterValue(products, brand, "brand");
      console.log(data);
      this.setState({ products: data });
    }
  };
  // filterValue = (list, filter, value) => {
  //   console.log("list item = ", list);
  //   let found = list.filter((item) => {
  //     console.log("item", item[value], "filter", filter);
  //     for (let i = 0; i < filter.length; i++) {
  //       console.log("item", item[value], "filter = ", filter[i]);
  //       if (item[value] === filter[i]) {
  //         return true;
  //       }
  //     }
  //   });
  //   console.log("found", found);
  //   return found;
  // };
  getDataFromPrice = (price) => {
    console.log(price);
  };
  getDataFromCategory = (cat) => {
    console.log(cat);
  };

  componentDidMount() {
    this.props.dispatch(fetchProduct());
    this.onInfiniteScroll();
  }
  getProductList = () => {
    // console.log("GetProductList is running");
    // const url =
    //   "https://my-json-server.typicode.com/AtulRaj151/ecommerce-data/db";
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((data) => this.setState({ products: data.products }));
    this.setState({ products: data.products });
  };
  onInfiniteScroll = () => {
    this.refs.iScroll.addEventListener("wheel", () => {
      console.log("clicked");
      if (
        this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
        this.refs.iScroll.scrollHeight - 10
      ) {
        this.loadMoreItems();
      }
    });
  };
  loadMoreItems = () => {
    if (this.state.LoadingState) {
      return;
    }
    this.setState({ LoadingState: true });
    setTimeout(() => {
      this.setState((old) => ({ items: old.items + 3, LoadingState: false }));
    }, 1000);
    this.getProductList();
  };

  render() {
    console.log("this props ", this.props);
    const { products, search, isSearch } = this.props;
    const displayItem = isSearch ? search : products;

    console.log(products);
    return (
      <div ref="iScroll">
        <SearchBar />
        <div className="search-filter">
          <h3 style={{ color: "#35BDD0" }}>Filter</h3>
          <div className="filter-container">
            <FilterProducts
              className="filter-brand"
              sendData={this.getDataFromBrand}
            />
            <FilterProductByCategory
              className="filter-category"
              sendData={this.getDataFromCategory}
            />
            <FilterProductsByPrice
              className="filter-price"
              sendData={this.getDataFromPrice}
            />
          </div>
        </div>
        <div className="card-container" style={{ display: "flex" }}>
          {displayItem.slice(0, this.state.items).map((product, index) => (
            <ProductCard product={product} key={`product${index}`} />
          ))}
        </div>
        {this.state.LoadingState ? (
          <p className="loading">
            <Typography
              varient="h6"
              style={{ color: "#00EE00" }}
              display="block"
            >
              Loading...
            </Typography>
          </p>
        ) : (
          ""
        )}
      </div>
    );
  }
}

//  map state to props so that we can connect this component to store
function mapStateToProps(state) {
  return {
    products: state.products,
  };
}

export default connect(mapStateToProps)(App);
