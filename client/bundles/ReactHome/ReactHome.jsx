import { Typography, AppBar, Toolbar, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import FilterDrawer from "./components/FilterDrawer";
import RecipeList from "./components/RecipeList";
import "./ReactHome.scss";

const queryClient = new QueryClient();

const Home = (props) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    minRating: 3,
    minPortions: 2,
    ingredients: [],
    tags: [],
  });
  return (
    <QueryClientProvider client={queryClient}>
      <div className="Home">
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setFiltersOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6">Penny Recipes</Typography>
          </Toolbar>
        </AppBar>
        <FilterDrawer
          toggleDrawer={setFiltersOpen}
          open={filtersOpen}
          filters={filters}
          handleApply={setFilters}
        />
        <RecipeList filters={filters} />
      </div>
    </QueryClientProvider>
  );
};

export default Home;
