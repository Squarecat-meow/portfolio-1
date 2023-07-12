import { createSlice } from "@reduxjs/toolkit";

const DatalistSlice = createSlice({
  name: "datalist",
  initialState: [],
  reducers: {
    upDatalist(state, action) {
      if (state.length > 0) {
        state.filter((idx) => idx !== 0);
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const { upDatalist } = DatalistSlice.actions;

export default DatalistSlice.reducer;
