import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookies from "js-cookie";
import { getLocalStoredItems } from "src/lib/helper";
import { convertErrorIntoFetchBaseQueryError } from "../helper/error";
import { INGREDIENT_API_REDUCER_KEY, INGREDIENT_TAG_TYPE, LOCAL_STORAGE_INGREDIENT_KEY } from "./ingredient.constant";
import type { Ingredient } from "./ingredient.type";
import { v4 as uuidV4 } from "uuid";

const environment = import.meta.env;

/**
 * TODO: need to write custom baseQuery which perform operation on localstorage for CRUD
 * and also need to handle the error properly
 */
const baseQuery = fetchBaseQuery({
  baseUrl: environment.VITE_APP_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    /**
     * if your backend have refresh and access token both
     * get the access token from the redux store with below code
     * const token = (getState() as RootState).auth.accessToken;
     */
    // const token = (getState() as RootState).auth.accessToken;
    const accessToken = cookies.get("accessToken");
    if (accessToken) {
      headers.set("Content-type", "application/json");
      headers.set("Accept", "application/json");
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

//if you have access and refresh token both and access token is begin stored in memory(session)
//then add logic to generate the new access token with refresh token

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 401) {
    // send refresh token to get new access token
    // const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    // if (refreshResult?.data) {
    /**
     * store the new token and retry the original query with new access token
     */
    //   const { accessToken } = refreshResult.data as LoginResponse;
    //   api.dispatch(setLoggedIn(accessToken));
    //   result = await baseQuery(args, api, extraOptions);
    // } else {
    //   api.dispatch(setLoggedOut());
    // }
  }
  return result;
};

export const ingredientApi = createApi({
  reducerPath: INGREDIENT_API_REDUCER_KEY,
  baseQuery: baseQueryWithReAuth,
  tagTypes: [INGREDIENT_TAG_TYPE],
  keepUnusedDataFor: 60 * 5,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    addIngredientItem: builder.mutation<Ingredient, Omit<Ingredient, "id">>({
      queryFn: async (newIngredientItem) => {
        try {
          // Get current ingredient items from localStorage
          const ingredientItems = getLocalStoredItems<Ingredient>(LOCAL_STORAGE_INGREDIENT_KEY);

          const payload = {
            id: uuidV4(),
            ...newIngredientItem,
          };

          // Add the new ingredient item
          const updatedIngredientItems = [...ingredientItems, payload];

          // Save back to localStorage
          localStorage.setItem(LOCAL_STORAGE_INGREDIENT_KEY, JSON.stringify(updatedIngredientItems));

          // Return updated list
          return { data: payload };
        } catch (error) {
          return convertErrorIntoFetchBaseQueryError(error);
        }
      },
    }),
    updateIngredientItem: builder.mutation<Ingredient[], Ingredient>({
      queryFn: async (updatedIngredientItem) => {
        try {
          // Get current ingredient items from localStorage
          const ingredientItems = getLocalStoredItems<Ingredient>(LOCAL_STORAGE_INGREDIENT_KEY);

          const doesIngredientItemIdFound = ingredientItems.find((item) => item.id === updatedIngredientItem.id);
          if (!doesIngredientItemIdFound) {
            return convertErrorIntoFetchBaseQueryError(new Error("Ingredient item not found"));
          }

          // Update the ingredient item by id
          const updatedIngredientItems = ingredientItems.map((item) =>
            item.id === updatedIngredientItem.id ? updatedIngredientItem : item,
          );

          // Save back to localStorage
          localStorage.setItem(LOCAL_STORAGE_INGREDIENT_KEY, JSON.stringify(updatedIngredientItems));

          // Return updated list
          return { data: updatedIngredientItems };
        } catch (error) {
          return convertErrorIntoFetchBaseQueryError(error);
        }
      },
    }),

    deleteIngredientItem: builder.mutation<Ingredient[], Ingredient["id"]>({
      queryFn: async (id) => {
        try {
          // Get current ingredient items from localStorage
          const ingredientItems = getLocalStoredItems<Ingredient>(LOCAL_STORAGE_INGREDIENT_KEY);

          const doesIngredientItemIdFound = ingredientItems.find((item) => item.id === id);
          if (!doesIngredientItemIdFound) {
            return convertErrorIntoFetchBaseQueryError(new Error("Ingredient item not found"));
          }

          // Remove the ingredient item by id
          const updatedIngredientItems = ingredientItems.filter((item) => item.id !== id);

          // Save back to localStorage
          localStorage.setItem(LOCAL_STORAGE_INGREDIENT_KEY, JSON.stringify(updatedIngredientItems));

          // Return updated list
          return { data: updatedIngredientItems };
        } catch (error) {
          return convertErrorIntoFetchBaseQueryError(error);
        }
      },
    }),
    getIngredientItems: builder.query<Ingredient[], void>({
      queryFn: async () => {
        try {
          const ingredientItems = getLocalStoredItems<Ingredient>(LOCAL_STORAGE_INGREDIENT_KEY);
          return { data: ingredientItems };
        } catch (error) {
          return convertErrorIntoFetchBaseQueryError(error);
        }
      },
    }),
  }),
});
