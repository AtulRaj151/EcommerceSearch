import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ProductCard from "./Components/ProductCard";
import React from "react";
import { Typography } from "@material-ui/core";

import SearchBar from "./Components/SearchBar";
import FilterProducts from "./Components/FilterProducts/FilterProductsByBrands";
import FilterProductByCategory from "./Components/FilterProducts/FilterProductByCategory";
import FilterProductsByPrice from "./Components/FilterProducts/FilterProductsByPrice";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [], items: 3, LoadingState: false };
  }
  componentDidMount() {
    this.getProductList();
    this.onInfiniteScroll();
  }
  getProductList = () => {
    console.log("GetProductList is running");
    const url =
      "https://my-json-server.typicode.com/AtulRaj151/ecommerce-data/db";
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data.products }));
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
    const { products } = this.state;
    console.log(products);
    return (
      <div ref="iScroll">
        <SearchBar />
        <div className="search-filter">
          <h3 style={{ color: "#35BDD0" }}>Filter</h3>
          <div className="filter-container">
            <FilterProducts className="filter-brand" />
            <FilterProductByCategory className="filter-category" />
            <FilterProductsByPrice className="filter-price" />
          </div>
        </div>
        <div className="card-container" style={{ display: "flex" }}>
          {products.slice(0, this.state.items).map((product, index) => (
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

export default App;
