import React, { useMemo, useState } from "react";
import {
  IconButton,
  SwipeableDrawer,
  Typography,
  FormLabel,
  TextField,
  FormGroup,
  Divider,
  Button,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";
import "./FilterDrawer.scss";

const FilterDrawer = ({ open, toggleDrawer, filters, handleApply }) => {
  const [name, setName] = useState(filters.name ?? "");
  const [minRating, setMinRating] = useState(filters.minRating ?? 3);
  const [minPortions, setMinPortions] = useState(filters.minPortions ?? 2);

  const newFilters = useMemo(() => {
    return {
      name,
      minRating,
      minPortions,
    };
  });

  return (
    <SwipeableDrawer
      anchor={"left"}
      open={open}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
    >
      <div className="FilterDrawer">
        <IconButton
          className="FilterDrawer_CloseIcon"
          onClick={() => toggleDrawer(false)}
        >
          <CloseIcon color="primary" />
        </IconButton>
        <Typography variant="h5">Filter recipes</Typography>
        <Divider />

        <FormGroup>
          <FormLabel style={{ marginTop: "8px" }}>Search by name:</FormLabel>
          <TextField
            defaultValue={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <FormLabel style={{ marginTop: "8px" }}>
            Rating greater than:
          </FormLabel>
          <TextField
            type="number"
            defaultValue={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            inputProps={{ max: 5, min: 0, step: 0.1 }}
          />
        </FormGroup>

        <FormGroup>
          <FormLabel style={{ marginTop: "8px" }}>Min portions:</FormLabel>
          <TextField
            type="number"
            defaultValue={minPortions}
            onChange={(e) => setMinPortions(Number(e.target.value))}
            inputProps={{ max: 10, min: 1, step: 1 }}
          />
        </FormGroup>
        <div>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "16px" }}
            onClick={() => {
              handleApply(newFilters);
              toggleDrawer(false);
            }}
          >
            Apply
          </Button>
        </div>
      </div>
    </SwipeableDrawer>
  );
};

export default FilterDrawer;
