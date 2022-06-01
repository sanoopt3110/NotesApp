import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "services";

export const loginUser = createAsyncThunk("notes/authenticate", async ({ username, password }, thunkAPI) => {
  try {
    return userService
      .login(username, password)
      .then((data) => {
        return { ...data };
      })
      .catch((e) => thunkAPI.rejectWithValue(e.response.data));
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const logoutUser = createAsyncThunk("users/logout", async ({}, thunkAPI) => {
  try {
    return userService
      .logout()
      .then((data) => {
        return { ...data };
      })
      .catch((e) => thunkAPI.rejectWithValue(e.response.data));
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    firstName: "",
    lastName: "",
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: "",
    userValue: ""
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    }
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload }) => {
      state.firstName = payload.firstName;
      state.lastName = payload.lastName;
      state.username = payload.username;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [logoutUser.fulfilled]: (state, { payload }) => {
      state.firstName = "";
      state.lastName = "";
      state.username = "";
      state.isFetching = false;
      state.isSuccess = false;
      return state;
    },
    [logoutUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [logoutUser.pending]: (state) => {
      state.isFetching = true;
    }
  }
});

export const { clearState } = userSlice.actions;

export const userSelector = (state) => state.user;

export const userValueSelector = () => userService.userValue;
