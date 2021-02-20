import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
    maxWidth: "100%",
  },
}));

function getStyles(name, personName, theme) {
  if (!name || !personName) {
    return {
      fontWeight: theme.typography.fontWeightMedium,
      fontStyle: "italics",
    };
  }
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const RiderSelect = ({
  options,
  selectLabel,
  onChange,
  riderPosition,
  value,
}) => {
  if (!options) return null;
  const [riderName, setRiderName] = useState("");
  const classes = useStyles();
  const theme = useTheme();

  const handleRiderSelection = (riderEvent) => {
    const riderName = riderEvent.target.value;
    if (!riderName) {
      setRiderName("");
      onChange("", riderPosition);
    }
    setRiderName(riderName);
    onChange(riderName, riderPosition);
  };

  return (
    <FormControl className={classes.formControl} error={value?.error}>
      <InputLabel id={selectLabel}>{selectLabel}</InputLabel>
      <Select
        labelId={selectLabel}
        name=""
        id="select"
        value={riderName}
        onChange={handleRiderSelection}
        className="roboto"
      >
        <MenuItem className="italic-item" value={null}>
          Clear Selection
        </MenuItem>
        {options.map((riderOption) => {
          return (
            <MenuItem
              key={riderOption.name}
              style={getStyles(riderOption.name, riderName, theme)}
              value={riderOption.name}
              className="roboto"
              disabled={riderName === riderOption.name}
            >
              {`#${riderOption.number} - ${riderOption.name}`}
            </MenuItem>
          );
        })}
      </Select>
      {value?.error && <FormHelperText>{value?.error}</FormHelperText>}
    </FormControl>
  );
};

export default RiderSelect;
