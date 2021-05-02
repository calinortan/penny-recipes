import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { indexOf } from "lodash";

export const useRecipes = () => {
  const fetchRecipes = async ({ pageParam }) => {
    try {
      const resp = await axios.get("/api/recipes.json", {
        params: { page: pageParam },
      });

      return resp.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };
  const query = useInfiniteQuery("recipes", fetchRecipes, {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < 25) {
        return undefined;
      }

      return indexOf(pages, lastPage) + 2;
    },
  });

  return query;
};
