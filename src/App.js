import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import ProductCard from "./Components/ProductCard";

import SearchBar from "./Components/SearchBar";
function App() {
  return (
    <div>
      <CssBaseline />
      <SearchBar />
      <div style={{ display: "flex" }}>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </div>
  );
}

export default App;
