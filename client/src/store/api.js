import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API } from "../config";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: () => ({}),
});
