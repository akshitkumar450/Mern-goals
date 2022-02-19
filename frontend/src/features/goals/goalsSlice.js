import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

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
});

export const { resetGoal } = goalsSlice.actions;

export default goalsSlice.reducer;
