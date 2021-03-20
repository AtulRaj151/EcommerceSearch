import React, { Component } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import { connect } from "react-redux";
import { addFilterByBrand, filterValueByBrand } from "../../action";
import useStateWithCallback from "use-state-with-callback";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const brands = ["adidas", "nike", "puma", "lenovo", "hrx", "bata"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
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

function FilterProducts(props) {
  console.log("this props in filterBrand", props);
  const classes = useStyles();
  const theme = useTheme();
  const [personName, setPersonName] = useAsyncState([]);

  const handleChange = (event) => {
    setPersonName(event.target.value).then((personName) => {
      props.dispatch(filterValueByBrand(personName));
    });
  };
  console.log("props", props);

  return (
    <div className="product-filter">
      <FormControl className={classes.formControl}>
        <InputLabel style={{ color: "#35BDD0" }} id="demo-mutiple-chip-label">
          Brands
        </InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {brands.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    products: state.products,
    filter: state.filter,
  };
}

export default connect(mapStateToProps)(FilterProducts);
