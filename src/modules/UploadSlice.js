import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUploading: false,
  fileURL: "",
  coverURL: "",
  folderName: "",
  storageLocation: "",
};

const UploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    upFileURL(state, action) {
      state.fileURL = action.payload;
    },
    upCoverURL(state, action) {
      state.coverURL = action.payload;
    },
    upState(state, action) {
      state.isUploading = action.payload;
    },
    upReset() {
      return initialState;
    },
    upFolder(state, action) {
      state.folderName = action.payload;
    },
    upStorage(state, action) {
      state.storageLocation = action.payload;
    },
  },
});

export const { upFileURL, upState, upCoverURL, upFolder, upStorage, upReset } =
  UploadSlice.actions;

export default UploadSlice.reducer;
