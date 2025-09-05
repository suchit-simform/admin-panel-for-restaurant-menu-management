import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import cookies from "js-cookie";
import { getLocalStoredItems } from "src/lib/helper";
import { convertErrorIntoFetchBaseQueryError } from "../helper/error";
import { CATEGORY_API_REDUCER_KEY, CATEGORY_TAG_TYPE, LOCAL_STORAGE_CATEGORY_KEY } from "./category.constant";
import type { Category } from "./category.type";

const environment = import.meta.env;

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

export const categoryApi = createApi({
  reducerPath: CATEGORY_API_REDUCER_KEY,
  baseQuery: baseQueryWithReAuth,
  tagTypes: [CATEGORY_TAG_TYPE],
  keepUnusedDataFor: 60 * 5,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    //on the login you can save the cookie with js-cookie
    addCategoryItem: builder.mutation<Category[], Category>({
      queryFn: async (newCategoryItem) => {
        try {
          // Get current category items from localStorage
          const categoryItems = getLocalStoredItems<Category>(LOCAL_STORAGE_CATEGORY_KEY);

          // Add the new category item
          const updatedCategoryItems = [...categoryItems, newCategoryItem];

          // Save back to localStorage
          localStorage.setItem(LOCAL_STORAGE_CATEGORY_KEY, JSON.stringify(updatedCategoryItems));

          // Return updated list
          return { data: updatedCategoryItems };
        } catch (error) {
          return convertErrorIntoFetchBaseQueryError(error);
        }
      },
    }),
    updateCategoryItem: builder.mutation<Category[], Category>({
      queryFn: async (updatedCategoryItem) => {
        try {
          // Get current category items from localStorage
          const categoryItems = getLocalStoredItems<Category>(LOCAL_STORAGE_CATEGORY_KEY);

          const doesCategoryItemIdFound = categoryItems.find((item) => item.id === updatedCategoryItem.id);
          if (!doesCategoryItemIdFound) {
            return convertErrorIntoFetchBaseQueryError(new Error("Category item not found"));
          }

          // Update the category item by id
          const updatedCategoryItems = categoryItems.map((item) =>
            item.id === updatedCategoryItem.id ? updatedCategoryItem : item,
          );

          // Save back to localStorage
          localStorage.setItem(LOCAL_STORAGE_CATEGORY_KEY, JSON.stringify(updatedCategoryItems));

          // Return updated list
          return { data: updatedCategoryItems };
        } catch (error) {
          return convertErrorIntoFetchBaseQueryError(error);
        }
      },
    }),

    deleteCategoryItem: builder.mutation<Category[], string>({
      queryFn: async (id) => {
        try {
          // Get current category items from localStorage
          const categoryItems = getLocalStoredItems<Category>(LOCAL_STORAGE_CATEGORY_KEY);

          const doesCategoryItemIdFound = categoryItems.find((item) => item.id === id);
          if (!doesCategoryItemIdFound) {
            return convertErrorIntoFetchBaseQueryError(new Error("Category item not found"));
          }

          // Remove the category item by id
          const updatedCategoryItems = categoryItems.filter((item) => item.id !== id);

          // Save back to localStorage
          localStorage.setItem(LOCAL_STORAGE_CATEGORY_KEY, JSON.stringify(updatedCategoryItems));

          // Return updated list
          return { data: updatedCategoryItems };
        } catch (error) {
          return convertErrorIntoFetchBaseQueryError(error);
        }
      },
    }),
    getCategoryItems: builder.query<Category[], void>({
      queryFn: async () => {
        try {
          const categoryItems = getLocalStoredItems<Category>(LOCAL_STORAGE_CATEGORY_KEY);
          return { data: categoryItems };
        } catch (error) {
          return convertErrorIntoFetchBaseQueryError(error);
        }
      },
    }),
  }),
});
