import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUploading: false,
  fileLocation: "",
  coverLocation: "",
  folderName: "",
};

const UploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    upFileLocation(state, action) {
      state.fileLocation = action.payload;
    },
    upState(state, action) {
      state.isUploading = action.payload;
    },
    upFolder(state, action) {
      state.folderName = action.payload;
    },
    upCover(state, action) {
      state.coverLocation = action.payload;
    },
    upReset() {
      return initialState;
    },
  },
});

export const { upFileLocation, upState, upFolder, upCover, upReset } =
  UploadSlice.actions;

export default UploadSlice.reducer;
