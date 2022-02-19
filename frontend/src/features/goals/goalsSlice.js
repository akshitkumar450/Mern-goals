import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { serviceAddText, serviceGetGoals } from "./goalsService";

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const addGoal = createAsyncThunk(
  "goals/addGoal",
  async (text, thunkAPI) => {
    try {
      // to get token from the user slice
      const token = thunkAPI.getState().user.user.token;
      //   we need to have token to create goal bcz they are protected routes
      const result = await serviceAddText(text, token);
      return result;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      // return value will be 'rejected' action.payload
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getGoals = createAsyncThunk(
  "goals/getGoals",
  async (_, thunkAPI) => {
    try {
      // to get token from the user slice
      const token = thunkAPI.getState().user.user.token;
      //   we need to have token to create goal bcz they are protected routes
      const result = await serviceGetGoals(token);
      return result;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      // return value will be 'rejected' action.payload
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    resetGoal: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
      state.goals = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(addGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetGoal } = goalsSlice.actions;

export default goalsSlice.reducer;
