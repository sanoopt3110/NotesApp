import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { notesService } from "services";

export const registerNotes = createAsyncThunk("notes/register", async (data, thunkAPI) => {
  try {
    return notesService
      .register(data)
      .then((data) => {
        return { ...data };
      })
      .catch((e) => thunkAPI.rejectWithValue(e.response.data));
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const getAll = createAsyncThunk("notes/getAll", async ({}, thunkAPI) => {
  try {
    return notesService
      .getAll()
      .then((data) => {
        return data;
      })
      .catch((e) => thunkAPI.rejectWithValue(e.response.data));
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const getById = createAsyncThunk("notes/getById", async (id, thunkAPI) => {
  try {
    return notesService
      .getById(id)
      .then((data) => {
        return { ...data };
      })
      .catch((e) => thunkAPI.rejectWithValue(e.response.data));
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const updateNotes = createAsyncThunk("notes/update", async ({ id, params }, thunkAPI) => {
  try {
    return notesService
      .update(id, params)
      .then((data) => {
        return { ...data };
      })
      .catch((e) => thunkAPI.rejectWithValue(e.response.data));
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const deleteNote = createAsyncThunk("notes/delete", async (id, thunkAPI) => {
  try {
    return notesService
      .delete(id)
      .then((data) => {
        return { ...data };
      })
      .catch((e) => thunkAPI.rejectWithValue(e.response.data));
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    noteList: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: ""
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
    [getAll.fulfilled]: (state, { payload }) => {
      state.notesList = payload;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [getAll.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload?.message;
    },
    [getAll.pending]: (state) => {
      state.isFetching = true;
    }
  }
});

export const { clearState } = notesSlice.actions;

export const notesSelector = (state) => state.notes;
