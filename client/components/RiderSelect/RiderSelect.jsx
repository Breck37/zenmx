import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
    maxWidth: "100%",
  },
}));

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const RiderSelect = ({ options, selectLabel, onChange, riderPosition }) => {
  const [riderName, setRiderName] = useState("");
  const classes = useStyles();
  const theme = useTheme();

  const handleRiderSelection = (riderEvent) => {
    const riderName = riderEvent.target.value;
    setRiderName(riderName);
    onChange(riderName, riderPosition);
  };
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={selectLabel}>{selectLabel}</InputLabel>
      <Select
        labelId={selectLabel}
        name=""
        id="select"
        value={riderName}
        onChange={handleRiderSelection}
      >
        {options.map((riderOption) => {
          return (
            <MenuItem
              key={riderOption.name}
              style={getStyles(riderOption.name, riderName, theme)}
              value={riderOption.name}
            >
              {riderOption.name}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default RiderSelect;
