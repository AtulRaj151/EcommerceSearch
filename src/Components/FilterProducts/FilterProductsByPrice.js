import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { connect } from "react-redux";
import { filterValueByPrice } from "../../action";
const useStyles = makeStyles({
  root: {
    width: 200,
  },
});

function valuetext(value) {
  return `${value}°₹`;
}

function useAsyncState(initialValue) {
  const [value, setValue] = React.useState(initialValue);
  const setter = (x) =>
    new Promise((resolve) => {
      setValue(x);
      resolve(x);
    });
  return [value, setter];
}

function FilterProductsByPrice(props) {
  const classes = useStyles();
  const [value, setValue] = useAsyncState([0, 100000]);

  const handleChange = (event, newValue) => {
    setValue(newValue).then((value) => {
      props.dispatch(filterValueByPrice(value));
    });
  };
  props.sendData(value);
  return (
    <div className={classes.root}>
      <Typography style={{ color: "#35BDD0" }} id="range-slider" gutterBottom>
        Price Range
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        min={100}
        max={10000}
      />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    products: state.products,
    filter: state.filter,
  };
}

export default connect(mapStateToProps)(FilterProductsByPrice);
