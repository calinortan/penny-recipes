import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { indexOf, entries, pickBy, identity } from "lodash";

export const useRecipes = (filters = {}) => {
  const truthyFilters = pickBy(filters, identity);
  const {
    minRating: min_rating,
    name,
    minPortions: min_portions,
    tags,
    ingredients,
  } = truthyFilters;

  const fetchRecipes = async ({ pageParam }) => {
    try {
      const resp = await axios.get("/api/recipes.json", {
        params: {
          page: pageParam,
          min_rating,
          min_portions,
          name,
          tags,
          ingredients,
        },
      });

      return resp.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const queryKeys = entries(truthyFilters).map(([key, value]) => {
    return `${key}-${value}`;
  });

  const query = useInfiniteQuery(["recipes", ...queryKeys], fetchRecipes, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 25) {
        return undefined;
      }

      return indexOf(pages, lastPage) + 2;
    },
  });

  return query;
};
