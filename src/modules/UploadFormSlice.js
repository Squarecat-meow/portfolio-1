import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  genre: "",
  additionalTag: "",
  description: "",
};

const UploadFormSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    formTitle(state, action) {
      state.title = action.payload;
    },
    formGenre(state, action) {
      state.genre = action.payload;
    },
    formTag(state, action) {
      state.additionalTag = action.payload;
    },
    formDesc(state, action) {
      state.description = action.payload;
    },
  },
});

export const { formTitle, formGenre, formTag, formDesc } =
  UploadFormSlice.actions;

export default UploadFormSlice.reducer;
