import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ProductCard from "./Components/ProductCard";
import React from "react";

import SearchBar from "./Components/SearchBar";
import FilterProducts from "./Components/FilterProducts/FilterProductsByBrands";
import FilterProductByCategory from "./Components/FilterProducts/FilterProductByCategory";
import FilterProductsByPrice from "./Components/FilterProducts/FilterProductsByPrice";
class App extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
  }
  componentDidMount() {
    const url =
      "https://my-json-server.typicode.com/AtulRaj151/ecommerce-data/db";
    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data.products }));
  }
  render() {
    const { products } = this.state;
    console.log(products);
    return (
      <div>
        <SearchBar />
        <div className="search-filter">
          <FilterProducts />
          <FilterProductByCategory />
          <FilterProductsByPrice />
        </div>
        <div className="card-container" style={{ display: "flex" }}>
          {products.map((product, index) => (
            <ProductCard product={product} key={`product${index}`} />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
