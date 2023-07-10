import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUploadSuccess: false,
};

const UploadSuccessSlice = createSlice({
  name: "uploadSuccess",
  initialState,
  reducers: {
    upSuccess(state, action) {
      state.isUploadSuccess = action.payload;
    },
  },
});

export const { upSuccess } = UploadSuccessSlice.actions;

export default UploadSuccessSlice.reducer;
