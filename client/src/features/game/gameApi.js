import { apiSlice } from "../../store/api";

export const gameApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    join: builder.mutation({
      query: (body) => ({
        url: `/api/join`,
        method: "POST",
        body: body,
      }),
    }),
    start: builder.mutation({
      query: () => ({
        url: `/api/start`,
        method: "POST",
      }),
    }),
    roll: builder.mutation({
      query: (body) => ({
        url: `/api/roll`,
        method: "POST",
        body: body,
      }),
    }),
    answer: builder.mutation({
      query: (body) => ({
        url: `/api/answer`,
        method: "POST",
        body: body,
      }),
    }),
    accept: builder.mutation({
      query: () => ({
        url: `/api/accept`,
        method: "POST",
      }),
    }),
    professor: builder.mutation({
      query: (body) => ({
        url: `/api/professor`,
        method: "POST",
        body: body,
      }),
    }),
    skip: builder.mutation({
      query: () => ({
        url: `/api/skip`,
        method: "POST",
      }),
    }),
    clear: builder.mutation({
      query: () => ({
        url: `/api/clear`,
        method: "POST",
      }),
    }),
    end: builder.mutation({
      query: () => ({
        url: `/api/end`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useJoinMutation,
  useRollMutation,
  useAnswerMutation,
  useAcceptMutation,
  useProfessorMutation,
  useStartMutation,
  useSkipMutation,
  useClearMutation,
  useEndMutation,
} = gameApiSlice;
