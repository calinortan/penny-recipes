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
  Chip,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

import { without, uniq } from "lodash";

import "./FilterDrawer.scss";

const FilterDrawer = ({ open, toggleDrawer, filters, handleApply }) => {
  const [name, setName] = useState(filters.name ?? "");
  const [minRating, setMinRating] = useState(filters.minRating ?? 3);
  const [minPortions, setMinPortions] = useState(filters.minPortions ?? 2);
  const [tags, setTags] = useState(filters.tags);
  const [tagInput, setTagInput] = useState("");

  const [ingredients, setIngredients] = useState(filters.ingredients);
  const [ingredientsInput, setIngredientsInput] = useState("");

  const newFilters = useMemo(() => {
    return {
      name,
      minRating,
      minPortions,
      tags,
      ingredients,
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

        <FormGroup>
          <FormLabel style={{ marginTop: "8px" }}>Tags:</FormLabel>
          <div className="FilterDrawer_Chips">
            {tags.map((tag) => {
              return (
                <Chip
                  label={tag}
                  key={tag}
                  onDelete={() => setTags(without(tags, tag))}
                  color="primary"
                />
              );
            })}
            <Chip
              color="primary"
              variant="outlined"
              icon={
                <AddIcon
                  onClick={() => {
                    setTags(uniq([...tags, tagInput]));
                    setTagInput("");
                  }}
                />
              }
              label={
                <input
                  className="ChipInput"
                  placeholder="Add tag"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setTags(uniq([...tags, e.target.value]));
                      setTagInput("");
                    }
                  }}
                />
              }
            ></Chip>
          </div>
        </FormGroup>

        <FormGroup>
          <FormLabel style={{ marginTop: "8px" }}>Ingredients:</FormLabel>
          <div className="FilterDrawer_Chips">
            {ingredients.map((ing) => {
              return (
                <Chip
                  label={ing}
                  key={ing}
                  onDelete={() => setIngredients(without(ingredients, ing))}
                  color="primary"
                />
              );
            })}
            <Chip
              color="primary"
              variant="outlined"
              icon={
                <AddIcon
                  onClick={() => {
                    setIngredients(uniq([...ingredients, ingredientsInput]));
                    setIngredientsInput("");
                  }}
                />
              }
              label={
                <input
                  className="ChipInput"
                  placeholder="Add"
                  value={ingredientsInput}
                  onChange={(e) => setIngredientsInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setIngredients(uniq([...ingredients, e.target.value]));
                      setIngredientsInput("");
                    }
                  }}
                />
              }
            ></Chip>
          </div>
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
