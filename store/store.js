import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { notesSlice } from "./slice";
import { userSlice } from "./slice/user.slice";

export const makeStore = () =>
  configureStore({
    reducer: {
      user: userSlice.reducer,
      notes: notesSlice.reducer
    }
  });

export const wrapper = createWrapper(makeStore, { debug: true });
