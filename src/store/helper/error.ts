import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const convertErrorIntoFetchBaseQueryError = (error: unknown, message: string = "Something went wrong") => {
  const fetchError: FetchBaseQueryError = {
    status: "CUSTOM_ERROR",
    data: error,
    error: message,
  };
  return { error: fetchError };
};
