import { createApi, fetchBaseQuery, type FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import cookies from "js-cookie";
import { MENU_API_REDUCER_KEY, MENU_TAG_TYPE } from "../helper/constant";
import type { Menu } from "./menu.type";

// Common localStorage key for menu items
const LOCAL_STORAGE_MENU_KEY = "menuItems";

const environment = import.meta.env;

const baseQuery = fetchBaseQuery({
  baseUrl: environment.VITE_APP_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    console.log(getState());
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

export const menuApi = createApi({
  reducerPath: MENU_API_REDUCER_KEY,
  baseQuery: baseQueryWithReAuth,
  tagTypes: [MENU_TAG_TYPE],
  keepUnusedDataFor: 60 * 5,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    //on the login you can save the cookie with js-cookie
    addMenuItem: builder.mutation<Menu[], Menu>({
      queryFn: async (newMenuItem) => {
        try {
          // Get current menu items from localStorage
          const stored = localStorage.getItem(LOCAL_STORAGE_MENU_KEY);
          const menuItems: Menu[] = stored ? JSON.parse(stored) : [];

          // Add the new menu item
          const updatedMenuItems = [...menuItems, newMenuItem];

          // Save back to localStorage
          localStorage.setItem(LOCAL_STORAGE_MENU_KEY, JSON.stringify(updatedMenuItems));

          // Return updated list
          return { data: updatedMenuItems };
        } catch (error) {
          // Cast or convert your error to FetchBaseQueryError
          const fetchError: FetchBaseQueryError = {
            status: "CUSTOM_ERROR", // or actual status
            data: error, // or actual error data,
            error: "Something went wrong",
          };
          return { error: fetchError };
        }
      },
    }),
    updateMenuItem: builder.mutation<Menu[], Menu>({
      queryFn: async (updatedMenuItem) => {
        try {
          // Get current menu items from localStorage
          const stored = localStorage.getItem(LOCAL_STORAGE_MENU_KEY);
          const menuItems: Menu[] = stored ? JSON.parse(stored) : [];

          // Update the menu item by id
          const updatedMenuItems = menuItems.map((item) => (item.id === updatedMenuItem.id ? updatedMenuItem : item));

          // Save back to localStorage
          localStorage.setItem(LOCAL_STORAGE_MENU_KEY, JSON.stringify(updatedMenuItems));

          // Return updated list
          return { data: updatedMenuItems };
        } catch (error) {
          const fetchError: FetchBaseQueryError = {
            status: "CUSTOM_ERROR",
            data: error,
            error: "Something went wrong",
          };
          return { error: fetchError };
        }
      },
    }),

    deleteMenuItem: builder.mutation<Menu[], string>({
      queryFn: async (id) => {
        try {
          // Get current menu items from localStorage
          const stored = localStorage.getItem(LOCAL_STORAGE_MENU_KEY);
          const menuItems: Menu[] = stored ? JSON.parse(stored) : [];

          // Remove the menu item by id
          const updatedMenuItems = menuItems.filter((item) => item.id !== id);

          // Save back to localStorage
          localStorage.setItem(LOCAL_STORAGE_MENU_KEY, JSON.stringify(updatedMenuItems));

          // Return updated list
          return { data: updatedMenuItems };
        } catch (error) {
          const fetchError: FetchBaseQueryError = {
            status: "CUSTOM_ERROR",
            data: error,
            error: "Something went wrong",
          };
          return { error: fetchError };
        }
      },
    }),
    getMenuItems: builder.query<Menu[], void>({
      queryFn: async () => {
        try {
          // Get current menu items from localStorage
          const stored = localStorage.getItem(LOCAL_STORAGE_MENU_KEY);
          const menuItems: Menu[] = stored ? JSON.parse(stored) : [];
          return { data: menuItems };
        } catch (error) {
          const fetchError: FetchBaseQueryError = {
            status: "CUSTOM_ERROR",
            data: error,
            error: "Something went wrong",
          };
          return { error: fetchError };
        }
      },
    }),
  }),
});
