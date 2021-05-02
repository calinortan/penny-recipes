import React, { useMemo } from "react";
import { CircularProgress, Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRecipes } from "../../queries";
import RecipeItem from "../RecipeItem";
import { flatten } from "lodash";
import "./RecipeList.scss";

const RecipeList = ({ filters }) => {
  const {
    isLoading,
    error,
    data = [],
    fetchNextPage,
    hasNextPage,
  } = useRecipes(filters);

  const recipes = useMemo(() => {
    return flatten(data.pages);
  }, [data.pages]);

  return (
    <div className="RecipeList">
      {error && (
        <Snackbar open>
          <Alert severity="error">
            "Something went wrong. Please try again later"
          </Alert>
        </Snackbar>
      )}
      {!error && (
        <InfiniteScroll
          dataLength={recipes?.length} // This is important field to render the next data
          next={fetchNextPage}
          hasMore={hasNextPage}
          loader={<CircularProgress size="200px" />}
          endMessage={
            isLoading ? (
              <CircularProgress size="200px" />
            ) : (
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            )
          }
        >
          {recipes?.map((item) => {
            return <RecipeItem key={item.id} recipe={item} />;
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default RecipeList;
