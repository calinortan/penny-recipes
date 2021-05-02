import { Typography } from "@material-ui/core";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import RecipeList from "./components/RecipeList";
import "./ReactHome.scss";

const queryClient = new QueryClient();

const Home = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="Home">
        <nav className="Home_Nav">
          <Typography variant="h4">Penny Recipes</Typography>
        </nav>
        <RecipeList />
      </div>
    </QueryClientProvider>
  );
};

export default Home;
